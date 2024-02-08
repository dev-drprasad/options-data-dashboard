import { VolumneComparisonWidget } from "widgets/components";
import { LiveStockWidget, OpenOrders } from "widgets/components";

function Dashboard() {
  return (
    <div className="gap-4">
      <div className="flex !flex-row gap-4 min-h-0 flex-grow">
        <div className="flex-grow">
          <LiveStockWidget />
        </div>
        <VolumneComparisonWidget className="w-1/4" />
      </div>
      <OpenOrders className="h-1/3" />
    </div>
  );
}

export default Dashboard;
