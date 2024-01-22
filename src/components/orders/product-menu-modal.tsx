import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ProductFragment } from "../../graphql/products/fragments/__generated__/ProductFragment";
import { GET_PRODUCT_MENU_STEPS } from "../../graphql/products/queries/get-products-menu-steps.query";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { useFieldArray, useForm } from "react-hook-form";
import { Key, useCallback, useEffect, useState } from "react";
import { ChoiceInput } from "../../graphql/__generated__/globalTypes";
import { toEuro } from "../../utils/to-euro.pipe";
import { ProductMenuOptionFragment } from "../../graphql/products/fragments/__generated__/ProductMenuOptionFragment";
import { capitalize } from "../../utils/capitalize";

interface ProductMenuModalProps {
  open: boolean;
  product?: ProductFragment;
  onClose: () => void;
  onSubmit: (fields: any) => void;
}

type FormValues = {
  choice: ChoiceInput[];
};

function ProductMenuModal({
  open,
  product,
  onClose,
  onSubmit,
}: ProductMenuModalProps) {
  const [selectedTab, setSelectedTab] = useState<any>(
    product?.menuChoices.at(0)?.category!
  );

  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      choice: [],
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    name: "choice",
    control,
  });

  useEffect(() => {
    remove();
    product?.menuChoices.map((mC) =>
      append({
        stepId: mC?.id || "",
        step: mC?.step || 0,
        category: mC?.category || "",
        optionId: mC?.options?.at(0)?.id || "",
        productId: mC?.options.at(0)?.productId || "",
        productTitle: mC?.options.at(0)?.product.title || "",
        productImage: "",
        isForced: mC?.options.at(0)?.isForced || false,
        extraCharge: mC?.options.at(0)?.extraCharge || 0,
        quantity: 1,
      })
    );
  }, [product]);

  const handleTabSelection = (index: Key) => {
    setSelectedTab(index);
  };

  const getChosenProductByStep = useCallback(
    (step: number) => {
      return fields.find((p) => p.step === step);
    },
    [fields]
  );

  const handleChoseOption = useCallback(
    (pO: ProductMenuOptionFragment) => {
      const idx = fields.findIndex((o) => o.stepId === selectedTab);
      update(idx, {
        stepId: fields?.at(idx)?.stepId || "",
        step: fields?.at(idx)?.step || 0,
        category: fields?.at(idx)?.category || "",
        optionId: pO.id,
        productId: pO.productId,
        productTitle: pO.product.title,
        productImage: "",
        isForced: pO.isForced,
        extraCharge: pO.extraCharge,
        quantity: 1,
      });
    },
    [fields, selectedTab, update]
  );

  const handleSubmit = useCallback(() => {
    onSubmit({ product: product, lines: fields });
  }, [fields]);

  const tabsMarkup = (
    <Tabs
      aria-label="Options"
      fullWidth
      selectedKey={selectedTab}
      onSelectionChange={handleTabSelection}
    >
      {product?.menuChoices.map((mC) => (
        <Tab
          key={mC?.id}
          title={`${capitalize(mC?.category!)}: ${
            getChosenProductByStep(mC?.step!)?.productTitle
          }`}
        >
          <Card>
            <CardHeader>{capitalize(mC?.category!)}</CardHeader>
            <CardBody className="space-y-2">
              {mC?.options.map((pO) => (
                <div
                  className={`mx-2 my-2 border-solid border-2 p-4 cursor-pointer rounded-md flex flex-row justify-between w-100 ${
                    pO.productId ===
                      getChosenProductByStep(mC?.step!)?.productId &&
                    "bg-sky-100"
                  }`}
                  onClick={() => handleChoseOption(pO)}
                >
                  <div>{capitalize(pO.product.title)}</div>
                  <div>{pO.extraCharge > 0 && toEuro(pO.extraCharge)}</div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );

  return (
    <Modal isOpen={open} size="3xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {product?.title}
        </ModalHeader>
        <ModalBody>{tabsMarkup}</ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Fermer
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductMenuModal;
