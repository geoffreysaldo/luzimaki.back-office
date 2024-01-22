import { Card, Select, SelectItem } from "@nextui-org/react";
import { GET_STORE_SETTINGS } from "../../graphql/store/queries/get-store-settings.query";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { GetStoreSettings } from "../../graphql/store/queries/__generated__/GetStoreSettings";
import { UPDATE_STORE_SETTINGS } from "../../graphql/store/mutations/update-store-settings.mutation";
import { UpdateStoreSettings } from "../../graphql/store/mutations/__generated__/UpdateStoreSettings";

const WAITING_TIMES_OPTIONS = [
  { value: "900000", label: "15min" },
  { value: "1800000", label: "30min" },
  { value: "2700000", label: "45min" },
  { value: "3600000", label: "1h" },
  { value: "4500000", label: "1h15" },
  { value: "5400000", label: "1h30" },
  { value: "6300000", label: "1h45" },
  { value: "7200000", label: "2h" },
];

interface SettingsCard {}

function SettingsCard() {
  const storeId = useSelector((state: StoreState) => state.store.id);
  const [updateStoreSettings, { loading: updateStoreSettingsLoading, error: updateStoreSettingsError }] =
    useMutation<UpdateStoreSettings>(UPDATE_STORE_SETTINGS);

  const {
    data: storeSettingsData,
    loading,
    error,
  } = useQuery<GetStoreSettings>(GET_STORE_SETTINGS, {
    variables: {
      id: storeId,
    },
  });

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
      deliveryWaitingTime: "0",
      takeAwayWaitingTime: "0",
    },
  });

  useEffect(() => {
    setValue("deliveryWaitingTime", storeSettingsData?.getStore.settings?.deliveryWaitingTime.toString() || "0");
    setValue("takeAwayWaitingTime", storeSettingsData?.getStore.settings?.takeAwayWaitingTime.toString() || "0");
  }, [storeSettingsData]);

  const handleDeliveryTimeChange = useCallback(
    (v: any) => {
      setValue("deliveryWaitingTime", v.target.value);
      handleTimeChange({ deliveryWaitingTime: watch("deliveryWaitingTime"), takeAwayWaitingTime: watch("takeAwayWaitingTime") });
    },
    [storeSettingsData, setValue, watch]
  );

  const handleTakeAwayTimeChange = useCallback(
    (v: any) => {
      setValue("takeAwayWaitingTime", v.target.value);
      handleTimeChange({ deliveryWaitingTime: watch("deliveryWaitingTime"), takeAwayWaitingTime: watch("takeAwayWaitingTime") });
    },
    [storeSettingsData, setValue, watch]
  );

  const handleTimeChange = useCallback(
    async (v: any) => {
      await updateStoreSettings({
        variables: {
          storeId: storeId,
          storeSettingsId: storeSettingsData?.getStore?.settings?.id,
          storeSettingsInput: {
            takeAwayWaitingTime: Number(v.takeAwayWaitingTime),
            deliveryWaitingTime: Number(v.deliveryWaitingTime),
            closeLunchService: storeSettingsData?.getStore?.settings?.closeLunchService,
            closeDinnerService: storeSettingsData?.getStore?.settings?.closeDinnerService,
            closeStore: storeSettingsData?.getStore?.settings?.closeStore,
            textCloseStore: storeSettingsData?.getStore?.settings?.textCloseStore,
          },
        },
      });
    },
    [storeSettingsData]
  );

  return (
    <Card className="flex flex-row space-x-2 p-2">
      <Select className="w-44" label="Attente livraison" onChange={handleDeliveryTimeChange} selectedKeys={[watch("deliveryWaitingTime")]}>
        {WAITING_TIMES_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Select className="w-44" label="Attente à emporter" onChange={handleTakeAwayTimeChange} selectedKeys={[watch("takeAwayWaitingTime")]}>
        {WAITING_TIMES_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </Card>
  );
}

export default SettingsCard;
