import { IStockPrice } from "entities/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { FetchStatus } from "shared/utils";

import stockPrices from "../../mock/stock2023.json";

function useLiveStockPrice() {
  const [data, setData] = useState<IStockPrice[]>(stockPrices.slice(0, 100));
  const [status, setStatus] = useState(new FetchStatus("INIT"));
  const counterRef = useRef(0);

  const chartHoveredRef = useRef(false);

  const pause = useCallback(() => {
    chartHoveredRef.current = true;
  }, []);
  const resume = useCallback(() => {
    chartHoveredRef.current = false;
  }, []);

  useEffect(() => {
    setStatus(new FetchStatus("LOADING"));

    const timerId = setInterval(() => {
      counterRef.current++;
      if (chartHoveredRef.current) return;
      setData(stockPrices.slice(0, 100 + counterRef.current));
      const s = new FetchStatus("SUCCESS");
      s.hasData = true;
      setStatus(s);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { data, all: stockPrices, status, pause, resume };
}

export default useLiveStockPrice;
