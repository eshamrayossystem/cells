import React, { useEffect, useState } from 'react';
import './cells.css';
import { evaluateNextLifeState, getRandomLifeState, IFieldSize, TLifeState } from 'services/cellsLifeManager';

const fieldSize: IFieldSize = { height: 50, width: 50 };
const TICK = 400;

const Field: React.FC<{ fieldSize: IFieldSize; lifeState: TLifeState }> = ({ fieldSize, lifeState }) => {
  const { width } = fieldSize;

  const cells = lifeState.map((cellState, index) => (
    <div key={index} className={'cell' + (cellState ? ' alive-cell' : '')} />
  ));

  return (
    <div className='field-container' style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}>
      {cells}
    </div>
  );
};

const Cells = () => {
  const [lifeState, setLifeState] = useState(() => getRandomLifeState(fieldSize));
  useEffect(() => {
    const interval = setInterval(() => {
      setLifeState((lifeState) => evaluateNextLifeState(lifeState, fieldSize));
    }, TICK);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='cells'>
      <Field fieldSize={fieldSize} lifeState={lifeState} />
    </div>
  );
};

export default Cells;
