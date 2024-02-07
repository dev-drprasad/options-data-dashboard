import { ApexOptions } from "apexcharts";
import { useOptionStats } from "business/hooks";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { FetchStatusHandler } from "shared/components";

interface ComparisonChartProps {
  data: IOptionStats[];
  symbols: string[];
}

function ComparisonChart(props: ComparisonChartProps) {
  const { symbols, data } = props;

  const filteredData = useMemo(() => data.filter((stat) => symbols.includes(stat.symbol)), [data, symbols]);

  const options = useMemo(() => getOptions(data), [data]);

  const series = useMemo(() => {
    if (!filteredData) return undefined;
    const seriesData = filteredData.map((stat) => stat.volume_total);
    return seriesData;
  }, [filteredData]);

  console.log("series :>> ", filteredData);

  return <Chart type="donut" series={series} options={options} />;
}

interface ComparisonChartContainerProps {
  symbols: string[];
  className?: string;
}

function ComparisonChartContainer(props: ComparisonChartContainerProps) {
  const { symbols, className } = props;
  const { data, status } = useOptionStats();

  return (
    <FetchStatusHandler status={status} data={data}>
      {(data) => (
        <div className={`flex items-center ${className}`}>
          <ComparisonChart data={data} symbols={symbols} />
        </div>
      )}
    </FetchStatusHandler>
  );
}

export default ComparisonChartContainer;

const getOptions = (data: IOptionStats[]): ApexOptions => ({
  legend: {
    position: "bottom",
    formatter: (_, opts) => {
      if (!opts) return "N/A";
      return data[opts.seriesIndex]?.symbol || "N/A";
    },
  },
});
