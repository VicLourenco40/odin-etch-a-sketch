const GRID_CONTAINER_SIZE = 640;

const gridContainer = document.querySelector('.grid-container');
const buttonGridSize = document.querySelector('.button-grid-size');

gridContainer.style.width = GRID_CONTAINER_SIZE + 'px';
gridContainer.style.height = GRID_CONTAINER_SIZE + 'px';

function createGrid(cellAmount = 16) {
    const gridCellSize = GRID_CONTAINER_SIZE / cellAmount;

    while(gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    for (let i = 0; i < cellAmount ** 2; i++) {
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCellSize + 'px';
        gridCell.style.height = gridCellSize + 'px';

        gridContainer.appendChild(gridCell);
    }

    gridContainer.addEventListener('mouseover', (event) => {
        if (event.target === gridContainer) {
            return;
        }

        event.target.style.backgroundColor = 'black';
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
