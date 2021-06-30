import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Catalog from './Pages/Catalog';
import MyModules from './Pages/MyModules';
import About from './Pages/About';
import Champions from './Pages/Champions';
import myModules from '../mocks/myModules';
import '../css/MenuTabs.css';
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: 'inherit',
    backgroundColor: 'aliceblue',
    height: '100vh',
  },
}));

const MenuTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
      >
        <Tab label='Catlog' {...a11yProps(0)} />
        <Tab label='My Modules' {...a11yProps(1)} />
        <Tab label='Champions' {...a11yProps(2)} />
        <Tab label='About' {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Catalog />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyModules />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Champions />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <About />
      </TabPanel>
    </div>
  );
};
export default MenuTabs;
