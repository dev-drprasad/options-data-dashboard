import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { formatCurrency, formatDateTime } from "shared/formatters";
import PutCallRatio from "./PutCallRatio";

interface IOptionStatsTableProps {
  data: IOptionStats[];
  height: number;
}

function OptionStatsTable(props: IOptionStatsTableProps) {
  const { data, height } = props;

  const columns = useMemo(() => makeColumns(), []);

  return (
    <Table dataSource={data} rowKey="symbol" columns={columns} scroll={{ y: height }} pagination={false} virtual />
  );
}

const makeColumns = (): ColumnProps<IOptionStats>[] => [
  {
    title: "Date",
    dataIndex: "quotedate",
    key: "quotedate",
    render: (date: number) => formatDateTime(new Date(date)),
    width: 250,
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    sorter: (a: IOptionStats, b: IOptionStats) => a.symbol.localeCompare(b.symbol),
  },
  {
    title: "DNID",
    dataIndex: "DNID",
    key: "DNID",
  },
  {
    title: "Put Call Ratio",
    dataIndex: "putcallratio",
    key: "putcallratio",
    render: (value: number) => <PutCallRatio value={value} />,
  },
  {
    title: "V. Call",
    dataIndex: "volume_call",
    key: "volume_call",
    render: formatCurrency,
    align: "right",
  },
  {
    title: "V. Put",
    dataIndex: "volume_put",
    key: "volume_put",
    render: formatCurrency,
    align: "right",
  },
  {
    title: "Volume Total",
    dataIndex: "volume_total",
    key: "volume_total",
    render: formatCurrency,
    align: "right",
    sorter: (a: IOptionStats, b: IOptionStats) => a.volume_total - b.volume_total,
  },
];

export default OptionStatsTable;
