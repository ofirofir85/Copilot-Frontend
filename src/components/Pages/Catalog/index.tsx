import React, { useEffect, useState } from 'react';
import DialogModule from './DialogModule';
import '../../../css/catlog.css';

const Catalog = () => {
  const [catlog, setCatalog] = useState([]);
  useEffect(() => {
    fetch('//127.0.0.1:5000/get_catalog')
      .then((response) => response.json())
      .then((result) => setCatalog(result.data));
  }, []);
  return (
    <div>
      <div className='catlogTitle'>Popular Modules</div>
      <div className='catlog'>
        {catlog.map((module) => (
          <DialogModule module={module} />
        ))}
      </div>
      <div className='suggested'></div>
    </div>
  );
};
export default Catalog;
