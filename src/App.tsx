import React from 'react';
import './App.css';
import Cells from 'components/cells';
import { FIELD_SIZE, TICK } from 'constants/index';

const App = () => {
  return (
    <div className='App'>
      <h1>React Test</h1>
      <Cells fieldSize={FIELD_SIZE} tick={TICK} />
    </div>
  );
};

export default App;
