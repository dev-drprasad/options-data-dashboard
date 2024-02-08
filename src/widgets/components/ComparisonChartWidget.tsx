import { useOptionStats } from "entities/hooks";
import { ComparisonChart } from "features/components";
import { FetchStatusHandler } from "shared/components";

interface ComparisonChartWidgetProps {
  symbols: string[];
  className?: string;
}

function ComparisonChartWidget(props: ComparisonChartWidgetProps) {
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

export default ComparisonChartWidget;
