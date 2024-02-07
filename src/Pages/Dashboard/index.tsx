import { Card } from "antd";
import { useLiveStockPrice } from "business/hooks";
import { FetchStatusHandler } from "shared/components";
import stockPrices from "../../mock/stock2023.json";
import Comparison from "./Comparison";
import LiveStockPriceChart from "./LiveStockPriceChart";
import OpenOrders from "./OpenOrders";
import StockPriceBrush from "./StockPriceBrush";
import StockPriceGranularitySelect from "./StockPriceGranularitySelect";

function Dashboard() {
  const { data, status, onMouseEnter, onMouseLeave } = useLiveStockPrice();

  return (
    <div className="gap-4">
      <div className="flex !flex-row gap-4 min-h-0 flex-grow">
        <div className="flex-grow">
          <FetchStatusHandler status={status} data={data}>
            {(data) => (
              <Card className="h-full" title="Stock Price Live" extra={<StockPriceGranularitySelect />}>
                <LiveStockPriceChart data={data} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
                <StockPriceBrush data={stockPrices} />
              </Card>
            )}
          </FetchStatusHandler>
        </div>
        <Comparison className="w-1/4" />
      </div>
      <OpenOrders className="h-1/3" />
    </div>
  );
}

export default Dashboard;
