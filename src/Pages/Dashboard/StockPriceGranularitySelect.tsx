import { Segmented } from "antd";

interface IStockPriceGranularitySelect {
  onChange?: (value: string) => void;
}

function StockPriceGranularitySelect(props: IStockPriceGranularitySelect) {
  const { onChange } = props;
  return <Segmented<string> options={["1s", "15m", "1hr", "6hr", "1D"]} onChange={onChange} />;
}

export default StockPriceGranularitySelect;
