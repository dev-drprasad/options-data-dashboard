import { Card, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FetchStatus } from "shared/utils";
import symbolJSON from "../../mock/symbols.json";
import ComparisonChart from "./ComparisonChart";

interface IComparisonProps {
  className?: string;
}

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

function Comparison(props: IComparisonProps) {
  const { className = "" } = props;
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const { data: options, status } = useSymbolOptions();

  useEffect(() => {
    if (!options) return;
    setSelectedSymbols(options.slice(0, 4).map(({ value }) => value));
  }, [options]);

  return (
    <Card title="Volume Comparison" className={className}>
      <div className="flex flex-col h-full">
        <Select
          mode="multiple"
          options={options}
          loading={status.isLoading}
          style={{ width: "100%" }}
          placeholder="Choose symbols"
          onChange={setSelectedSymbols}
          maxTagCount={3}
          showSearch
        />
        <ComparisonChart className="flex-grow" symbols={selectedSymbols} />
      </div>
    </Card>
  );
}

export default Comparison;
