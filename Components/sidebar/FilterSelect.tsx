import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFilter } from '../../store/FilterContext';

type props = {
  filterObj: {
    name: string;
    values: any[] | null;
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(filter: string, filterData: string[], theme: Theme) {
  return {
    fontWeight:
      filterData.indexOf(filter) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function preTranslate(value: string | string[] | null) {
  if (typeof value == 'string') {
    return translate(value);
  } else if (value) {
    return value.map((el) => translate(el));
  }
}

function translate(value: string) {
  if (!value) {
    value = 'unknown';
  }
  switch (value) {
    case 'unknown':
      return 0;
    case 'critical error':
      return 1;
    case 'error':
      return 2;
    case 'warning':
      return 3;
    case 'info':
      return 4;
    case 'HOMEPAGE-TOOL':
      return 9;
    case 'SHOW-ROOM':
      return 10;
  }
  return 0;
}

function FilterSelect({ filterObj }: props) {
  const theme = useTheme();
  const [filterData, setFilterData] = React.useState<string[]>([]);
  const { filters, setFilters } = useFilter();

  const handleChange = (event: SelectChangeEvent<typeof filterData>) => {
    const {
      target: { value },
    } = event;
    setFilterData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );

    const filterIsSet = value ? true : false;
    const filterValue = value ? value : null;
    const filter = {
      name: filterObj.name,
      isSet: filterIsSet,
      value: preTranslate(filterValue),
    };
    setFilters(filter);
  };

  const filterValues: any[] = filterObj.values === null ? [] : filterObj.values;

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={filterObj.name + '-label'}>{filterObj.name}</InputLabel>
        <Select
          labelId={filterObj.name + '-label'}
          id={filterObj.name}
          name={filterObj.name}
          value={filterData}
          multiple
          onChange={handleChange}
          input={<OutlinedInput label="Filter" />}
          MenuProps={MenuProps}
        >
          {filterValues.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, filterData, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterSelect;
