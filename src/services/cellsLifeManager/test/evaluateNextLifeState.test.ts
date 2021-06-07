import { evaluateNextLifeState } from '../cellsLifeManager';

const squareShapeFieldSize = { width: 6, height: 8 };
// prettier-ignore
const squareShapeLifeState = [
  false, false, false, false, false, false,
  false, false, false, false, false, false,
  false, false, false, false, false, false,
  false, false, true, true, false, false,
  false, false, true, true, false, false,
  false, false, false, false, false, false,
  false, false, false, false, false, false,
  false, false, false, false, false, false
]

test('test evaluateNextLifeState with square shape init life state form', () => {
  const nextLifeState = evaluateNextLifeState(squareShapeLifeState, squareShapeFieldSize);
  expect(nextLifeState).toEqual(squareShapeLifeState);
});

const shiftShapeFieldSize = { width: 6, height: 6 };
// prettier-ignore
const shiftShapeLifeState = [
  false, false, false, false, false, false,
  false, false, false, false, false, false,
  false, false, true, true, true, false,
  false, true, true, true, false, false,
  false, false, false, false, false, false,
  false, false, false, false, false, false,
];
// prettier-ignore
const nextShiftShapeLifeState = [
  false, false, false, false, false, false,
  false, false, false, true, false, false,
  false, true, false, false, true, false,
  false, true, false, false, true, false,
  false, false, true, false, false, false,
  false, false, false, false, false, false
];

test('test evaluateNextLifeState with shift shape init life state form', () => {
  const nextLifeState = evaluateNextLifeState(shiftShapeLifeState, shiftShapeFieldSize);
  expect(nextLifeState).toEqual(nextShiftShapeLifeState);
});

const lineShapeFieldSize = { width: 7, height: 7 };
// prettier-ignore
const lineShapeLifeState = [
  false, false, false, false, false, false, false,
  false, false, false, false, false, false, false,
  false, false, false, false, false, false, false,
  false, false, true, true, true, false, false,
  false, false, false, false, false, false, false,
  false, false, false, false, false, false, false,
  false, false, false, false, false, false, false,
];
// prettier-ignore
const nextLineShapeLifeState = [
  false, false, false, false, false, false, false,
  false, false, false, false, false, false, false,
  false, false, false, true, false, false, false,
  false, false, false, true, false, false, false,
  false, false, false, true, false, false, false,
  false, false, false, false, false, false, false,
  false, false, false, false, false, false, false,
];

test('test evaluateNextLifeState with line shape init life state form', () => {
  const nextLifeState = evaluateNextLifeState(lineShapeLifeState, lineShapeFieldSize);
  expect(nextLifeState).toEqual(nextLineShapeLifeState);
});

const deadFieldSize = { width: 4, height: 3 };
// prettier-ignore
const deadFieldLifeState = [
  false, false, false, false,
  false, false, false, false,
  false, false, false, false
];
// prettier-ignore
const nextDeadFieldLifeState = [
  false, false, false, false,
  false, false, false, false,
  false, false, false, false
];

test('test evaluateNextLifeState with dead init life state', () => {
  const nextLifeState = evaluateNextLifeState(deadFieldLifeState, deadFieldSize);
  expect(nextLifeState).toEqual(nextDeadFieldLifeState);
});

const crowdedFieldSize = { width: 4, height: 3 };
// prettier-ignore
const crowdedFieldLifeState = [
  true, true, true, true,
  true, true, true, true,
  true, true, true, true
];
// prettier-ignore
const crowdedDeadFieldLifeState = [
  false, false, false, false,
  false, false, false, false,
  false, false, false, false
];

test('test evaluateNextLifeState with crowded init life state', () => {
  const nextLifeState = evaluateNextLifeState(crowdedFieldLifeState, crowdedFieldSize);
  expect(nextLifeState).toEqual(crowdedDeadFieldLifeState);
});
