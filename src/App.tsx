import React, { useState } from 'react';
import SearchAppBar from './components/SearchAppBar';
import './App.css';
import MenuTabs from './components/MenuTabs';

const App = () => {
  const [appName] = useState('Co-Pilot');

  return (
    <div className='Co-Pliote'>
      <SearchAppBar appName={appName} />
      <MenuTabs />
    </div>
  );
};

export default App;
