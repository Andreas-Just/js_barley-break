'use strict';

const canvas = document.querySelector('#c');
const wrapper = document.querySelector('.wrapper');
const startBtn = wrapper.querySelector('.header__btn');
const field = wrapper.querySelector('.field');
const won = wrapper.querySelector('.won');
const cellSize = 80;

startBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  e.target.click();
});

startBtn.addEventListener('click', () => {
  canvas.style.display = 'none';
  field.innerHTML = '';
  startBtn.textContent = 'Restart';
  won.textContent = 'To restart the game, click "Restart"';
  won.style.textTransform = 'none';

  const cells = [];
  const empty = {
    value: 16,
    left: 3,
    top: 3,
  };

  game(cells, empty);
});

function game(cells, empty) {
  const numbers = [...Array(15).keys()]
    .sort(() => Math.random() - 0.5);
  const cellsDOM = [];

  for (let i = 0; i < 15; i++) {
    const cell = document.createElement('div');
    const cellNum = document.createElement('span');
    const value = numbers[i] + 1;

    cell.className = 'cell';
    cellNum.className = 'cell__num';
    cell.appendChild(cellNum);
    cellNum.innerHTML = `${value}`;
    cellsDOM.push(cell);

    const left = i % 4;
    const tip = (i - left) / 4;

    cells.push({
      value: value,
      left: left,
      top: tip,
      element: cell,
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${tip * cellSize}px`;
    field.append(cell);

    cell.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.target.click();
    });

    cell.addEventListener('click', () => {
      move(i, cells, empty, cellsDOM);
    });
  }
  cells.push(empty);
}

function move(index, cells, empty, cellsDOM) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  field.style.background = 'none';
  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;

  empty.left = cell.left;
  empty.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  const isFinished = cells.every(el => {
    return el.value - 1 === el.top * 4 + el.left;
  });
  const salute = () => {
    canvas.style.display = 'block';
  };

  if (isFinished) {
    won.textContent = 'Congratulations, you won!';
    won.style.textTransform = 'uppercase';

    cellsDOM.forEach(el => {
      el.style.backgroundColor = '#bf8570';
      el.style.opacity = '0.7';
      el.style.pointerEvents = 'none';
      salute();
    });
  }
}
