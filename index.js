const boxA = document.getElementById('box-a');
const boxB = document.getElementById('box-b');
const boxC = document.getElementById('box-c');
const message = document.getElementById('message');
const shapes = document.querySelectorAll('.shape');
const gridCells = document.querySelectorAll('#box-b .grid-cell');

let draggedShape = null;
let attempts = 0;
const maxAttempts = 3;
const correctCell = 4; 

shapes.forEach(shape => {
    shape.addEventListener('dragstart', (e) => {
        draggedShape = e.target;
    });
});

gridCells.forEach(cell => {
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
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            showMessage('LEVEL FAILED');
        }
        setTimeout(() => {
            cell.removeChild(shape);
        }, 2000);
    }
}

function showMessage(text) {
    message.textContent = text;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}