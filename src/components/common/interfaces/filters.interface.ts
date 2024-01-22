import { FilterInput } from "./filter-input.interface";
import { FilterProps } from "./filter.interface";

export interface FiltersProps {
  filters: FilterProps[];
  onChangeFilter: (filterState: any) => void;
}
