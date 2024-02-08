import { useOptionStats } from "entities/hooks";
import { OptionStatsTable, OptionStatsToolbar, Status, ToolbarState } from "features/components";
import { useMemo, useState } from "react";
import { FetchStatusHandler } from "shared/components";
import { useElementHeight } from "shared/hooks";

function OptionStatsWidget() {
  const { data, status } = useOptionStats();
  const { ref: containerRef, height } = useElementHeight();

  const [filters, setFilters] = useState<ToolbarState>();

  const filteredData = useMemo(() => filterData(data, filters), [data, filters]);

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

const filterData = (data?: IOptionStats[], filters?: ToolbarState) => {
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
};

export default OptionStatsWidget;
