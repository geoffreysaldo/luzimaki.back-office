import { Button, Card } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { OrderLineInput, ProductModel } from "../../__generated__/globalTypes";
import { truncate } from "../../utils/truncate.pipe";
import { Icon } from "@iconify/react";
import { ShoppingBagActions } from "../../store/shopping-bag";
import { toEuro } from "../../utils/to-euro.pipe";
import { capitalize } from "../../utils/capitalize";

function ShoppingBagCard() {
  const shoppingBagState = useSelector((state) => (state as any).shoppingBag);
  const dispatch = useDispatch();

  return (
    <Card className="w-full p-1 h-192">
      <div className="text-xl p-1">Panier</div>
      <div className="flex flex-col items-center overflow-y-scroll overflow-y-visible h-140">
        {shoppingBagState.lines.map((oL: OrderLineInput, i: number) => (
          <div className="w-full px-1 py-1 text-sm flex flex-row items-center space-x-1" key={`shopping-bag-line-${oL.productId}-${i}`}>
            <Button
              isIconOnly
              color="primary"
              variant="light"
              size="sm"
              onClick={() => {
                dispatch(ShoppingBagActions.addProductById(oL.productId));
              }}
            >
              <Icon icon="gg:add" width="24" height="24" />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="light"
              size="sm"
              onClick={() => {
                dispatch(ShoppingBagActions.removeProductByIndex(i));
              }}
            >
              <Icon icon="ep:remove" width="24" height="24" />
            </Button>
            <div className="flex flex-col">
              <div>{`${oL.quantity} x ${truncate(oL.productTitle, 30)}`}</div>
              {oL.productModel === ProductModel.MENU &&
                oL?.menuChoices?.map((mC, j) => (
                  <div key={`menu-choice-${i}-${j}`} className="flex flex-row space-x-1">
                    <div className="underline">{`${capitalize(mC?.category!)}:`}</div>
                    <div>{capitalize(mC?.productTitle!)}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="h-16 flex flex-col justify-end">
        <div className="flex flew-row justify-end text-sm">
          Total HT:{" "}
          {toEuro(
            shoppingBagState.lines.map((l: OrderLineInput) => l.total).reduce((acc: number, a: number) => acc + a, 0) *
              (1 - Number(shoppingBagState.discount.value) / 100)
          )}
        </div>
        <div className="flex flew-row justify-end  font-bold">
          Total TTC:{" "}
          {toEuro(
            shoppingBagState.lines.map((l: OrderLineInput) => l.totalTaxInclusive).reduce((acc: number, a: number) => acc + a, 0) *
              (1 - Number(shoppingBagState.discount.value) / 100)
          )}
          {Number(shoppingBagState.discount.value) > 0 && `(- ${shoppingBagState.discount.value}%)`}
        </div>
      </div>
    </Card>
  );
}

export default ShoppingBagCard;
