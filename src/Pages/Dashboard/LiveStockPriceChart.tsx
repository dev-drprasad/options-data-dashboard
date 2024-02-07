import { ApexOptions } from "apexcharts";
import { IStockPrice } from "business/types";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { formatCurrency } from "shared/formatters";

interface LiveStockPriceChartProps {
  data: IStockPrice[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type SeriesItem = [number, [number, number, number, number]];

function LiveStockPriceChart(props: LiveStockPriceChartProps) {
  const { data, onMouseEnter, onMouseLeave } = props;

  const options = useMemo(() => getChartOptions(onMouseEnter, onMouseLeave), [onMouseEnter, onMouseLeave]);

  const series = useMemo(() => {
    const seriesData = data.map((stockPrice) => [
      new Date(stockPrice.quotedate).getTime(),
      [stockPrice.openp, stockPrice.highp, stockPrice.lowp, stockPrice.closep],
    ]) as SeriesItem[];
    return [{ data: seriesData }];
  }, [data]);

  return <Chart type="candlestick" series={series} height={400} options={options} />;
}

export default LiveStockPriceChart;

const getChartOptions = (onMouseEnter: () => void, onMouseLeave: () => void): ApexOptions => ({
  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
    strokeDashArray: 2,
  },
  chart: {
    id: "live-stock",
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    events: {
      mouseMove: onMouseEnter,
      mouseLeave: onMouseLeave,
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    type: "datetime",
    range: 10 * 1000 * 1000,
    stepSize: 50,
  },
  yaxis: {
    labels: {
      formatter(val) {
        return formatCurrency(val);
      },
    },
    tooltip: {
      enabled: true,
    },
    tickAmount: 10,
    forceNiceScale: true,
  },
});
