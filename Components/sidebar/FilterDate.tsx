import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { useFilter } from '../../store/FilterContext';

function FilterDate() {
  const [valueFrom, setValueFrom] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [valueTo, setValueTo] = React.useState<Dayjs | null>(dayjs(new Date()));
  const { setFilters } = useFilter();

  const handleChangeFrom = (newValue: Dayjs | null) => {
    setValueFrom(newValue);
    setFilter('dateFrom', newValue);
  };
  const handleChangeTo = (newValue: Dayjs | null) => {
    setValueTo(newValue);
    setFilter('dateTo', newValue);
  };

  const setFilter = (type: string, newValue: Dayjs | null) => {
    const filterIsSet = newValue ? true : false;
    const filter = {
      name: type,
      isSet: filterIsSet,
      value: dayjs(newValue).unix(),
    };

    setFilters(filter);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ mr: 3, ml: 3, mt: 3 }}>
        <DesktopDatePicker
          label="Date From"
          inputFormat="DD.MM.YYYY"
          value={valueFrom}
          onChange={handleChangeFrom}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Date To"
          inputFormat="DD.MM.YYYY"
          value={valueTo}
          onChange={handleChangeTo}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default FilterDate;
