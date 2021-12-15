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

let changing_direction = false;
let horizontalVelocity = 10;
let verticalVelocity = 0;

// Function to get all the snake parts positions
function drawSnakeParts(snakePos) {
    boardContext.fillStyle = '#8bc34a';
    boardContext.strokestyle = 'darkblue';
    boardContext.fillRect(snakePos.x, snakePos.y, 10, 10); //Draws a filled rectangle.
    boardContext.strokeRect(snakePos.x, snakePos.y, 10, 10); //Draws a rectangular outline. 
}

//Function to draw the snake 
function drawSnake() {
    snake.forEach(drawSnakeParts);
}

function move_snake() {
    const head = { x: snake[0].x + horizontalVelocity, y: snake[0].y + verticalVelocity };
    snake.unshift(head);
    snake.pop();
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

function change_direction(event) {
    const left = 65;
    const right = 68;
    const up = 87;
    const down = 83;

    /* if (changing_direction) return; */
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = verticalVelocity === -10;
    const goingDown = verticalVelocity === 10;
    const goingRight = horizontalVelocity === 10;
    const goingLeft = horizontalVelocity === -10;

    if (keyPressed === left && !goingRight) {
        horizontalVelocity = -10;
        verticalVelocity = 0;
    }

    if (keyPressed === up && !goingDown) {
        horizontalVelocity = 0;
        verticalVelocity = -10;
    }

    if (keyPressed === right && !goingLeft) {
        horizontalVelocity = 10;
        verticalVelocity = 0;
    }

    if (keyPressed === down && !goingUp) {
        horizontalVelocity = 0;
        verticalVelocity = 10;
    }
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > board.width - 10;
    const hitToptWall = snake[0].y & lt; 0;
    const hitBottomWall = snake[0].y > board.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function main() {

    /* if (has_game_ended()) return; */
    changing_direction = false;
    setTimeout(function onTick() {
        clearCanvas();
        move_snake();
        drawSnake();
        main();
    }, 100);
}

main();
document.addEventListener("keydown", change_direction);