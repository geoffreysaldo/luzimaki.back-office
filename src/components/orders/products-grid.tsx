import { Button, Card } from "@nextui-org/react";
import { SearchProducts_searchProducts_products } from "../../graphql/products/queries/__generated__/SearchProducts";
import { toEuro } from "../../utils/to-euro.pipe";
import { ProductFragment } from "../../graphql/products/fragments/__generated__/ProductFragment";
import { useDispatch } from "react-redux";
import { ShoppingBagActions } from "../../store/shopping-bag";
import { ProductModel } from "../../__generated__/globalTypes";
import { useState } from "react";
import ProductMenuModal from "./product-menu-modal";

interface ProductMenuModalConfig {
  open: boolean;
  product?: ProductFragment;
}

interface ProductsGridProps {
  products: (SearchProducts_searchProducts_products | null)[] | undefined;
}

function ProductsGrid(props: ProductsGridProps) {
  const dispatch = useDispatch();
  const [productMenuModalConfig, setProductMenuModalConfig] = useState<ProductMenuModalConfig>({ open: false, product: undefined });

  const handleAddProduct = (p: ProductFragment) => {
    if (p.model === ProductModel.PRODUCT) {
      dispatch(ShoppingBagActions.addProduct(p));
    } else {
      setProductMenuModalConfig({ open: true, product: p });
    }
  };

  const handleCloseModal = () => {
    setProductMenuModalConfig({ open: false, product: undefined });
  };

  const productMenuModalMarkup = (
    <ProductMenuModal
      open={productMenuModalConfig.open}
      product={productMenuModalConfig.product}
      onClose={() => setProductMenuModalConfig({ open: false, product: undefined })}
      onSubmit={(result) => {
        const lines = result.lines.map((l: any) => ({
          stepId: l.stepId,
          step: l.step,
          category: l.category,
          optionId: l.optionId,
          productId: l.productId,
          productTitle: l.productTitle,
          productImage: l.productImage,
          isForced: l.isForced,
          extraCharge: l.extraCharge,
          quantity: 1,
        }));
        dispatch(ShoppingBagActions.addBundle({ product: result.product, lines }));
        handleCloseModal();
      }}
    />
  );

  return (
    <Card className="h-164 overflow-y-scroll">
      <div className="inline pb-1">
        {props?.products?.map((p, i) => (
          <Button
            key={`${p?.title}-${i}`}
            className="ml-1 mt-2 w-32/100 h-20"
            onClick={() => {
              handleAddProduct(p!);
            }}
          >
            <div className="flex flex-col justify-center h-full">
              <div className="w-full text-xs whitespace-break-spaces flex items-center justify-center h-8">{p!.title}</div>
              <div className="text-xs flex flex-row justify-end">{toEuro(p?.price)}</div>
            </div>
          </Button>
        ))}
      </div>
      {productMenuModalMarkup}
    </Card>
  );
}

export default ProductsGrid;
