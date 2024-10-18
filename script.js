const GRID_CONTAINER_SIZE = 640;

const gridContainer = document.querySelector('.grid-container');

gridContainer.style.width = GRID_CONTAINER_SIZE + 'px';
gridContainer.style.height = GRID_CONTAINER_SIZE + 'px';

function createGrid(cellAmount = 16) {
    const gridCellSize = GRID_CONTAINER_SIZE / cellAmount;

    for (let i = 0; i < cellAmount ** 2; i++) {
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCellSize + 'px';
        gridCell.style.height = gridCellSize + 'px';
        gridCell.classList.add('border');

        gridContainer.appendChild(gridCell);
    }

    gridContainer.addEventListener('mouseover', (event) => {
        if (event.target === gridContainer) {
            return;
        }

        event.target.style.backgroundColor = 'black';
    });
}

createGrid();
