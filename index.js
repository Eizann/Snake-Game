const board = document.getElementById('gameCanvas')
const boardContext = gameCanvas.getContext("2d");

let snake = [{ x: 350, y: 350 }, { x: 340, y: 350 }, { x: 330, y: 350 }, { x: 320, y: 350 }, { x: 310, y: 350 }, { x: 300, y: 350 },]

function drawSnakeParts(snakePos) {
    boardContext.fillStyle = 'lightblue';
    boardContext.strokestyle = 'darkblue';
    boardContext.fillRect(snakePos.x, snakePos.y, 10, 10); //Draws a filled rectangle.
    boardContext.strokeRect(snakePos.x, snakePos.y, 10, 10); //Draws a rectangular outline. 
}

function drawSnake() {
    snake.forEach(part => {
        drawSnakeParts(part);
    });
}

snake.forEach(part => {
    console.log(part.x);
})
drawSnakeParts();
drawSnake();


