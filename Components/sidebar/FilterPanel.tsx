import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FilterSelect from './FilterSelect';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FilterSearch from './FilterSearch';
import FilterDate from './FilterDate';
import { useRouter } from 'next/router';

type Anchor = 'right';

type props = {
  filter: {
    name: string;
    values: any[];
  }[];
};

function Filterpanel({ filter }: props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const anchor: Anchor = 'right';
  const applyEvent = new Event('applyEvent')

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleApply = () => {
    toggleDrawer(anchor, false)
    window.dispatchEvent(applyEvent);
  }

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <FilterDate />
        {filter.map((filter) => (
          <ListItem key={filter.name} disablePadding>
            <ListItemButton>
              <FilterSelect filterObj={filter} />
            </ListItemButton>
          </ListItem>
        ))}
        <FilterSearch />
      </List>
    </Box>
  );

  return (
    <React.Fragment key={anchor}>
      <IconButton
        onClick={toggleDrawer(anchor, true)}
        style={{ float: 'right' }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
        <Button
          variant="contained"
          sx={{ position: 'absolute', bottom: 0, m: 2, width: '90%' }}
          onClick={handleApply}
        >
          Apply Filter!
        </Button>
      </Drawer>
    </React.Fragment>
  );
}

export default Filterpanel;
