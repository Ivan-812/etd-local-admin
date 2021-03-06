import { ListItemText } from '@material-ui/core';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Hidden,
  ListItemButton,
  IconButton,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Spacer from './Spacer';
import { UIProviderContext } from '../pages/model/UIProvider';

export interface Menu {
  title: string;
  icon: JSX.Element;
  link: string;
}

interface Props {
  children?: any;
  menus: Menu[];
}

const drawerWidth = 60;

export default function Layout(props: Props) {
  const { children, menus } = props;
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { drawerOpen, setDrawerOpen } = React.useContext(UIProviderContext);

  React.useEffect(() => {
    if (router.pathname !== '/') {
      let found = menus.findIndex(
        (m) => router.pathname.includes(m.link) && m.link !== '/'
      );
      if (found) {
        setSelectedIndex(found);
      }
    } else {
      setSelectedIndex(0);
    }
  }, [router.pathname]);

  return (
    <div>
      <Hidden mdDown>
        <Drawer variant="permanent">
          <List style={{ width: drawerWidth, overflowX: 'hidden' }}>
            {menus.map((m, i) => (
              <Link href={m.link} key={`item-${i}`}>
                <ListItemButton selected={selectedIndex === i}>
                  <Tooltip title={m.title}>
                    <ListItemIcon>{m.icon}</ListItemIcon>
                  </Tooltip>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
        >
          <List style={{ overflowX: 'hidden', width: 200 }}>
            {menus.map((m, i) => (
              <Link href={m.link} key={`item-${i}`}>
                <ListItemButton selected={selectedIndex === i}>
                  <ListItemIcon>{m.icon}</ListItemIcon>
                  <ListItemText primary={m.title} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <main style={{ marginLeft: drawerWidth, padding: 30 }}>{children}</main>
      </Hidden>
      <Hidden smUp>
        <Spacer height={70} />
        <main style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30 }}>
          {children}
        </main>
      </Hidden>
    </div>
  );
}
