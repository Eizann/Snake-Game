const board = document.getElementById('gameCanvas');
const boardContext = gameCanvas.getContext("2d");
const newGameButton = document.getElementById('new-game');
const scoreBoard = document.getElementById('score');
const higherScore = document.querySelector('#highest-score span');
const bodySelector = document.querySelector('body');
const headingElement = document.createElement('h2');
const gameoverPrompt = headingElement.innerHTML = 'You lost the game. Press ENTER or click on new game to restart a game.';

headingElement.id = 'gameover-text';

let gameOverSound = new sound("gameover.mp3");
let eatAppleSound = new sound("eatapple.mp3");
let myMusic;
myMusic = new sound("snakemusic.mp3");
document.querySelector('audio').loop = true;

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
    { x: 150, y: 200 }
]

let changing_direction = false;
let horizontalVelocity = 10;
let verticalVelocity = 0;
let score = 0;
let food_x;
let food_y;

// Function to get all the snake parts positions
function drawSnakeParts(snakePos) {
    boardContext.fillStyle = '#8bc34a';
    boardContext.strokestyle = 'darkblue';
    boardContext.fillRect(snakePos.x, snakePos.y, 10, 10);
    boardContext.strokeRect(snakePos.x, snakePos.y, 10, 10);
}

// Function to draw the snake 
function drawSnake() {
    snake.forEach(drawSnakeParts);
}

function move_snake() {
    const head = { x: snake[0].x + horizontalVelocity, y: snake[0].y + verticalVelocity };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        eatAppleSound.play();
        score += 10;
        scoreBoard.innerHTML = `Score : ${score}`;
        gen_food();
    } else {
        snake.pop();
    }
}

// Function called to clear all previous positions of the snake on the board
function clearCanvas() {
    boardContext.fillStyle = 'white';
    boardContext.strokestyle = 'black';
    boardContext.fillRect(0, 0, board.width, board.height);
}

// Function to change the direction of the snake
function change_direction(event) {
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    if (changing_direction) return;
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

// Function to check is the game has ended or not
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            document.querySelector('audio').loop = false;
            gameOverSound.play();
            bodySelector.appendChild(headingElement);
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > board.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > board.height - 10;

    if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
        document.querySelector('audio').loop = false;
        gameOverSound.play();
        bodySelector.appendChild(headingElement);
        return true;
    }
}

// Functions to generate a random food on the map
function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    food_x = random_food(0, board.width - 10);
    food_y = random_food(0, board.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}


// Function to draw the food
function drawFood() {
    boardContext.fillStyle = 'red';
    boardContext.strokestyle = 'black';
    boardContext.fillRect(food_x, food_y, 10, 10);
    boardContext.strokeRect(food_x, food_y, 10, 10);
}

// Function we're calling at each state of the game
function main() {
    if (has_game_ended()) {
        if (score > higherScore.innerHTML) {
            higherScore.innerHTML = score;
        }
        return;
    }
    changing_direction = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, 100);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function newGame() {
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 },
        { x: 150, y: 200 }
    ]
    document.querySelector('audio').loop = true;
    myMusic.play();
    if(document.getElementById('gameover-text')) {
        document.getElementById('gameover-text').remove();
    }
    score = 0;
    scoreBoard.innerHTML = `Score : ${score}`;
    food_x;
    food_y;
    changing_direction = false;
    horizontalVelocity = 10;
    verticalVelocity = 0;
    
    main();
    gen_food();
}

function onloadText() {
    boardContext.fillStyle = "black";
    boardContext.font = "23px Arial";
    boardContext.fillText("Press ENTER or click on new game.", 20, 100);
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

clearCanvas();
window.onload = onloadText;
document.addEventListener("keydown", change_direction);
newGameButton.addEventListener("click", newGame);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        newGame();
    }
})