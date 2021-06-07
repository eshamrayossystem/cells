export interface IFieldSize {
  width: number;
  height: number;
}

export type TLifeState = boolean[];

export type ICellNeighbors = {
  north: number;
  northeast: number;
  east: number;
  southeast: number;
  south: number;
  southwest: number;
  west: number;
  northwest: number;
};

const getRandomBytes = (): string => {
  const random = Math.random();
  const power = `${random}`.slice(2).length;
  return Math.round(random * 10 ** power).toString(2);
};

export const getRandomLifeState = (fieldSize: IFieldSize): TLifeState => {
  const lifeState = [];
  const { width, height } = fieldSize;
  const length = width * height;

  let bytes = getRandomBytes();
  let bytesIndex = 0;
  for (let i = 0; i < length; i++) {
    bytesIndex++;
    lifeState.push(bytes[bytesIndex] === '1');
    if (bytes.length <= bytesIndex) {
      bytes = getRandomBytes();
      bytesIndex = 0;
    }
  }
  return lifeState;
};

export const getCellFieldRowIndex = (cellIndex: number, fieldSize: IFieldSize): number => {
  const { width: fieldWidth, height: fieldHeight } = fieldSize;
  const rowIndex = Math.floor(cellIndex / fieldWidth);
  if (Number.isNaN(rowIndex) || cellIndex < 0) {
    return -1;
  }
  return rowIndex >= fieldHeight ? -1 : rowIndex;
};

const getCellNeighbors = (cellIndex: number, fieldSize: IFieldSize): ICellNeighbors => {
  const { width: fieldWidth } = fieldSize;

  const targetCellRowIndex = getCellFieldRowIndex(cellIndex, fieldSize);

  const processNeighborCellIndex = (neighborCellIndex: number): number => {
    if (neighborCellIndex < 0) {
      return -1;
    }
    const neighborCellRowIndex = getCellFieldRowIndex(neighborCellIndex, fieldSize);
    if (
      neighborCellRowIndex === -1 ||
      neighborCellRowIndex - targetCellRowIndex > 1 ||
      targetCellRowIndex - neighborCellRowIndex > 1
    ) {
      return -1;
    }
    return neighborCellIndex;
  };

  const north = cellIndex - fieldWidth;
  const northeast = north + 1;
  const northwest = north - 1;
  const east = cellIndex + 1;
  const south = cellIndex + fieldWidth;
  const southeast = south + 1;
  const southwest = south - 1;
  const west = cellIndex - 1;

  const neighbors = {
    north: processNeighborCellIndex(north),
    northeast: processNeighborCellIndex(northeast),
    northwest: processNeighborCellIndex(northwest),
    east: processNeighborCellIndex(east),
    south: processNeighborCellIndex(south),
    southeast: processNeighborCellIndex(southeast),
    southwest: processNeighborCellIndex(southwest),
    west: processNeighborCellIndex(west),
  };

  return neighbors;
};

export const evaluateNextLifeState = (currentLifeState: TLifeState, fieldSize: IFieldSize): TLifeState => {
  const nextLifeState = currentLifeState.map((currentState, cellIndex) => {
    const cellNeighbors = getCellNeighbors(cellIndex, fieldSize);
    const cellNeighborsIndexes = Object.values(cellNeighbors).filter((index) => index !== -1);
    const cellNeighborsState = cellNeighborsIndexes.map((i) => currentLifeState[i]);
    const aliveCellNeighbors = cellNeighborsState.filter((i) => !!i);

    let result;
    if (currentState) {
      if (aliveCellNeighbors.length < 2) {
        // underpopulation
        result = false;
      } else if (aliveCellNeighbors.length > 3) {
        // overcrowding
        result = false;
      } else {
        // live on
        result = true;
      }
    } else {
      // reproduction
      result = aliveCellNeighbors.length === 3;
    }

    return result;
  });
  return nextLifeState;
};
