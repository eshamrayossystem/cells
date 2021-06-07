import getRandomLifeState from '../getRandomLifeState';

test('test getRandomLifeState with 0x0 field sizes', () => {
  const randomLifeState = getRandomLifeState({ width: 0, height: 0 });
  expect(randomLifeState.length).toBe(0);
});

test('test getRandomLifeState with random field sizes', () => {
  const fieldWidth = Math.round(Math.random() * 100);
  const fieldHeight = Math.round(Math.random() * 100);
  const fieldSize = { width: fieldWidth, height: fieldHeight };
  const randomLifeState = getRandomLifeState(fieldSize);
  expect(randomLifeState.length).toBe(fieldWidth * fieldHeight);
});

test('test getRandomLifeState with wrong field sizes', () => {
  const randomLifeState1 = getRandomLifeState({ width: -1, height: 5 });
  expect(randomLifeState1.length).toBe(0);
  const randomLifeState2 = getRandomLifeState({ width: 10, height: -5 });
  expect(randomLifeState2.length).toBe(0);
});
