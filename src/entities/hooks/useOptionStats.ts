import { useEffect, useState } from "react";
import { FetchStatus } from "shared/utils";
import optionStats from "../../mock/optionstats.json";

function useOptionStats() {
  const [data, setData] = useState<IOptionStats[]>();
  const [status, setStatus] = useState(new FetchStatus("INIT"));

  useEffect(() => {
    setStatus(new FetchStatus("LOADING"));

    const timerId = setTimeout(() => {
      setData(optionStats);
      const s = new FetchStatus("SUCCESS");
      s.hasData = true;
      setStatus(s);
    }, 2000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { data, status };
}

export default useOptionStats;
