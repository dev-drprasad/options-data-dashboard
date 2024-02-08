import { useEffect, useMemo, useState } from "react";
import { FetchStatus } from "shared/utils";
import symbolJSON from "../../mock/symbols.json";

function useSymbolOptions() {
  const [data, setData] = useState<ISymbol[]>();
  const [status, setStatus] = useState(new FetchStatus("INIT"));

  const options = useMemo(() => data?.map((symbol) => ({ label: symbol.companyname, value: symbol.symbol })), [data]);

  useEffect(() => {
    setStatus(new FetchStatus("LOADING"));
    const timerId = setTimeout(() => {
      setData(symbolJSON);
      setStatus(new FetchStatus("SUCCESS"));
    }, 2500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return { data: options, status };
}

export default useSymbolOptions;
