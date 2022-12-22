import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import { useFilter } from '../../store/FilterContext';

function FilterSearch() {
  const { setFilters } = useFilter();
  const searchFilters = [
    { name: 'Firma', id: 'idCustomer' },
    { name: 'User', id: 'idUser' },
    { name: 'Data', id: 'data' },
    { name: 'Auto', id: 'car' },
    { name: 'Protokoll', id: 'protocol' },
    { name: 'Limit', id: 'limit' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterIsSet = event.target.value ? true : false;
    const filter = {
      name: event.target.id,
      isSet: filterIsSet,
      value: event.target.value,
    };
    setFilters(filter);
  };

  return (
    <>
      {searchFilters.map((filter) => (
        <ListItem key={filter.id} disablePadding>
          <ListItemButton>
            <TextField
              sx={{ mr: 1, ml: 1 }}
              fullWidth
              id={filter.id}
              label={filter.name}
              variant="outlined"
              onChange={handleChange}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}

export default FilterSearch;
