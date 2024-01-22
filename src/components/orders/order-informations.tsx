import { Button, Card, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { OrderMode } from "../../__generated__/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { DeliveryZoneFragment } from "../../graphql/store/fragments/__generated__/DeliveryZoneFragment";
import { ZoneFragment } from "../../graphql/store/fragments/__generated__/ZoneFragment";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { SearchContact } from "../../graphql/orders/queries/__generated__/SearchContact";
import { SEARCH_CONTACTS } from "../../graphql/orders/queries/search-contact.query";
import { useQuery } from "@apollo/client";
import { ShoppingBagActions } from "../../store/shopping-bag";

interface OrderInformationsProps {
  emitOrderInformations: (fieldValues: any) => void;
}

function OrderInformations({ emitOrderInformations }: OrderInformationsProps) {
  const [searchNameQuery, setSearchNameQuery] = useState<string>();
  const storeState = useSelector((state) => (state as any).store);
  const dispatch = useDispatch();

  const orderModeOptions = [
    {
      label: "À emporter",
      value: OrderMode.TAKE_AWAY,
    },
    {
      label: "Livraison",
      value: OrderMode.DELIVERY,
    },
    {
      label: "Sur place",
      value: OrderMode.ON_PLACE,
    },
  ];
  const deliveryZonesOptions = useMemo(
    () =>
      storeState.deliveryZones.flatMap((dZ: DeliveryZoneFragment) =>
        dZ.zones.map((z) => ({
          label: `${z?.city} - ${z?.zipCode}`,
          value: z?.zipCode,
        }))
      ),
    [storeState]
  );

  const {
    data: searchContactData,
    loading,
    error,
  } = useQuery<SearchContact>(SEARCH_CONTACTS, {
    variables: {
      storeId: storeState.id,
      searchName: searchNameQuery,
    },
    skip: !searchNameQuery,
  });

  const contactOptions = useMemo(
    () =>
      (searchContactData?.searchContact || []).map((c) => ({
        label: c?.lastname,
        value: c?.id,
        accountId: c?.accountId,
        lastname: c?.lastname,
        firstname: c?.firstname,
        phone: c?.phone,
        address: c?.address,
        addressComplement: c?.addressComplement,
        zipCode: c?.zipCode,
        city: c?.city,
      })),
    [searchContactData]
  );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guestsNumber: 0,
      firstname: "",
      lastname: "",
      phone: "",
      mode: OrderMode.TAKE_AWAY,
      expectedAtDay: new Date(),
      address: "",
      addressComplement: "",
      city: "",
      zipCode: "",
      comment: "",
    },
  });

  const getCity = (zipCode: string) => {
    return storeState.deliveryZones.flatMap((dZ: DeliveryZoneFragment) => dZ.zones).find((z: ZoneFragment) => z.zipCode === zipCode).city;
  };

  const setOrderInformationsSubmit = (values: any) => {
    const deliveryInformations =
      (values.mode === OrderMode.DELIVERY && {
        address: values.address,
        addressComplement: values.addressComplement,
        city: getCity(values?.zipCode),
        zipCode: values.zipCode,
      }) ||
      {};
    console.log(values);
    emitOrderInformations({
      firstname: values.firstname,
      lastname: values.lastname,
      phone: values.phone,
      mode: values.mode,
      expectedAt: new Date(values.expectedAtDay).getTime(),
      ...deliveryInformations,
      comment: values.comment,
      guestsNumber: values.guestsNumber,
    });
  };

  const handleSearchContact = (v: string) => {
    setSearchNameQuery(v);
  };

  const handleSelectContact = useCallback(
    (v: any) => {
      const contact = contactOptions.find((cO) => cO.value === v);

      setValue("lastname", contact?.lastname || "");
      setValue("firstname", contact?.firstname || "");
      setValue("phone", contact?.phone || "");

      if (watch("mode") === OrderMode.DELIVERY) {
        setValue("address", contact?.address || "");
        setValue("addressComplement", contact?.addressComplement || "");
        setValue("city", contact?.city || "");
        setValue("zipCode", contact?.zipCode || "");
      } else {
        setValue("address", "");
        setValue("addressComplement", "");
        setValue("city", "");
        setValue("zipCode", "");
      }
    },
    [contactOptions, setValue, watch]
  );

  const handleDiscountChange = useCallback(
    (value: any) => {
      dispatch(ShoppingBagActions.setDiscount(value));
    },
    [dispatch]
  );

  const handleSelectDiscount = useCallback(
    (value: any) => {
      dispatch(ShoppingBagActions.setDiscount(value));
    },
    [dispatch]
  );

  return (
    <Card className="w-full p-1 h-192">
      <form className="space-y-2 h-full" onSubmit={handleSubmit(setOrderInformationsSubmit)}>
        <Select label="Mode de distribution" {...register("mode")} defaultSelectedKeys={[watch("mode")]}>
          {orderModeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="datetime-local"
          isRequired
          {...register("expectedAtDay")}
          validationState={errors.expectedAtDay ? "invalid" : "valid"}
          errorMessage={errors.expectedAtDay ? "La date est requis" : null}
        />

        <Input type="number" label="Couverts" {...register("guestsNumber")} min="0" />

        <Divider></Divider>

        <Autocomplete
          label="Nom"
          allowsCustomValue
          required
          onInputChange={(v) => handleSearchContact(v)}
          items={contactOptions}
          validationState={errors.lastname ? "invalid" : "valid"}
          errorMessage={errors.lastname ? "Le nom est requis" : null}
          onSelectionChange={(v) => handleSelectContact(v)}
        >
          {(item) => (
            <AutocompleteItem key={item.value || ""} value={item.value}>
              {item.label}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Input
          type="text"
          label="Prénom"
          isRequired
          {...register("firstname")}
          validationState={errors.lastname ? "invalid" : "valid"}
          errorMessage={errors.lastname ? "Le prénom est requis" : null}
        />

        <Input type="text" label="Téléphone" {...register("phone")} />

        {watch("mode") === OrderMode.DELIVERY && (
          <div className="space-y-2">
            <Input
              type="text"
              label="address"
              isRequired
              {...register("address")}
              validationState={errors.address ? "invalid" : "valid"}
              errorMessage={errors.address ? "L'adresse est requise" : null}
            />

            <Input type="text" label="Complément d'adresse" {...register("addressComplement")} />

            <Select label="Ville" {...register("zipCode")} selectedKeys={[watch("zipCode")]}>
              {deliveryZonesOptions.map((option: { label: string; value: string }) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}

        <Input type="text" label="Commentaire" {...register("comment")} />

        <Autocomplete
          label="Remise"
          allowsCustomValue
          type="number"
          max={100}
          min={0}
          onInputChange={(v) => handleDiscountChange(v)}
          defaultItems={[{ value: "10", label: "10" }]}
          onSelectionChange={(v) => handleSelectDiscount(v)}
        >
          {(item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button type="submit">Enregistrer</Button>
      </form>
    </Card>
  );
}

export default OrderInformations;
