let snakeBody = [{ posX: 11, posY: 11 }];
let snakeLength = 1;
let score = 0;
let scoreTitile = document.getElementById("myScore");
let gameTitle = document.getElementById("Title");
let gameover = false;
let direction = { x: 1, y: 0 }; 
let applePos = { x: 0, y: 0 };

window.onload = function () {
    start();
    myApple();
    document.addEventListener("keydown", movment);
    setInterval(() => {
        if (!gameover) {
            move(direction.x, direction.y); 
        }
    }, 110);
};

function myApple() {
    let x, y;
    do {
        x = Math.floor(Math.random() * 22);
        y = Math.floor(Math.random() * 22);
    } while (snakeBody.some(s => s.posX === x && s.posY === y));

    applePos = { x, y };

    document.getElementById(`${y}.${x}`).classList.add("apple");
}

function start() {
    for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 22; j++) {
            let block = document.createElement("div");
            block.id = `${i}.${j}`.toString();
            document.getElementById("screen").appendChild(block);
        }
    }
    snake = document.getElementById("11.11");
    snake.classList.add("head");
}

function movment(e) {
    let op = e.key;
    if (op == "ArrowUp" && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (op == "ArrowDown" && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (op == "ArrowLeft" && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (op == "ArrowRight" && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
}

function move(x, y) {
    let newX = snakeBody[0].posX + x;
    let newY = snakeBody[0].posY + y;

    if (newX >= 0 && newX < 22 && newY >= 0 && newY < 22 && !snakeBody.some(s => s.posX === newX && s.posY === newY)) {
        snakeBody.unshift({ posX: newX, posY: newY }); 

        if (newX === applePos.x && newY === applePos.y) {
            score += 1;
            scoreTitile.innerHTML = `score: ${score}`;
            document.getElementById(`${applePos.y}.${applePos.x}`).classList.remove("apple");
            myApple(); 
            snakeLength++; 
        } else {
            let tail = snakeBody.pop(); 
            document.getElementById(`${tail.posY}.${tail.posX}`).classList.remove("head");
        }
        snakeBody.forEach(s => {
            document.getElementById(`${s.posY}.${s.posX}`).classList.add("head");
        });
    } else {
        gameover = true;
        gameTitle.innerText += " GAMEOVER";
    }
}
