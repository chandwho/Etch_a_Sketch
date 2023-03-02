const container = document.querySelector('.container');
// let square = document.querySelectorAll('.square'); [#not working#]
const square = document.getElementsByClassName('square');
/* buttons */
const resize_button = document.querySelector('#resize');
const random_color = document.querySelector('#random_color');
const eraser = document.querySelector('#eraser');
const black = document.querySelector('#black');
const clear_grid = document.querySelector('#clear_grid');

black.focus();

let n = 16;

function createGrid() {
  for (i = 0; i < (n * n); i++) {
    const grid = document.createElement('div');
    grid.setAttribute('class', 'square');
    container.append(grid);
  }
  /* Used template literals to input variabe in repeat function. (repeat(n, 1fr) was not working) */

  container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  container.style.gridAutoRows = `repeat(${n}, 1fr)`;

  const color = 'black';
  colorGrid(color);
}

function colorGrid(color) {
  Array.from(square).forEach((elem) => {
    elem.addEventListener('mouseover', (e) => {
      e.target.style.backgroundColor = color;
    });
  });
}

/* Selects black color */

black.addEventListener('click', () => {
  const color = 'black';
  colorGrid(color);
});

/* Resize grid */

resize_button.addEventListener('click', () => {
  n = prompt('How many pixels you want', '16');

  if (n >= 1 && n <= 100) {
    Array.from(square).forEach((item) => {
      item.remove();
    });

    createGrid(n);
  } else {
    alert('Enter value between 1 and 100');
  }

  /* Displays size of grid */
  if (n !== null && n !== '') {
    resize_button.innerText = `Pixel Size (${n}X${n})`;
  }
});

/* Random color generator */

function generateRandom() {
  return (Math.floor(Math.random() * 256));
}

random_color.addEventListener('click', () => {
  for (let i = 0; i < square.length; i++) {
    console.log(i);
    square[i].addEventListener('mouseover', (e) => {
      r = generateRandom();
      g = generateRandom();
      b = generateRandom();

      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    });
  }
});

/* Eraser */

eraser.addEventListener('click', () => {
  const color = 'white';
  colorGrid(color);
});

/* Clean complete grid */

clear_grid.addEventListener('click', () => {
  answer = confirm('Are you sure?');

  if (answer) {
    Array.from(square).forEach((elem) => {
      elem.style.backgroundColor = 'white';
    });
  }
});

window.onload = createGrid;
