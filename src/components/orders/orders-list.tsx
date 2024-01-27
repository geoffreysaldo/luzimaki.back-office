import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Card, Pagination, Skeleton } from "@nextui-org/react";
import { SearchOrdersResponseFragment_orders } from "../../graphql/orders/fragments/__generated__/SearchOrdersResponseFragment";
import { SEARCH_ORDERS } from "../../graphql/orders/queries/search-orders.query";
import OrderCard from "./order-card";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ORDER_NOTIFICATION } from "../../graphql/orders/mutations/update-order-notification.mutation";
import { OrderNotificationFragment } from "../../graphql/orders/fragments/__generated__/OrderNotificationFragment";
import { FacetInput, NumericFilterInput, OrderNotificationStatus, OrderState, PaymentState } from "../../graphql/__generated__/globalTypes";
import { OrderNotificationActions } from "../../store/order-notification.slice";
import { ORDER_NOTIFICATION_SUBSCRIPTION } from "../../graphql/orders/subscriptions/order-notification.subscription";
import { AuthRestorerResponse } from "../../store/auth.slice";
import { useCallback, useReducer, useState } from "react";
import Filters from "../common/filters";
import { ORDERS_LIST_FILTERS } from "./orders-list-filters.settings";
import SettingsCard from "./settings-card";
import CloseStoreCard from "./close-store-card";
import NewOrdersList from "./new-orders-list";
import { StoreState } from "../../store";

const initialState: string[] = [];

const ITEMS_PER_PAGE = 20;

function OrdersList() {
  const [pageState, setPage] = useState(1);
  const storeId = useSelector((state: StoreState) => state.store.id);
  const [filtersInput, setFiltersInput] = useState<{
    facets: FacetInput[];
    numericFilters: NumericFilterInput[];
  }>({ facets: [], numericFilters: [] });
  const [notificationState, notificationDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const authState = useSelector((state) => (state as any).auth as AuthRestorerResponse);
  const orderNotificationState = useSelector((state) => (state as any).orderNotifications);

  const [updateOrderNotification] = useMutation(UPDATE_ORDER_NOTIFICATION);

  if (orderNotificationState.notifications.length) {
    orderNotificationState.notifications.map((oN: OrderNotificationFragment) =>
      updateOrderNotification({
        variables: {
          orderNotificationId: oN.id,
          notificationStatus: OrderNotificationStatus.VIEW,
        },
      })
    );
    dispatch(OrderNotificationActions.resetOrderNotifications());
  }

  useSubscription(ORDER_NOTIFICATION_SUBSCRIPTION, {
    variables: { storeId: authState.storeIds?.at(0) },
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (authState.storeIds?.at(0) === subscriptionData.data.orderNotification.storeId) {
        notificationDispatch({
          type: "addNotification",
          payload: subscriptionData.data.orderNotification.orderId,
        });
      }
    },
  });

  const { data: ordersSearch, loading } = useQuery(SEARCH_ORDERS, {
    variables: {
      searchInput: {
        facets: [...filtersInput.facets, { key: "storeId", value: storeId }],
        numericFilters: filtersInput.numericFilters,
        from: (pageState - 1) * ITEMS_PER_PAGE,
        to: pageState * ITEMS_PER_PAGE,
      },
    },
  });

  const handlePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  function reducer(notificationState: any, action: { type: string; payload: string }) {
    switch (action.type) {
      case "addNotification":
        return [...notificationState, action.payload];
      case "deleteNotification":
        return [...notificationState.filter((n: string) => n !== action.payload)];
      default:
        throw new Error();
    }
  }

  const skeletonPage = (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );

  const ordersListMarkup = (
    <div className="w-full space-y-1">
      {ordersSearch?.ordersSearch?.orders?.map((o: SearchOrdersResponseFragment_orders, i: number) => (
        <OrderCard key={`order-${o.orderNumber}-${i}`} order={o!} />
      ))}
    </div>
  );

  const paginationMarkup = (
    <div>
      <Pagination
        className="mt-1 float-right"
        showControls
        total={
          Math.floor(ordersSearch?.ordersSearch?.totalCount / ITEMS_PER_PAGE) +
          Math.ceil((ordersSearch?.ordersSearch?.totalCount % ITEMS_PER_PAGE) / ITEMS_PER_PAGE)
        }
        initialPage={pageState}
        onChange={(page) => {
          handlePage(page);
        }}
      />
    </div>
  );

  return (
    <div className="w-full mb-20">
      <div className="flex flex-row justify-between mb-2">
        <div className="text-xl m-4 w-full">Liste des commandes</div>
        <div className="flex flex-row justify-start w-full space-x-2">
          <SettingsCard />
          <CloseStoreCard />
        </div>
      </div>
      <div className="w-full flex flew-row space-x-2">
        <div className="w-3/4">
          {loading && skeletonPage}
          {!loading && ordersSearch?.ordersSearch?.totalCount > 0 && (
            <>
              {notificationState.length > 0 && <NewOrdersList notifications={notificationState} />}
              {ordersListMarkup}
              {paginationMarkup}
            </>
          )}
        </div>
        <div className="w-1/4">
          <Filters
            filters={ORDERS_LIST_FILTERS}
            onChangeFilter={(f) => {
              setFiltersInput(f);
              notificationState.map((n) => notificationDispatch({ type: "addNotification", payload: n }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default OrdersList;
