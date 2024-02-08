import { ApexOptions } from "apexcharts";
import { IStockPrice } from "entities/types";
import { useMemo } from "react";
import Chart from "react-apexcharts";

interface LiveStockPriceChartProps {
  data: IStockPrice[];
  height: number;
}

type SeriesItem = [number, [number, number, number, number]];

function StockPriceBrush(props: LiveStockPriceChartProps) {
  const { data, height } = props;
  const series = useMemo(() => getSeries(data), [data]);

  return <Chart type="area" height={height} series={series} options={CHART_OPTIONS} />;
}

export default StockPriceBrush;

const getSeries = (data: IStockPrice[]) => {
  const seriesData = data.map((stockPrice) => [
    new Date(stockPrice.quotedate).getTime(),
    [stockPrice.openp, stockPrice.highp, stockPrice.lowp, stockPrice.closep],
  ]) as SeriesItem[];
  return [{ data: seriesData }];
};

const CHART_OPTIONS: ApexOptions = {
  grid: {
    show: false,
  },
  chart: {
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    selection: {
      enabled: true,
      xaxis: {
        min: new Date("09 Jan 2023").getTime(),
        max: new Date("12 Jan 2023").getTime(),
      },
    },
    brush: {
      target: "live-stock",
      enabled: true,
    },
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    show: false,
    tickAmount: 2,
    min: 380,
    max: 410,
  },
};
