import { type } from 'os';
import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Configurion } from '../../../mocks/myModules';
import '../../../css/configuration.css';

interface Props {
  config: Configurion;
  moduleName: string;
}

const Configuration = (props: Props) => {
  const [config, setConfig] = useState<Configurion>(props.config);
  console.log('renderd');
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module_name: props.moduleName }),
    };
    fetch('//127.0.0.1:5000/get_module_config', requestOptions)
      .then((response) => response.json())
      .then((modules) => {
        return setConfig(modules);
      });
  }, []);

  const onChange = (value: string | number | boolean, key: string) => {
    setConfig((prevConfig) => {
      return { ...prevConfig, [key]: value };
    });
  };
  const getInputTypeByValue = (
    value: string | number | boolean,
    key: string
  ) => {
    switch (typeof value) {
      case 'string':
        return (
          <TextField
            onChange={(e) => onChange(e.target.value, key)}
            required
            id='outlined-required'
            defaultValue={value}
          />
        );
        break;
      case 'number':
        return (
          <TextField
            id='outlined-number'
            label='Number'
            type='number'
            defaultValue={value}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      case 'boolean':
        return <Switch value={value} defaultChecked />;
      default:
        break;
    }
  };

  const updateConfiguration = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...config, module_name: props.moduleName }),
    };
    const response = await fetch(
      '//127.0.0.1:5000/edit_module',
      requestOptions
    );
  };
  return (
    <div className='configuration'>
      <div className='configurationTitle'>
        Config
        <div className='moduleName'>
          {props.moduleName.toUpperCase().replace('_', ' ')}{' '}
        </div>
        module
      </div>
      {Object.entries(config).map(([key, value]) => (
        <div className='inputItem'>
          <div className='configurationKey'>{key}:</div>
          <div>{getInputTypeByValue(value, key)}</div>
        </div>
      ))}
      <Button
        variant='contained'
        onClick={updateConfiguration}
        endIcon={<SaveIcon />}
        className='saveButton'
      >
        Save
      </Button>
    </div>
  );
};
export default Configuration;
