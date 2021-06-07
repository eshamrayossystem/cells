import React from 'react';
import { render } from '@testing-library/react';
import Cells from './cells';

test('renders cells empty field', () => {
  const fieldSize = { width: 0, height: 0 };
  const { container } = render(<Cells fieldSize={fieldSize} tick={100000} />);

  const fieldContainer = container.firstElementChild;
  expect(fieldContainer).toBeInTheDocument();

  const cells = (fieldContainer as HTMLElement).getElementsByTagName('div');
  expect(cells.length).toBe(0);
});

test('renders cells field 30x20 size', () => {
  const fieldWidth = 30;
  const fieldHeight = 20;
  const fieldSize = { width: fieldWidth, height: fieldHeight };

  const { container } = render(<Cells fieldSize={fieldSize} tick={100000} />);

  const fieldContainer = container.firstElementChild;
  expect(fieldContainer).toBeInTheDocument();

  const cells = (fieldContainer as HTMLElement).getElementsByTagName('div');
  expect(cells.length).toBe(fieldWidth * fieldHeight);
});
