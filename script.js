const GRID_CONTAINER_SIZE = 640;
const USE_RANDOM_COLORS = true;
const USE_DARKENING = true;

const gridContainer = document.querySelector('.grid-container');
const buttonGridSize = document.querySelector('.button-grid-size');

gridContainer.style.width = GRID_CONTAINER_SIZE + 'px';
gridContainer.style.height = GRID_CONTAINER_SIZE + 'px';

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
        if (USE_RANDOM_COLORS) {
            gridCell.style.backgroundColor = getRandomColor();
        } else {
            gridCell.style.backgroundColor = 'black';
        }
    }

    if (!isOpaque) {
        if (USE_DARKENING) {
            gridCell.style.opacity = parseFloat(gridCell.style.opacity) + 0.1;
        } else {
            gridCell.style.opacity = 1;
        }
    }
}

function createGrid(cellAmount = 16) {
    const gridCellSize = GRID_CONTAINER_SIZE / cellAmount;

    while(gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    for (let i = 0; i < cellAmount ** 2; i++) {
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCellSize + 'px';
        gridCell.style.height = gridCellSize + 'px';
        gridCell.style.opacity = 0;

        gridContainer.appendChild(gridCell);
    }

    gridContainer.addEventListener('mouseover', (event) => {
        if (event.target === gridContainer) {
            return;
        }

        paintGridCell(event.target);
    });
}

buttonGridSize.addEventListener('click', () => {
    let cellAmount;

    do {
        cellAmount = parseInt(prompt('Enter grid size in cells', 16));        
    } while (!cellAmount || cellAmount < 1 || cellAmount > 100);

    createGrid(cellAmount);
})

createGrid();
