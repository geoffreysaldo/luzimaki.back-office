import {
  FacetInput,
  NumericFilterInput,
} from "../../../graphql/__generated__/globalTypes";

export interface FilterInput {
  facets: FacetInput[];
  numericFilters: NumericFilterInput[];
}
