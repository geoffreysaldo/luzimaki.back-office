import NewOrderCard from "./new-order-card";

interface NewOrdersListProps {
  notifications: string[];
}

function NewOrdersList({ notifications }: NewOrdersListProps) {
  return (
    <>
      {notifications.map((n) => (
        <NewOrderCard orderId={n} />
      ))}
    </>
  );
}

export default NewOrdersList;
