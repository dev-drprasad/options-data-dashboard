import { Card, Select } from "antd";
import { useSymbolOptions } from "entities/hooks";
import { useEffect, useState } from "react";
import ComparisonChartWidget from "./ComparisonChartWidget";

interface IComparisonProps {
  className?: string;
}

function VolumneComparisonWidget(props: IComparisonProps) {
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
        <ComparisonChartWidget className="flex-grow" symbols={selectedSymbols} />
      </div>
    </Card>
  );
}

export default VolumneComparisonWidget;
