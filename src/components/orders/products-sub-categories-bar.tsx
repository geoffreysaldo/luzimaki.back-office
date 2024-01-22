import { Button, Card } from "@nextui-org/react";
import { ProductCategoryFragment_subCategories } from "../../graphql/products/fragments/__generated__/ProductCategoryFragment";
import { Icon } from "@iconify/react";

interface ProductsSubCategoriesBarProps {
  subCategories?: (ProductCategoryFragment_subCategories | null)[];
  selectedSubCategories?: string[];
  emitSubCategoryId: (subCategoryId: string) => void;
}

function ProductsSubCategoriesBar(props: ProductsSubCategoriesBarProps) {
  return props?.subCategories!.length > 0 ? (
    <Card className="h-24">
      <div className="inline pb-1">
        {props.subCategories?.map((sC, i) => (
          <Button
            key={`${sC?.code}-${i}`}
            className="ml-1 mt-1 w-24/100 h-10"
            color={
              props.selectedSubCategories?.includes(sC?.code!)
                ? "warning"
                : "secondary"
            }
            onClick={() => props.emitSubCategoryId(sC!.code)}
          >
            {sC?.code}
          </Button>
        ))}
      </div>
    </Card>
  ) : (
    <Card className="h-24">Aucune sous categorie</Card>
  );
}

export default ProductsSubCategoriesBar;
