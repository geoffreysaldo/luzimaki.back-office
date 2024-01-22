import { FilterType } from "../enums/filter-type.enum";

export interface FilterProps {
  key: string;
  label: string;
  options?: string[];
  type: FilterType;
}
