import { ReactNode, useContext, createContext, useState } from 'react';

type filterValue = { name: string; isSet: true | false; value: any };
type filterValues = filterValue[];
type selectValues = { name: string; values: null | any[] }[];

type filterContextType = {
  filters: filterValues;
  selectValues: selectValues;
  setFilters: (newFilter: filterValue) => void;
  getFilters: () => filterValues;
  setSelectValues: (selectValues: selectValues) => void;
  getSelectValues: () => selectValues;
};

type props = {
  children: ReactNode;
};

export const defaultFilters = [
  { name: 'idCustomer', isSet: false, value: null },
  { name: 'idUser', isSet: false, value: null },
  { name: 'level', isSet: false, value: null },
  { name: 'source', isSet: false, value: null },
  { name: 'dateFrom', isSet: false, value: null },
  { name: 'dateTo', isSet: false, value: null },
  { name: 'status', isSet: false, value: null },
  { name: 'portal', isSet: false, value: null },
  { name: 'protocol', isSet: false, value: null },
  { name: 'data', isSet: false, value: null },
  { name: 'car', isSet: false, value: null },
  { name: 'limit', isSet: true, value: 100 },
];

const FilterContextDefaultValues: filterContextType = {
  filters: defaultFilters,
  selectValues: [
    { name: 'source', values: null },
    { name: 'status', values: null },
    { name: 'level', values: null },
    { name: 'portal', values: null },
  ],
  setFilters: () => {},
  getFilters: () => {
    return [];
  },
  setSelectValues: () => {},
  getSelectValues: () => {
    return [];
  },
};

const FilterContext = createContext<filterContextType>(
  FilterContextDefaultValues
);

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: props) {
  const [filter, setFilter] = useState(FilterContextDefaultValues.filters);
  const [filterValues, setFilterValues] = useState(
    FilterContextDefaultValues.selectValues
  );

  const setFilters = (newFilter: filterValue) => {
    filter.push(newFilter);
    setFilter(filter);
    console.log(newFilter);
    
  };

  const getFilters = () => {
    return filter;
  };

  const setSelectValues = (selectValues: selectValues) => {
    setFilterValues(selectValues);
  };

  const getSelectValues = () => {
    return filterValues;
  };

  const values = {
    filters: filter,
    selectValues: filterValues,
    setFilters,
    getFilters,
    setSelectValues,
    getSelectValues,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}
