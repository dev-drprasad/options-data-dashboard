import { Card } from "antd";
import { useLiveStockPrice } from "entities/hooks";
import { LiveStockPriceChart, StockPriceBrush, StockPriceGranularitySelect } from "features/components";
import { useRef } from "react";
import { FetchStatusHandler } from "shared/components";

const BRUSH_HEIGHT = 100;

function LiveStockWidget() {
  const { data, all, status, pause: onMouseEnter, resume: onMouseLeave } = useLiveStockPrice();
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartHeight = (chartContainerRef.current?.offsetHeight || 0) - BRUSH_HEIGHT - 150;

  return (
    <Card ref={chartContainerRef} className="h-full" title="Stock Price Live" extra={<StockPriceGranularitySelect />}>
      <FetchStatusHandler status={status} data={data}>
        {(data) =>
          chartHeight > 0 ? (
            <>
              <LiveStockPriceChart
                data={data}
                height={chartHeight}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
              <StockPriceBrush data={all} height={BRUSH_HEIGHT} />
            </>
          ) : null
        }
      </FetchStatusHandler>
    </Card>
  );
}

export default LiveStockWidget;
