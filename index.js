const boxA = document.getElementById('box-a');
const boxB = document.getElementById('box-b');
const boxC = document.getElementById('box-c');
const message = document.getElementById('message');
const shapes = document.querySelectorAll('.shape');
const gridCellsA = document.querySelectorAll('#box-a .grid-cell');
const gridCellsB = document.querySelectorAll('#box-b .grid-cell');

let draggedShape = null;
let attempts = 0;
const maxAttempts = 3;
let correctCell;

function initializeGame() {
    gridCellsA.forEach(cell => cell.innerHTML = '');
    gridCellsB.forEach(cell => cell.innerHTML = '');
    attempts = 0;

    
    correctCell = Math.floor(Math.random() * 9);
    const referenceShape = document.createElement('div');
    referenceShape.className = 'reference-shape';
    gridCellsA[correctCell].appendChild(referenceShape);
}

shapes.forEach(shape => {
    shape.addEventListener('dragstart', (e) => {
        draggedShape = e.target;
    });
});

gridCellsB.forEach(cell => {
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    cell.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedShape) {
            const cellIndex = parseInt(cell.dataset.cell);
            const newShape = draggedShape.cloneNode(true);
            cell.appendChild(newShape);
            checkPlacement(cellIndex, cell, newShape);
        }
    });
});

function checkPlacement(cellIndex, cell, shape) {
    if (cellIndex === correctCell) {
        showMessage('LEVEL PASSED');
        setTimeout(() => {
            initializeGame();
        }, 2000);
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            showMessage('LEVEL FAILED');
            setTimeout(() => {
                initializeGame();
            }, 2000);
        } else {
            setTimeout(() => {
                cell.removeChild(shape);
            }, 2000);
        }
    }
}

function showMessage(text) {
    message.textContent = text;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

initializeGame();