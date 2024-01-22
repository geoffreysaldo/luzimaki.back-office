import { Button, Card, Skeleton } from "@nextui-org/react";
import { useCallback } from "react";
import {
  ProductCategoriesGet,
  ProductCategoriesGet_productCategoriesGet,
} from "../../graphql/products/queries/__generated__/ProductCategoriesGet";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_CATEGORIES } from "../../graphql/products/queries/get-products-categories.query";
import { useSelector } from "react-redux";
import { AuthRestorerResponse } from "../../store/auth.slice";

interface ProductsCategoriesBarProps {
  categories?: (ProductCategoriesGet_productCategoriesGet | null)[];
  selectedCategoryId?: string;
  loading: boolean;
  emitCategory: (categoryId: string) => void;
}

function ProductsCategoriesBar(props: ProductsCategoriesBarProps) {
  const handleSelectedCategory = useCallback((categoryId: string) => {
    props.emitCategory(categoryId);
  }, []);

  const skeletonMarkup = (
    <div className="flex flex-col">
      <Skeleton isLoaded={props.loading} className="rounded-lg">
        <div className="h-6 rounded-lg"></div>
      </Skeleton>
    </div>
  );

  const productCategoriesButtonsList = (
    <div className="flex flex-col space-y-1 p-1">
      {props.categories?.map(
        (pC: ProductCategoriesGet_productCategoriesGet | null, i: number) => (
          <Button
            key={`${pC?.name}-${i}`}
            className="h-20"
            color={
              props.selectedCategoryId === pC?.id ? "secondary" : "primary"
            }
            onClick={() => handleSelectedCategory(pC!.name)}
          >
            {pC!.name}
          </Button>
        )
      )}
    </div>
  );

  return (
    <Card className="w-32 h-full">
      {props.loading && skeletonMarkup}
      {!props.loading && productCategoriesButtonsList}
    </Card>
  );
}

export default ProductsCategoriesBar;
