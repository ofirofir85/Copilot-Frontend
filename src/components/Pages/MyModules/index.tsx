import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import myModules, { MyModule, Configurion } from '../../../mocks/myModules';
import Button from '@material-ui/core/Button';
import Module from '../Catalog/Module';
import Configution from './Configution';
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
  },
}));

const MyModules = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [modules, setModules] = useState([]);
  useEffect(() => {
    fetch('//127.0.0.1:5000/get_my_modules')
      .then((response) => response.json())
      .then((modules) => setModules(modules.data));
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  console.log(modules);

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
        {modules.map((module: { module_name: string }, index: number) => (
          <Tab
            label={module.module_name.toUpperCase().replace('_', ' ')}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {modules.map(
        (
          module: {
            module_name: string;
            configuration: Configurion;
            hashtags: string[];
            description: string;
            likes: number;
          },
          i
        ) => (
          <TabPanel value={value} index={i}>
            <div className='moduleConfig'>
              <div className='moduleInfo'>
                <Module
                  discription={module.description}
                  hashtags={module.hashtags}
                />
                <Button autoFocus onClick={() => console.log()} color='primary'>
                  {module.likes} <FavoriteBorderIcon />
                </Button>
              </div>
              <Configution
                config={module.configuration}
                moduleName={module.module_name}
              />
            </div>
          </TabPanel>
        )
      )}
    </div>
  );
};
export default MyModules;
