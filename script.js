const DEFAULT_GRID_SIZE = 16;

const gridContainer = document.querySelector('.grid-container');
const buttonRandomColors = document.querySelector('.toggle-random-colors');
const buttonDarkening = document.querySelector('.toggle-darkening');
const buttonGridSize = document.querySelector('.change-grid-size');
const gridSizeDisplay = document.querySelector('.grid-size');

let currentGridSize;
let useRandomColors = false;
let useDarkening = false;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomColor() {
    return `rgb(${getRandomInt(256)},${getRandomInt(256)},${getRandomInt(256)})`;
}

function paintGridCell(gridCell) {
    const isColored = Boolean(gridCell.style.backgroundColor);
    const isOpaque = gridCell.style.opacity === 1;

    if (!isColored) {
        if (useRandomColors) {
            gridCell.style.backgroundColor = getRandomColor();
        } else {
            gridCell.style.backgroundColor = 'black';
        }
    }

    if (!isOpaque) {
        if (useDarkening) {
            gridCell.style.opacity = parseFloat(gridCell.style.opacity) + 0.1;
        } else {
            gridCell.style.opacity = 1;
        }
    }
}

function createGrid(gridSize = DEFAULT_GRID_SIZE) {
    const gridPixelSize = gridContainer.clientWidth;
    const gridCellPixelSize = gridPixelSize / gridSize;

    while(gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    for (let i = 0; i < gridSize ** 2; i++) {
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCellPixelSize + 'px';
        gridCell.style.height = gridCellPixelSize + 'px';
        gridCell.style.opacity = 0;

        gridContainer.appendChild(gridCell);
    }

    gridSizeDisplay.innerText = `Grid size: ${gridSize}x${gridSize}`;
}

gridContainer.addEventListener('mouseover', (event) => {
    if (event.target != gridContainer) {
        paintGridCell(event.target);
    }
});

buttonGridSize.addEventListener('click', () => {
    let gridSize;

    do {
        gridSize = parseInt(prompt('Enter grid size (max 100)', 16));        
    } while (!gridSize || gridSize < 1 || gridSize > 100);

    createGrid(gridSize);
})

buttonRandomColors.addEventListener('click', () => {
    useRandomColors = !useRandomColors;
    buttonRandomColors.classList.toggle('enabled');
});

buttonDarkening.addEventListener('click', () => {
    useDarkening = !useDarkening;
    buttonDarkening.classList.toggle('enabled');
});

createGrid();
