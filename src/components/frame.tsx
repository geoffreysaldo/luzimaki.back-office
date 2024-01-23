import { Chip } from "@nextui-org/react";
import Header from "./header";
import Menu from "./menu";
import { Icon } from "@iconify/react";
import { useSubscription } from "@apollo/client";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AuthRestorerResponse } from "../store/auth.slice";
import { useEffect } from "react";
import { ORDER_NOTIFICATION_SUBSCRIPTION } from "../graphql/orders/subscriptions/order-notification.subscription";
import { GET_ORDER_NOTIFICATIONS_QUERY } from "../graphql/orders/queries/get-order-notifications.query";
import { OrderNotificationActions } from "../store/order-notification.slice";
import { useApolloClient } from "../graphql/client";
import { StoreState } from "../store";
import { OrderNotificationFragment } from "../graphql/orders/fragments/__generated__/OrderNotificationFragment";

function Frame(props: any) {
  const apolloClient = useApolloClient();
  const dispatch = useDispatch();
  const authState = useSelector((state: StoreState) => state.auth.storeIds?.at(0), shallowEqual);
  const orderNotificationState = useSelector((state: StoreState) => state.orderNotifications, shallowEqual);

  useEffect(() => {
    apolloClient
      .query({
        query: GET_ORDER_NOTIFICATIONS_QUERY,
        variables: { storeId: authState },
      })
      .then((res) => dispatch(OrderNotificationActions.setOrderNotifications(res.data?.getOrderNotifications)));
  }, []);

  useSubscription(ORDER_NOTIFICATION_SUBSCRIPTION, {
    variables: { storeId: authState },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      dispatch(OrderNotificationActions.addOrderNotification(subscriptionData.data.orderNotification));
    },
  });

  return (
    <div>
      <Header></Header>
      <div className="flex flex-row m-2 space-x-2">
        <div className="w-1/6">
          <Menu
            sections={[
              {
                title: "Commandes",
                icon: <Icon icon="wpf:shoppingbag" />,
                subSections: [
                  {
                    title: "Liste des commandes",
                    url: "/orders",
                    elementEnd: orderNotificationState.notifications?.length ? (
                      <Chip endContent={<Icon icon="mingcute:notification-fill" />} variant="flat" color="secondary">
                        {orderNotificationState.notifications?.length}
                      </Chip>
                    ) : (
                      <div></div>
                    ),
                  },
                  {
                    title: "Créer un commande",
                    url: "/orders/new",
                    elementEnd: <Icon icon="ic:round-add" />,
                  },
                ],
              },
            ]}
          ></Menu>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Frame;
