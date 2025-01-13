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
import { DateRangePicker } from "rsuite";
import { useDebounce } from "use-debounce";
import { Switch } from "src/page-components/dashboard/PurchaseHistory/Switch";
import { BarChartOptions } from "src/page-components/dashboard/PurchaseHistory/types";
import { SHIPMENT_HISTORY_COLUMNS } from "src/page-components/shipments/ShipmentHistory/constants";
import { getTableItems as getShipmentTableItems } from "src/page-components/shipments/ShipmentHistory/constants";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import {
  getTableItems,
  ORDER_COLUMNS,
} from "src/components/OpenInvoices/constants";
import {
  getShipmentStatusLabel,
  getStatusLabel,
} from "src/components/OrderAlerts/constants";
import { RecentOrders } from "src/components/RecentOrders";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useAlertsStore, { ALERTS_PER_PAGE } from "src/stores/alert-store";
import useCategoryStore, {
  PurchaseByCategories,
} from "src/stores/category-store";
import useInvoiceStore from "src/stores/invoice-store";
import useMetricStore from "src/stores/metric-store";
import useOrderStore from "src/stores/order-store";
import useProductStore from "src/stores/product-store";
import useShipmentStore from "src/stores/shipment-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { PATHNAMES } from "src/constants/routes";
import { IAlertType } from "src/@types/alert";
import { Row } from "src/@types/table";
import DatePickerWindow from "./DatePicker";

export const Reporting: FC = () => {
  const loadOrderAlerts = useAlertsStore((state) => state.fetchAlerts);
  const loadShipmentAlerts = useAlertsStore((state) => state.fetchAlerts);
  const alerts = useAlertsStore((state) => state.reportingAlerts);
  const testAlert = useAlertsStore((state) => state.alerts);

  const loadAdgingMetrics = useMetricStore((state) => state.fetchOrderAdging);
  const adgingMetrics = useMetricStore((state) => state.order_adging);

  const startDateAdging = new Date(adgingMetrics?.startDate);
  const formattedStartDateAdging = startDateAdging?.toLocaleDateString(
    "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }
  );

  const endDateAdging = new Date(adgingMetrics?.endDate);
  const formattedEndDateAdging = endDateAdging?.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

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

  const loadPurchaseByCategory = useCategoryStore(
    (state) => state.fetchPurchasesByCategory
  );
  const purchasesByCategory = useCategoryStore(
    (state) => state.purchasesByCategory
  );

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRangeChange = (range: { startDate: Date; endDate: Date }) => {
    setSelectedDateRange(range);
    console.log("Selected Date Range:", range);
  };

  const [purchasesByCategoryListOption, setPurchasesByCategoryListOption] =
    useState<BarChartOptions>(BarChartOptions.QUANTITY);

  const onClickSwitch = () => {
    setPurchasesByCategoryListOption(
      purchasesByCategoryListOption === BarChartOptions.QUANTITY
        ? BarChartOptions.AMOUNT
        : BarChartOptions.QUANTITY
    );
  };

  const formatYAxis = (value) => {
    if (purchasesByCategoryListOption === BarChartOptions.AMOUNT) {
      return `$${value.toFixed(2)}`; // Adds a dollar sign and formats the amount
    }
    return value; // Returns the value without modification for quantity
  };

  const currentPage = 1;
  const [debouncedSearchQuery] = useDebounce("", 1000);

  const [purchaseHistoryFilter, setPurchaseHistoryFilter] = useState("Yearly");
  const [orderAggingFilter, setOrderAggingFilter] = useState("Yearly");

  const loadPurchasesByProduct = useProductStore(
    (state) => state.fetchPurchaseByProduct
  );
  const purchasesByProduct = useProductStore(
    (state) => state.purchaseByProduct
  );

  const [purchasesByProductOption, setPurchasesByProductOption] =
    useState<BarChartOptions>(BarChartOptions.QUANTITY);

  const onClickSwitchPurchasesOption = () => {
    setPurchasesByProductOption(
      purchasesByProductOption === BarChartOptions.QUANTITY
        ? BarChartOptions.AMOUNT
        : BarChartOptions.QUANTITY
    );
  };

  const [
    selectedDateRangePurchaseByProduct,
    setSelectedDateRangePurchaseByProduct,
  ] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRangeChangePurchaseByProduct = (range: {
    startDate: Date;
    endDate: Date;
  }) => {
    setSelectedDateRangePurchaseByProduct(range);
    console.log("Selected Date Range:", range);
  };

  const loadInvoices = useInvoiceStore((state) => state.fetchinvoice);
  const invoices = useInvoiceStore((state) => state.invoice);

  const currentYear = new Date().getFullYear(); // Получаем текущий год
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0"); // Получаем текущий месяц (с 0 по 11) и добавляем ведущий 0

  const loadShipments = useShipmentStore((state) => state.fetcShipment);
  const shipmentsList = useShipmentStore((state) => state.shipment);

  const loadOrders = useOrderStore((state) => state.fetchOrders);
  const ordersList = useOrderStore((state) => state.orders);

  const { getQueryParam, setQueryParam, setMultipleQueryParams } =
    useQueryParams();

  const product_ids = getQueryParam(QUERY_PARAM_KEYS.PRODUCTS) || "";

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
    loadAdgingMetrics(orderAggingFilter);
    loadPurchaseByCategory({
      startDate: selectedDateRange.startDate.toString(),
      endDate: selectedDateRange.endDate.toString(),
    });
    loadPurchasesByProduct({
      startDate: selectedDateRangePurchaseByProduct.startDate.toString(),
      endDate: selectedDateRangePurchaseByProduct.endDate.toString(),
    });
    loadInvoices({
      current_page: 1,
      search: "",
      month: currentMonth,
      year: currentYear.toString(),
      location_ids: [],
    });
    loadShipments({
      current_page: 1,
      month: currentMonth,
      year: currentYear.toString(),
    });
    loadOrders({
      search: debouncedSearchQuery,
      current_page: currentPage,
      year: currentYear.toString(),
      month: currentMonth.toString(),
      product_ids: getArrayFromStringParams(product_ids),
    });
  }, [
    loadOrderAlerts,
    loadShipmentAlerts,
    loadAdgingMetrics,
    loadPurchaseHistory,
    loadPurchaseByCategory,
    loadPurchasesByProduct,
    loadInvoices,
    loadShipments,
    purchaseHistoryFilter,
    orderAggingFilter,
    selectedDateRangePurchaseByProduct,
    selectedDateRange,
  ]);

  const { orders, shipments } = alerts;

  const ordersResult = orders?.result || [];
  const shipmentsResult = shipments?.result || [];

  const COLORS = ["#5932EA", "#EAABF0"];

  const data = [
    { name: "Outstanding", value: 38, percentage: "97.44%" },
    { name: "Overdue", value: 1, percentage: "2.56%" },
  ];

  console.log("DATA TEST: ", adgingMetrics);

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

  console.log("Shipments: ", shipmentsList);
  const shipmentsListResult = shipmentsList?.result || [];
  const shipmentsItems = getShipmentTableItems(
    shipmentsListResult
  ) as unknown as Row[];

  const invoicesResult = invoices?.result || [];
  console.log("Invoices: ", invoices);
  const invoicesItems = getTableItems(invoicesResult) as unknown as Row[];

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
              <LineChart width={1500} data={normalizedMetrics}>
                <CartesianGrid stroke="#D3D3D3" strokeWidth="1" />{" "}
                {/* Изменено на серый */}
                <XAxis
                  dataKey="order_date"
                  label={{
                    value: "X- Date",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  stroke="#D3D3D3"
                  width={100}
                  color="#5932EA"
                  tickSize={10}
                  interval={1}
                />
                <YAxis
                  label={{
                    angle: -90,
                    position: "outsideLeft",
                  }}
                  stroke="#D3D3D3"
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
          <div className="flex w-full justify-between">
            <Title title="Order Aging" subtitle="" />
            <select
              value={orderAggingFilter}
              onChange={(e) => setOrderAggingFilter(e.target.value)}
              className="rounded border px-2 py-1"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="mt-5 flex w-full justify-between">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[34px] text-[#5932EA]">
                  {formattedStartDateAdging}
                </p>
                <p className="text-[34px] text-[#5932EA]">
                  {formattedEndDateAdging}
                </p>
              </div>

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
                data={formattedAdgingMetrics}
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
          <div className="flex justify-between">
            <Title title="Purchases By Categories" subtitle="" />
            <DatePickerWindow onDateRangeChange={handleDateRangeChange} />
          </div>

          <div className="flex justify-between">
            <p className="text-4xl font-bold text-[#5932EA]">
              {purchasesByCategory?.totalOrdersCount} Orders
            </p>

            <Switch onClick={onClickSwitch} />
          </div>

          <div className="mt-5 overflow-auto">
            <ResponsiveContainer width={"100%"} height={200}>
              <BarChart
                width={500}
                height={400}
                data={purchasesByCategory?.metrics}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category_name" width={100} />
                <YAxis tickFormatter={formatYAxis} />
                <Bar
                  dataKey={
                    purchasesByCategoryListOption === BarChartOptions.QUANTITY
                      ? "total_quantity"
                      : "total_price"
                  }
                  fill="#9197B3"
                  width={20}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Window>

        <Window className="w-1/2">
          <div className="flex justify-between">
            <Title title="Purchases By Products" subtitle="" />
            <DatePickerWindow
              onDateRangeChange={handleDateRangeChangePurchaseByProduct}
              customStyle={{ right: "0", left: "auto" }}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-4xl font-bold text-[#5932EA]">
              {purchasesByProduct?.totalOrdersCount} Orders
            </p>

            <Switch onClick={onClickSwitchPurchasesOption} />
          </div>
          <div className="mt-5 overflow-auto">
            <ResponsiveContainer width={"100%"} height={200}>
              <BarChart
                width={500}
                height={400}
                data={purchasesByProduct.metrics}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product_name" width={100} />
                <YAxis tickFormatter={formatYAxis} />

                <Bar
                  dataKey={
                    purchasesByProductOption === BarChartOptions.QUANTITY
                      ? "total_quantity"
                      : "total_price"
                  }
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
            <TableBody items={invoicesItems} columns={ORDER_COLUMNS} />
          </Table>
        </Window>
        <Window className="w-1/2">
          <Title title="Shipment map history" subtitle="" />
          <Table>
            <TableHeader columns={SHIPMENT_HISTORY_COLUMNS} />
            <TableBody
              items={shipmentsItems}
              columns={SHIPMENT_HISTORY_COLUMNS}
            />
          </Table>
        </Window>
      </div>
    </PageWrapper>
  );
};
