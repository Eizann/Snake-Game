const board = document.getElementById('gameCanvas')
const boardContext = gameCanvas.getContext("2d");

let snake = [
    { x: 350, y: 350 },
    { x: 340, y: 350 },
    { x: 330, y: 350 },
    { x: 320, y: 350 },
    { x: 310, y: 350 },
    { x: 300, y: 350 }
]

// Function to get all the snake parts positions
function drawSnakeParts(snakePos) {
    boardContext.fillStyle = '#8bc34a';
    boardContext.strokestyle = 'darkblue';
    boardContext.fillRect(snakePos.x, snakePos.y, 10, 10); //Draws a filled rectangle.
    boardContext.strokeRect(snakePos.x, snakePos.y, 10, 10); //Draws a rectangular outline. 
}

function drawSnake() {
    snake.forEach(drawSnakeParts);
}

// Function called to clear the board every time
function clearCanvas() {
    boardContext.fillStyle = 'white';
    boardContext.strokestyle = 'black';
    // Draw a "filled" rectangle to cover the entire canvas
    boardContext.fillRect(0, 0, board.width, board.height);
    // Draw a "border" around the entire canvas
    boardContext.strokeRect(0, 0, board.width, board.height);
}

clearCanvas()
drawSnake();






