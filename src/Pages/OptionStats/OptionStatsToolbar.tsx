import { Input, Segmented } from "antd";

import { useEffect, useState } from "react";
import styles from "./OptionStatsToolbar.module.scss";

export enum Status {
  ALL = "All",
  GREAT = "Doing great 👍!",
  NOT_GREAT = "Not good 👎!",
}

export interface ToolbarState {
  status: Status;
  searchText: string;
}

interface IOptionStatsToolbar {
  onChange: (params: ToolbarState) => void;
}

function OptionStatsToolbar(props: IOptionStatsToolbar) {
  const { onChange } = props;
  const [toolbar, setToolbar] = useState<ToolbarState>({ status: Status.ALL, searchText: "" });

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToolbar((p) => ({ ...p, searchText: event.target.value }));
  };

  const handleStatusChange = (status: Status) => {
    setToolbar((p) => ({ ...p, status }));
  };

  useEffect(() => {
    onChange(toolbar);
  }, [onChange, toolbar]);

  return (
    <div className="flex justify-between mb-8">
      <Segmented<Status>
        rootClassName={styles.segmented}
        options={[Status.ALL, Status.GREAT, Status.NOT_GREAT]}
        onChange={handleStatusChange}
      />
      <div style={{ width: 300 }}>
        <Input.Search placeholder="Search anything..." onChange={handleSearchTextChange} allowClear />
      </div>
    </div>
  );
}

export default OptionStatsToolbar;
