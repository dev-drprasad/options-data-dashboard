import { Card, Segmented, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatCurrency, formatDateTime } from "shared/formatters";
import { Price } from "shared/types";

function OrderTypeSelect() {
  return <Segmented options={["Open", "Closed"]} />;
}

interface IOpenOrdersProps {
  className?: string;
}

function OpenOrders(props: IOpenOrdersProps) {
  const { className } = props;
  return (
    <Card title="Orders" className={className} extra={<OrderTypeSelect />}>
      <Table
        className="h-full"
        rowKey={"id"}
        showHeader={false}
        dataSource={data}
        columns={COLUMNS}
        pagination={false}
        size="small"
      />
    </Card>
  );
}

export default OpenOrders;

interface IOrder {
  id: string;
  time: Date;
  amount: Price;
  status: "OPEN" | "CLOSED";
}

const data: IOrder[] = [
  { id: "1", time: new Date(), amount: 7844, status: "CLOSED" },
  { id: "3", time: new Date(), amount: 244, status: "CLOSED" },
  { id: "4", time: new Date(), amount: 12841, status: "CLOSED" },
  { id: "10", time: new Date(), amount: 1244, status: "CLOSED" },
  { id: "12", time: new Date(), amount: 124, status: "CLOSED" },
  { id: "18", time: new Date(), amount: 1324, status: "OPEN" },
  { id: "21", time: new Date(), amount: 21244, status: "OPEN" },
];

const COLUMNS: ColumnProps<IOrder>[] = [
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "time",
    dataIndex: "time",
    title: "Time",
    render: formatDateTime,
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "Amount",
    render: formatCurrency,
    align: "right",
  },
];
