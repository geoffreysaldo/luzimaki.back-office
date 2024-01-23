import { useSelector } from "react-redux";
import Frame from "../components/frame";
import ProductsCategoriesBar from "../components/orders/products-categories-bar";
import ProductsSubCategoriesBar from "../components/orders/products-sub-categories-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductsGrid from "../components/orders/products-grid";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../graphql/products/queries/search-products.query";
import { SearchProducts, SearchProducts_searchProducts_products } from "../graphql/products/queries/__generated__/SearchProducts";
import { ProductCategoryFragment_subCategories } from "../graphql/products/fragments/__generated__/ProductCategoryFragment";
import { ProductCategoriesGet } from "../graphql/products/queries/__generated__/ProductCategoriesGet";
import { GET_PRODUCTS_CATEGORIES } from "../graphql/products/queries/get-products-categories.query";
import ShoppingBagCard from "../components/orders/shopping-bag-card";
import { StoreState } from "../store";
import OrderInformations from "../components/orders/order-informations";
import { CREATE_ORDER } from "../graphql/orders/mutations/create-orders.mutation";
import { OrderMode, OrderSource } from "../__generated__/globalTypes";
import { Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AdminOrderCreate } from "../graphql/orders/mutations/__generated__/AdminOrderCreate";

function NewOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<(ProductCategoryFragment_subCategories | null)[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<(SearchProducts_searchProducts_products | null)[]>();

  const storeId = useSelector((state: StoreState) => state.auth.storeIds?.at(0));

  const shoppingBag = useSelector((state: StoreState) => state.shoppingBag);
  const { data, error } = useQuery<ProductCategoriesGet>(GET_PRODUCTS_CATEGORIES, {
    variables: {
      storeId: storeId,
    },
    skip: !storeId,
  });

  const [searchProducts, { loading: searchProductsLoading, error: searchProductsError }] = useLazyQuery<SearchProducts>(SEARCH_PRODUCTS, {
    onCompleted: (data) => {
      setSearchedProducts(data.searchProducts.products);
    },
  });

  const [createOrder, { loading: createOrderLoading, error: createOrderError }] = useMutation<AdminOrderCreate>(CREATE_ORDER);

  const categories = useMemo(() => data?.productCategoriesGet, [data]);

  useEffect(() => {
    searchProducts({
      variables: {
        searchInput: {
          facets: [
            {
              key: "storeId",
              value: storeId,
            },
            selectedCategory && {
              key: "category",
              value: selectedCategory,
            },
          ],
          from: 0,
          to: 200,
        },
      },
    });

    setSubCategoriesOptions(categories?.find((pC) => pC?.name === selectedCategory)?.subCategories || []);
  }, [selectedCategory, selectedSubCategories, categories]);

  const handleSelectedCategory = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      setSelectedSubCategories([]);
    },
    [categories, selectedCategory]
  );

  const handleSelectedSubCategory = useCallback(
    (subCategory: string) => {
      if (selectedSubCategories?.includes(subCategory)) {
        setSelectedSubCategories(selectedSubCategories.filter((sC) => sC !== subCategory));
      } else {
        setSelectedSubCategories([...(selectedSubCategories || []), subCategory]);
      }
    },
    [selectedSubCategories, setSelectedSubCategories]
  );

  const handleNewOrder = useCallback(
    async (orderInformations: any) => {
      setLoading(true);
      const totalDiscount = Number(
        (shoppingBag.lines.map((oL) => oL.totalTaxInclusive).reduce((a, b) => a + b, 0) * (shoppingBag.discount.value / 100)).toFixed(2)
      );
      const total = Number(
        (
          shoppingBag.lines.map((oL) => oL.total).reduce((a, b) => a + b, 0) -
          totalDiscount /* +
          (deliveryCost + shoppingBagCtx.tips )*/ /
            (1 + 0.2)
        ).toFixed(2)
      );
      const totalTaxInclusive = Number(
        (shoppingBag.lines.map((oL) => oL.totalTaxInclusive).reduce((a, b) => a + b, 0) - totalDiscount) /*+
          deliveryCost +
          shoppingBagCtx.tips*/
          .toFixed(2)
      );
      await createOrder({
        variables: {
          storeId: storeId,
          orderInput: {
            comment: orderInformations.comment,
            contact: {
              lastname: orderInformations.lastname,
              firstname: orderInformations.firstname,
              address: orderInformations.mode === OrderMode.DELIVERY ? orderInformations.address : undefined,
              addressComplement: orderInformations.mode === OrderMode.DELIVERY ? orderInformations.addressComplement : undefined,
              city: orderInformations.mode === OrderMode.DELIVERY ? orderInformations.city : undefined,
              zipCode: orderInformations.mode === OrderMode.DELIVERY ? orderInformations.zipCode : undefined,
              email: orderInformations.email,
              phone: orderInformations.phone,
              comment: orderInformations.comment,
            },
            guestsNumber: Number(orderInformations.guestsNumber) || undefined,
            discount: Number(shoppingBag.discount.value),
            discountCode: shoppingBag.discount.identifier,
            expectedAt: orderInformations.expectedAt,
            lines: shoppingBag.lines,
            mode: orderInformations.mode,
            source: OrderSource.BACK_OFFICE,
            tips: shoppingBag.tips > 0 ? shoppingBag.tips : undefined,
            total: total,
            totalTaxInclusive: totalTaxInclusive,
            totalShipping: orderInformations.totalShipping || 0,
            totalDiscount: totalDiscount,
            totalVat: totalTaxInclusive - total,
          },
        },
      }).then(() => {
        setTimeout(() => {
          setLoading(false);
          navigate("/orders");
        }, 4000);
      });
    },
    [shoppingBag]
  );

  const loadingMarkup = (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <Spinner />
      <div>Enregistrement de la commande en cours...</div>
    </div>
  );

  const createOrderMarkup = (
    <div className="w-full h-192 flex flex-row space-x-1">
      <ProductsCategoriesBar
        categories={categories}
        selectedCategoryId={selectedCategory}
        loading={loading}
        emitCategory={(categoryId) => handleSelectedCategory(categoryId)}
      />
      <div className="w-3/6 space-y-1 h-full">
        <ProductsSubCategoriesBar
          subCategories={subCategoriesOptions}
          selectedSubCategories={selectedSubCategories}
          emitSubCategoryId={(subCategoryId) => handleSelectedSubCategory(subCategoryId)}
        />
        <ProductsGrid
          products={searchedProducts?.filter((sP) => (selectedSubCategories?.length === 0 ? true : selectedSubCategories?.includes(sP?.subCategory as string)))}
        />
      </div>
      <div className="w-1/5">
        <ShoppingBagCard />
      </div>
      <div className="w-1/5">
        <OrderInformations emitOrderInformations={(orderInformations) => handleNewOrder(orderInformations)} />
      </div>
    </div>
  );
  return (
    <Frame>
      {loading && loadingMarkup}
      {!loading && createOrderMarkup}
    </Frame>
  );
}

export default NewOrder;
