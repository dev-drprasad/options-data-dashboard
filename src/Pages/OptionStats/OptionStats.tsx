import { useOptionStats } from "business/hooks";
import { useMemo, useState } from "react";
import { FetchStatusHandler } from "shared/components";
import { useElementHeight } from "shared/hooks";
import OptionStatsTable from "./OptionStatsTable";
import OptionStatsToolbar, { ToolbarState, Status } from "./OptionStatsToolbar";

function OptionStats() {
  const { data, status } = useOptionStats();
  const { ref: containerRef, height } = useElementHeight();

  const [filters, setFilters] = useState<ToolbarState>();

  const filteredData = useMemo(() => {
    if (!data) return undefined;

    return data.filter((stats) => {
      if (!filters) return true;
      if (!filters.searchText && filters.status === Status.ALL) return true;
      const searchTextMatch = [stats.DNID, stats.symbol].some((s) =>
        s.toLowerCase().includes(filters.searchText.toLowerCase().trim()),
      );
      const callRatioMatch =
        filters.status === Status.ALL ||
        (filters.status === Status.GREAT && stats.putcallratio >= 1) ||
        (filters.status === Status.NOT_GREAT && stats.putcallratio < 1);
      return searchTextMatch && callRatioMatch;
    });
  }, [data, filters]);

  return (
    <div className="flex flex-col w-full">
      <OptionStatsToolbar onChange={setFilters} />
      <div ref={containerRef} className="flex-grow">
        {height > 0 && (
          <FetchStatusHandler status={status} data={filteredData}>
            {(data) => <OptionStatsTable data={data} height={height} />}
          </FetchStatusHandler>
        )}
      </div>
    </div>
  );
}

export default OptionStats;
