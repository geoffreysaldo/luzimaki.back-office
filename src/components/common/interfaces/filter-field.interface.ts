import { FilterType } from "../enums/filter-type.enum";

export interface FilterField {
  key: string;
  label: string;
  options?: string[];
  type: FilterType;
  component: React.ReactElement;
}
