import {
  OrderMode,
  OrderSource,
} from "../../graphql/__generated__/globalTypes";
import { FilterType } from "../common/enums/filter-type.enum";
import { FilterProps } from "../common/interfaces/filter.interface";

export const ORDERS_LIST_FILTERS: FilterProps[] = [
  {
    key: "expectedAt",
    label: "Date de distribution",
    type: FilterType.DATE,
  },
  {
    key: "issuedAt",
    label: "Date de réception",
    type: FilterType.DATE,
  },
  {
    key: "mode",
    label: "Mode de distribution",
    type: FilterType.FACET,
    options: [OrderMode.DELIVERY, OrderMode.TAKE_AWAY, OrderMode.ON_PLACE],
  },
  {
    key: "source",
    label: "Source",
    type: FilterType.FACET,
    options: [OrderSource.FRONT_OFFICE, OrderSource.BACK_OFFICE],
  },
];
