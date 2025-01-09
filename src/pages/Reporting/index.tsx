import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDebounce } from "use-debounce";
import { BarChartOptions } from "src/page-components/dashboard/PurchaseHistory/types";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { ORDER_COLUMNS } from "src/components/OpenInvoices/constants";
import {
  getShipmentStatusLabel,
  getStatusLabel,
} from "src/components/OrderAlerts/constants";
import { RecentOrders } from "src/components/RecentOrders";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useAlertsStore, { ALERTS_PER_PAGE } from "src/stores/alert-store";
import useCategoryStore, {
  PurchaseByCategories,
} from "src/stores/category-store";
import useInvoiceStore from "src/stores/invoice-store";
import useMetricStore from "src/stores/metric-store";
import useOrderStore from "src/stores/order-store";
import useProductStore from "src/stores/product-store";
import { PATHNAMES } from "src/constants/routes";
import { IAlertType } from "src/@types/alert";

export const Reporting: FC = () => {
  const loadOrderAlerts = useAlertsStore((state) => state.fetchAlerts);
  const loadShipmentAlerts = useAlertsStore((state) => state.fetchAlerts);
  const alerts = useAlertsStore((state) => state.reportingAlerts);
  const testAlert = useAlertsStore((state) => state.alerts);

  const loadAdgingMetrics = useMetricStore((state) => state.fetchOrderAdging);
  const adgingMetrics = useMetricStore((state) => state.order_adging);

  const formattedAdgingMetrics = adgingMetrics?.metrics
    ? [
        { name: "Outstanding", value: adgingMetrics.metrics.outstanding },
        { name: "Overdue", value: adgingMetrics.metrics.overdue },
      ]
    : [];

  const loadPurchaseHistory = useOrderStore(
    (state) => state.fetchPurchaseHistory
  );
  const purchaseHistory = useOrderStore((state) => state.purchaseHistory);

  const loadPurchaseByCategoryList = useCategoryStore(
    (state) => state.fetchPurchasesByCategoryList
  );
  const purchasesByCategoryList = useCategoryStore(
    (state) => state.purchasesByCategoryList
  );

  const currentPage = 1;
  const [debouncedSearchQuery] = useDebounce("", 1000);

  const [purchaseHistoryFilter, setPurchaseHistoryFilter] = useState("Yearly");

  const loadPurchasesByProductList = useProductStore(
    (state) => state.fetchPurchasesByProductList
  );
  const purchasesByProductList = useProductStore(
    (state) => state.purchasesByProductList
  );
  const loadInvoices = useInvoiceStore((state) => state.fetchinvoice);
  const invoices = useInvoiceStore((state) => state.invoice);

  const currentYear = new Date().getFullYear(); // Получаем текущий год
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0"); // Получаем текущий месяц (с 0 по 11) и добавляем ведущий 0

  useEffect(() => {
    loadOrderAlerts({
      search: debouncedSearchQuery,
      current_page: currentPage,
      items_per_page: 10,
      type: IAlertType.ORDER,
    });

    loadShipmentAlerts({
      search: debouncedSearchQuery,
      current_page: currentPage,
      items_per_page: 10,
      type: IAlertType.SHIPMENT,
    });
    loadPurchaseHistory(purchaseHistoryFilter);
    loadAdgingMetrics("Yearly");
    loadPurchaseByCategoryList({ month: 12, year: 2024 });
    loadPurchasesByProductList({ month: 12, year: 2024 });
    loadInvoices({
      current_page: 1,
      search: "",
      month: currentMonth,
      year: currentYear.toString(),
      location_ids: [],
    });
  }, [
    loadOrderAlerts,
    loadShipmentAlerts,
    loadAdgingMetrics,
    loadPurchaseHistory,
    loadPurchaseByCategoryList,
    loadPurchasesByProductList,
    loadInvoices,
    purchaseHistoryFilter,
  ]);

  const { orders, shipments } = alerts;

  const ordersResult = orders?.result || [];
  const shipmentsResult = shipments?.result || [];

  const COLORS = ["#5932EA", "#EAABF0"];

  const data = [
    { name: "Outstanding", value: 38, percentage: "97.44%" },
    { name: "Overdue", value: 1, percentage: "2.56%" },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const totalOrderCount = purchaseHistory?.totalOrdersCount;
  const purchaseHistoryMetrics = purchaseHistory?.metrics || [];

  const normalizedMetrics = purchaseHistoryMetrics.map((item) => {
    if (item.year) {
      return { ...item, order_date: item.year.toString() };
    } else if (item.month) {
      return { ...item, order_date: item.month };
    } else if (item.order_date) {
      return { ...item, order_date: item.order_date };
    }
    return item;
  });

  // DELETEME: Для тестирования
  const purchaseData: PurchaseByCategories[] = [
    {
      category_id: "1",
      category_name: "Electronics",
      total_price_per_month: 150,
      total_price_per_year: 1800,
    },
    {
      category_id: "2",
      category_name: "Groceries",
      total_price_per_month: 120,
      total_price_per_year: 1440,
    },
    {
      category_id: "3",
      category_name: "Clothing",
      total_price_per_month: 80,
      total_price_per_year: 960,
    },
    {
      category_id: "4",
      category_name: "Entertainment",
      total_price_per_month: 50,
      total_price_per_year: 600,
    },
    {
      category_id: "5",
      category_name: "Health & Fitness",
      total_price_per_month: 200,
      total_price_per_year: 2400,
    },
  ];

  console.log("PP", purchasesByProductList);

  return (
    <PageWrapper className="max-w-[85%]">
      <div className="flex gap-5">
        <Window className="w-1/2 overflow-auto">
          <Title title="Order alerts" subtitle="" />
          <div className="mt-5 flex max-h-[150px] flex-col gap-2 overflow-auto">
            {ordersResult.map((order) => (
              <div className="flex justify-between">
                <p>
                  Order {order.id} {getStatusLabel(order.status)}
                </p>
                <p className="text-gray-300">{order.created_at}</p>
              </div>
            ))}
          </div>
          <Link to={PATHNAMES.ORDER_ALERTS}>
            <div className="mt-4 flex w-full justify-end underline">
              View All
            </div>
          </Link>
        </Window>
        <Window className="w-1/2">
          <Title title="Shipment alerts" subtitle="" />
          <div className="mt-5 flex max-h-[150px] flex-col gap-2 overflow-auto">
            {shipmentsResult.map((shipment) => (
              <div className="flex justify-between">
                <p>
                  Order {shipment.id} {getShipmentStatusLabel(shipment.status)}
                </p>
                <p className="text-gray-300">{shipment.created_at}</p>
              </div>
            ))}
          </div>

          <Link to={PATHNAMES.SHIPMENT_ALERTS}>
            <div className="mt-4 flex w-full justify-end underline">
              View All
            </div>
          </Link>
        </Window>
      </div>
      <div className="mt-20 flex gap-5">
        <Window className="max-h-[600px] w-1/2">
          <Title title="Purchase history" subtitle="" />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-4xl font-bold text-[#5932EA]">
              {totalOrderCount} Orders
            </p>
            <select
              value={purchaseHistoryFilter}
              onChange={(e) => setPurchaseHistoryFilter(e.target.value)}
              className="rounded border px-2 py-1"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="mt-5 overflow-auto">
            <ResponsiveContainer width={1000} height={300}>
              <LineChart data={normalizedMetrics}>
                <CartesianGrid stroke="#F1F1F1" strokeWidth="1" />

                <XAxis
                  dataKey="order_date"
                  label={{
                    value: "X- Date",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  width={100}
                />

                <YAxis
                  label={{
                    angle: -90,
                    position: "outsideLeft",
                  }}
                  height={100}
                />
                <Tooltip formatter={(value) => `${value} orders`} />
                <Line
                  type="monotone"
                  dataKey="total_orders"
                  stroke="#5932EA"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Window>
        <Window className="max-h-[600px] w-1/2">
          <Title title="Order Aging" subtitle="" />
          <div className="mt-5 flex w-full justify-between">
            <div className="flex flex-col justify-between">
              <p className="text-[34px] text-[#5932EA]">01.01.2023</p>
              <div className="flex w-full justify-start">
                <div className="mr-4 flex items-center">
                  <span className="mr-1 block h-2 w-2 rounded-full bg-pink-400"></span>
                  Open
                </div>
                <div className="flex items-center">
                  <span className="mr-1 block h-2 w-2 rounded-full bg-purple-700"></span>
                  Closed
                </div>
              </div>
            </div>

            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value}`,
                  `${props.payload.percentage}`,
                ]}
              />
            </PieChart>
          </div>
        </Window>
      </div>
      <div className="mt-20 flex gap-5">
        <Window className="w-1/2">
          <Title title="Purchases By Categories" subtitle="" />
          <p className="text-4xl font-bold text-[#5932EA]">
            {totalOrderCount} Orders
          </p>
          <div className="mt-5 overflow-auto">
            <ResponsiveContainer width={"100%"} height={200}>
              <BarChart
                width={500}
                height={400}
                data={purchaseData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category_name" width={100} />
                <YAxis />
                <Bar
                  dataKey="total_price_per_month"
                  fill="#9197B3"
                  width={20}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Window>

        <Window className="w-1/2">
          <Title title="Purchases By Products" subtitle="" />
          <div className="mt-5 overflow-auto">
            <ResponsiveContainer width={"100%"} height={200}>
              <BarChart
                width={500}
                height={400}
                data={purchasesByProductList}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" width={100} />
                <YAxis />
                <Bar
                  dataKey="per_monthly"
                  fill="#9197B3"
                  width={20}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Window>
      </div>
      <div className="mt-20">
        <RecentOrders />
      </div>
      <div className="mt-20 flex gap-5">
        <Window className="w-1/2">
          <Title title="Invoices" subtitle="" />
          <Table>
            <TableHeader columns={ORDER_COLUMNS} />
            <TableBody items={[]} columns={ORDER_COLUMNS} />
          </Table>
        </Window>
        <Window className="w-1/2">
          <Title title="Shipment map history" subtitle="" />
        </Window>
      </div>
    </PageWrapper>
  );
};
