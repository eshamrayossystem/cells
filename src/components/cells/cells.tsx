import React, { useEffect, useState, useRef } from 'react';
import './cells.css';
import { evaluateNextLifeState, getRandomLifeState, IFieldSize, TLifeState } from 'services/cellsLifeManager';

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

const Cells: React.FC<{ fieldSize: IFieldSize; tick: number }> = ({ fieldSize, tick }) => {
  const intervalTimerRef = useRef<number>();
  const [lifeState, setLifeState] = useState(() => getRandomLifeState(fieldSize));
  useEffect(() => {
    const intervalId: number = window.setInterval(() => {
      setLifeState((lifeState) => evaluateNextLifeState(lifeState, fieldSize));
    }, tick);
    intervalTimerRef.current = intervalId;
    return () => window.clearInterval(intervalTimerRef.current);
  }, [tick, fieldSize]);

  return <Field fieldSize={fieldSize} lifeState={lifeState} />;
};

export default Cells;
