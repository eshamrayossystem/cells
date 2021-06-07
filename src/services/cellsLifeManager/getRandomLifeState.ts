import { IFieldSize, TLifeState } from './interfaces';

const getRandomBytes = (): string => {
  const random = Math.random();
  const power = `${random}`.slice(2).length;
  return Math.round(random * 10 ** power).toString(2);
};

const getRandomLifeState = (fieldSize: IFieldSize): TLifeState => {
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

export default getRandomLifeState;
