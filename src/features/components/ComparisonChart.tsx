import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import Chart from "react-apexcharts";

interface ComparisonChartProps {
  data: IOptionStats[];
  symbols: string[];
}

function ComparisonChart(props: ComparisonChartProps) {
  const { symbols, data } = props;

  const options = useMemo(() => getOptions(data), [data]);

  const series = useMemo(() => getSeries(data, symbols), [data, symbols]);

  return <Chart type="donut" series={series} options={options} />;
}

export default ComparisonChart;

const getSeries = (data: IOptionStats[], symbols: string[]) => {
  if (!data) return undefined;
  const filteredData = data.filter((stat) => symbols.includes(stat.symbol));
  const seriesData = filteredData.map((stat) => stat.volume_total);
  return seriesData;
};

const getOptions = (data: IOptionStats[]): ApexOptions => ({
  legend: {
    position: "bottom",
    formatter: (_, opts) => {
      if (!opts) return "N/A";
      return data[opts.seriesIndex]?.symbol || "N/A";
    },
  },
});
