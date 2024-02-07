import { useCallback, useEffect, useMemo, useState } from "react";
import { FetchStatus } from "shared/utils";

export const cr = "\n";
export const tab = "\t";

function getType(data: unknown) {
  if (data === null) return "Null";
  if (data === undefined) return "Undefined";
  if (typeof data === "string") return "String";
  if (typeof data === "number" && !Number.isNaN(data)) return "Number";
  if (Number.isNaN(data)) return "NaN";
  if (typeof data === "boolean") return "Boolean";
  if (Array.isArray(data)) return "Array"; // always should be before `Object`
  if (data instanceof Object) return "Object";

  return "";
}

// https://stackoverflow.com/a/2117523
function uuidv4() {
  return (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (char) => {
    const c = Number(char);
    return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
  });
}

type UseFetchOpts = {
  body?: BodyInit;
  method?: string;
  headers?: Record<string, string>;
};

const defaultFetchOptions: UseFetchOpts = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const makeFinalFetchOptions = (opts?: UseFetchOpts): UseFetchOpts => {
  // recursive merge might be better solution
  return {
    ...defaultFetchOptions,
    ...opts,
    headers: {
      ...defaultFetchOptions.headers,
      ...opts?.headers,
      // ...(fresh && { "X-Clear-Cache": "true" }),
      "X-Request-ID": uuidv4(),
    },
  };
};

type Response<T> = [T | undefined, FetchStatus];

export function useFetch<T>(url?: string, opts?: UseFetchOpts) {
  // const [[rId, fresh], setParams] = useState(() => ["", false]);
  const [finalOpts, setFinalOpts] = useState<UseFetchOpts>();
  const [response, setResponse] = useState<Response<T>>([undefined, new FetchStatus("INIT")]);

  const refresh = useCallback(() => {
    setFinalOpts(makeFinalFetchOptions(opts));
  }, [opts]);

  useEffect(() => {
    if (url && opts) {
      setFinalOpts(makeFinalFetchOptions(opts));
    }
  }, [url, opts]);

  useEffect(() => {
    if (!url || !finalOpts) return;

    const abortctrl = new AbortController();

    setResponse(([, s]) => [undefined, s.clone("LOADING")]);
    const startTime = performance.now();

    if (finalOpts.headers?.["Content-Type"] === null) {
      // biome-ignore lint/performance/noDelete: Sorry, no explanation
      delete finalOpts.headers["Content-Type"];
    }
    const rId = finalOpts.headers?.["X-Request-ID"];
    fetch(url, finalOpts)
      .then(async (res) => {
        if (abortctrl.signal.aborted) return;

        const responseTime = performance.now() - startTime;
        const cached = !!res.headers.get("X-Browser-Cache");
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let body: any;

        try {
          body = await res.json();
        } catch (e) {
          const message = "Invalid JSON response from API";
          console.error(
            `${cr}API Error:${cr}${tab}URL: ${url}${cr}${tab}Msg: ${message}${cr}${tab}Code: ${res.status}`,
          );
          setResponse(([, s]) => [undefined, s.clone("ERROR", "", res.status, responseTime, rId, cached)]);
          return;
        }

        if (res.status >= 400) {
          const error: { error: string; message: string } = body || {};
          const errorType = error.error || "";
          const isInternalError = !errorType || errorType === "Internal Server Error";
          const message = !isInternalError ? error.message || "" : "";
          console.log("res.status :>> ", res.status);
          setResponse(([, s]) => [undefined, s.clone("ERROR", message, res.status, responseTime, rId, false)]);
          return;
        }

        const dataType = getType(body);
        const hasData = dataType !== "Null" && (dataType === "Array" ? body.length > 0 : true);

        setResponse(([, s]) => [body, s.clone("SUCCESS", "", res.status, responseTime, rId, hasData)]);
      })
      .catch((err) => {
        if (abortctrl.signal.aborted) return;
        const responseTime = performance.now() - startTime;
        console.error(`${cr}API Error:${cr}${tab}URL: ${url}${cr}${tab}Msg: ${err.message}${cr}${tab}Code: 0`);
        setResponse(([, s]) => [undefined, s.clone("ERROR", "", 0, responseTime, rId)]);
      });

    return () => abortctrl.abort();
  }, [finalOpts, url]);

  return [response[0], response[1], refresh] as const;
}

export type UseAPIArgs = [string | undefined, UseFetchOpts | undefined];

const API_BASE_URL = import.meta.env.API_BASE_URL || window.location.origin;
export default function useAPI<T>(urlpath?: string, extraOptions?: UseFetchOpts) {
  const url = urlpath && new URL(urlpath, API_BASE_URL).toString();

  const options = useMemo(
    () => ({
      ...extraOptions,
      headers: {
        Authorization: "Bearer ",
        ...extraOptions?.headers,
      },
    }),
    [extraOptions],
  );

  const [data, status, refresh] = useFetch<T>(url, options);

  return [data, status, refresh] as const;
}
