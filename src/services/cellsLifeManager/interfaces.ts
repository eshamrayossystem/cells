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
