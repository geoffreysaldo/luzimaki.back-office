import { Accordion, AccordionItem, Card, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { FiltersProps } from "./interfaces/filters.interface";
import { useCallback, useEffect, useReducer, useState } from "react";
import { FilterType } from "./enums/filter-type.enum";
import { FilterProps } from "./interfaces/filter.interface";
import { FilterField } from "./interfaces/filter-field.interface";
import { FacetInput } from "../../graphql/__generated__/globalTypes";

function Filters(props: FiltersProps) {
  const { filters, onChangeFilter } = props;
  const [filtersFields, setFiltersFields] = useState<FilterField[]>([]);
  const [filterState, dispatchFilter] = useReducer(filterReducer, {
    facets: [],
    numericFilters: [],
  });

  useEffect(() => {
    onChangeFilter({
      ...filterState,
      numericFilters: filterState.numericFilters.map((nF: any) =>
        nF.type === FilterType.DATE
          ? {
              key: nF.key,
              min: new Date(nF.min).getTime(),
              max: new Date(nF.max).getTime(),
            }
          : { key: nF.key, min: nF.min, max: nF.max }
      ),
    });
  }, [filterState]);

  useEffect(() => {
    if (filters.length) {
      setFiltersFields(buildFilters(filters));
    }
  }, [filters, filterState]);

  const buildFilters = useCallback(
    (filters: FilterProps[]) => {
      return filters.map((f) => {
        switch (f.type) {
          case FilterType.DATE:
            return {
              ...f,
              component: (
                <div className="w-full flex flex-row space-x-1">
                  <Input
                    type="date"
                    variant="bordered"
                    value={formatDateFromEpoch(filterState.numericFilters?.find((nF: any) => f.key === nF.key)?.min)}
                    onChange={(e) =>
                      dispatchFilter({
                        type: f.type,
                        payload: {
                          key: f.key,
                          type: f.type,
                          min: e.target.value,
                        },
                      })
                    }
                  />
                  <Input
                    type="date"
                    variant="bordered"
                    value={formatDateFromEpoch(filterState.numericFilters?.find((nF: any) => f.key === nF.key)?.max)}
                    onChange={(e) =>
                      dispatchFilter({
                        type: f.type,
                        payload: {
                          key: f.key,
                          type: f.type,
                          max: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ),
            };
          case FilterType.FACET:
            return {
              ...f,
              component: (
                <CheckboxGroup
                  value={filterState.facets?.find((fF: any) => f.key === fF.key)?.values || []}
                  onValueChange={(v) =>
                    dispatchFilter({
                      type: f.type,
                      payload: { key: f.key, type: f.type, values: v },
                    })
                  }
                >
                  {f.options?.map((fO, i) => (
                    <Checkbox key={`${f.key}-option-${i}`} value={fO}>
                      {fO}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              ),
            };
          case FilterType.NUMBER:
            return {
              ...f,
              component: (
                <>
                  <Input type="number" onChange={(e) => console.log(e.target.value)} />
                  <Input type="Number" onChange={(e) => console.log(e.target.value)} />
                </>
              ),
            };
        }
      });
    },
    [filterState]
  );

  function filterReducer(
    filterState: any,
    action: {
      type: string;
      payload: {
        key: string;
        type: FilterType;
        values?: string[];
        min?: string;
        max?: string;
      };
    }
  ) {
    switch (action.type) {
      case FilterType.DATE:
        return {
          ...filterState,
          numericFilters: filterState.numericFilters.some((f: any) => f.key === action.payload.key)
            ? filterState.numericFilters.map((f: any) =>
                f.key === action.payload.key
                  ? {
                      ...f,
                      type: action.payload.type,
                      min: action.payload.min || f.min,
                      max: action.payload.max || f.max,
                    }
                  : f
              )
            : [
                ...filterState.numericFilters,
                {
                  type: action.payload.type,
                  key: action.payload.key,
                  min: action.payload.min || undefined,
                  max: action.payload.max || undefined,
                },
              ],
        };
      case FilterType.FACET:
        return {
          ...filterState,
          facets: getFacetFilters(filterState.facets, action),
        };
      default:
        throw new Error();
    }
  }

  return (
    <Card>
      <Accordion>
        {filtersFields.map((f, i) => (
          <AccordionItem key={i} title={f.label}>
            <div className="mx-2">{f.component}</div>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

export default Filters;

function getFacetFilters(facets: FacetInput[], action: { payload: { key: string; value?: string; values?: string[] } }) {
  if (action.payload.values?.length === 0) {
    return facets.filter((f: FacetInput) => f.key !== action.payload.key);
  }

  return facets.some((f: any) => f.key === action.payload.key)
    ? facets.map((f: any) =>
        f.key === action.payload.key
          ? {
              ...f,
              values: action.payload.values,
            }
          : f
      )
    : [
        ...facets,
        {
          key: action.payload.key,
          values: action.payload.values || undefined,
        },
      ];
}

export function formatDateFromEpoch(epoch: number) {
  const date = new Date(epoch);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ajoute un zéro devant si nécessaire
  const day = String(date.getDate()).padStart(2, "0"); // Ajoute un zéro devant si nécessaire

  return `${year}-${month}-${day}`;
}
