import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FilterSelect from './FilterSelect';
import { useFilter } from '../../store/FilterContext';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {filter.map((filter) => (
          <ListItem key={filter.name} disablePadding>
            <ListItemButton>
              <FilterSelect filterObj={filter} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const anchor: Anchor = 'right';

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
      </Drawer>
    </React.Fragment>
  );
}

export default Filterpanel;