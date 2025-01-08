import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import {
  getShipmentStatusLabel,
  getStatusLabel,
} from "src/components/OrderAlerts/constants";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useAlertsStore, { ALERTS_PER_PAGE } from "src/stores/alert-store";
import { PATHNAMES } from "src/constants/routes";
import { IAlertType } from "src/@types/alert";

export const Reporting: FC = () => {
  const loadOrderAlerts = useAlertsStore((state) => state.fetchAlerts);
  const loadShipmentAlerts = useAlertsStore((state) => state.fetchAlerts);
  const alerts = useAlertsStore((state) => state.reportingAlerts);
  const testAlert = useAlertsStore((state) => state.alerts);

  const currentPage = 1;
  const [debouncedSearchQuery] = useDebounce("", 1000);

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
  }, [loadOrderAlerts, loadShipmentAlerts]);

  console.log("ALERTS: ", alerts);
  console.log("TEST ALERTS: ", testAlert);

  const { orders, shipments } = alerts;

  console.log("Shipments: ", shipments);
  const ordersResult = orders?.result || [];
  const shipmentsResult = shipments?.result || [];

  return (
    <PageWrapper>
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
        <Window className="w-1/2">
          <Title title="Purchase history" subtitle="" />
        </Window>
      </div>
    </PageWrapper>
  );
};
