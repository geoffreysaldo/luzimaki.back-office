import { Accordion, AccordionItem, Button, Card, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { SearchOrdersResponseFragment_orders } from "../../graphql/orders/fragments/__generated__/SearchOrdersResponseFragment";
import { toEuro } from "../../utils/to-euro.pipe";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { OrderMode, OrderSource } from "../../graphql/__generated__/globalTypes";
import { PRINT_ORDER } from "../../graphql/orders/mutations/order-print.mutation";
import { useMutation } from "@apollo/client";
import { OrderPrint } from "../../graphql/orders/mutations/__generated__/orderPrint";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { PaymentState } from "../../__generated__/globalTypes";

interface OrderCardProps {
  order: SearchOrdersResponseFragment_orders;
}

function OrderCard(props: OrderCardProps) {
  const { order } = props;
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const storeId = useSelector((state: StoreState) => state.store.id);

  const [printOrder, { loading, error }] = useMutation<OrderPrint>(PRINT_ORDER);

  const toggleAccordion = () => {
    if (selectedKeys.size) {
      return setSelectedKeys(new Set([]));
    }
    setSelectedKeys(new Set(["1"]));
  };

  const getIconByOrderSource = useCallback(() => {
    switch (order.source) {
      case OrderSource.BACK_OFFICE:
        return <Icon icon="ri:admin-fill" />;
      case OrderSource.FRONT_OFFICE:
        return <Icon icon="devicon:google" />;
    }
  }, [order]);

  const getChipColorByOrderMode = useCallback(() => {
    switch (order.mode) {
      case OrderMode.DELIVERY:
        return "primary";
      case OrderMode.TAKE_AWAY:
        return "secondary";
      case OrderMode.ON_PLACE:
        return "default";
    }
  }, [order]);

  const getPaymentStatusColor = useCallback(() => {
    switch (order.financialState) {
      case PaymentState.PAID:
        return "success";
      case PaymentState.UNPAID:
        return "danger";
    }
  }, [order]);

  const buildOrderTicket = (url: string) => {
    const downloadLink = document.createElement("a");
    const fileName = `${url}`;
    downloadLink.href = `${url}`;
    downloadLink.target = "_blank";
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handlePrint = useCallback(async () => {
    const result = await printOrder({
      variables: {
        storeId: storeId,
        orderId: order.id,
      },
    });
    buildOrderTicket(result.data!.orderPrint);
  }, []);

  return (
    <Card>
      <Accordion selectedKeys={selectedKeys} onSelectionChange={toggleAccordion}>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2">
                <Chip color={getChipColorByOrderMode()} endContent={getIconByOrderSource()}>
                  {order.mode}
                </Chip>
                {order.mode === OrderMode.DELIVERY && <Chip color="warning">{`${order.contact.city}, ${order.contact.zipCode}`}</Chip>}
                {order?.guestsNumber && <Chip className="text-sm">{order.guestsNumber} couverts</Chip>}
                <div>Commande {order.orderNumber}</div>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <Chip>
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(order.expectedAt)}
                </Chip>
                <Chip className="text-sm">
                  {toEuro(order.totalTaxInclusive)} {order.discount > 0 && `(${order.discount}%)`}
                </Chip>
                <Chip color={getPaymentStatusColor()}>{order.financialState}</Chip>
                {order.tips !== null && order.tips > 0 && <Chip color="success">Pourboire {toEuro(order.tips)}</Chip>}
              </div>
            </div>
          }
        >
          <div className="flex flex-row justify-between m-2">
            <div>
              <div>{`${order.contact.firstname} ${order.contact.lastname}`}</div>
              <div>{order.contact.phone}</div>
              {order.mode === OrderMode.DELIVERY && (
                <div className="flex flex-col">
                  <span>{`${order.contact.address}, ${order.contact.zipCode} ${order.contact.city}`}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm italic">
                Reçue le{" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(order.issuedAt)}
              </div>
            </div>
          </div>

          {order.contact.addressComplement && (
            <div className="flex flex-row justify-center font-bold p-3 border-2 my-3 mx-12 rounded-md">Commentaire: {order.contact.addressComplement}</div>
          )}

          <Table shadow="none" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Produit</TableColumn>
              <TableColumn>Quantité</TableColumn>
              <TableColumn>Prix</TableColumn>
            </TableHeader>
            <TableBody>
              {order.lines.map((oL, i) => (
                <TableRow key={`order-line-${oL?.id}-${i}`}>
                  <TableCell>{oL?.productTitle}</TableCell>
                  <TableCell>{oL?.quantity}</TableCell>
                  <TableCell>{toEuro(oL?.totalTaxInclusive)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-row justify-end">
            <Button isLoading={loading} endContent={<Icon icon="material-symbols:print" width="24" height="24" />} onClick={handlePrint}>
              Imprimer
            </Button>
          </div>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default OrderCard;
