import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { EditCloseStoreSettings } from "../../graphql/store/mutations/__generated__/EditCloseStoreSettings";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_CLOSE_STORE_SETTINGS } from "../../graphql/store/mutations/edit-close-store-settings.mutation";
import { GetStoreSettings } from "../../graphql/store/queries/__generated__/GetStoreSettings";
import { GET_STORE_SETTINGS } from "../../graphql/store/queries/get-store-settings.query";
import { useCallback, useMemo } from "react";
import { Card, Checkbox } from "@nextui-org/react";

interface CloseStoreCardProps {}

function CloseStoreCard() {
  const storeId = useSelector((state: StoreState) => state.store.id);

  const { data: getStoreSettingsData, loading } = useQuery<GetStoreSettings>(GET_STORE_SETTINGS, { variables: { id: storeId } });
  const [editCloseStoreSettings, { loading: editCloseStoreLoading, error: editCloseStoreError }] =
    useMutation<EditCloseStoreSettings>(EDIT_CLOSE_STORE_SETTINGS);

  const storeSettings = useMemo(() => getStoreSettingsData?.getStore.settings, [getStoreSettingsData]);
  console.log(storeSettings);

  const handleChangeLunch = useCallback(
    (value: any) => {
      try {
        editCloseStoreSettings({
          variables: {
            storeSettingsId: storeSettings?.id,
            closeStoreSettingsInput: {
              closeLunchService: value.target.checked,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [storeSettings]
  );

  const handleChangeDinner = useCallback(
    (value: any) => {
      try {
        editCloseStoreSettings({
          variables: {
            storeSettingsId: storeSettings?.id,
            closeStoreSettingsInput: {
              closeDinnerService: value.target.checked,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [storeSettings]
  );

  const hasClosedService = useCallback(() => storeSettings?.closeLunchService || storeSettings?.closeDinnerService, [storeSettings]);

  return (
    <Card className={`flex flex-row p-2 border-2 ${hasClosedService() && "border-red-400"}`}>
      <Checkbox isSelected={storeSettings?.closeLunchService} onChange={handleChangeLunch}>
        Fermer service déjeuner
      </Checkbox>
      <Checkbox isSelected={storeSettings?.closeDinnerService} onChange={handleChangeDinner}>
        Fermer service dinner
      </Checkbox>
    </Card>
  );
}

export default CloseStoreCard;
