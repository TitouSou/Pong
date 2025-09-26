const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let monStockage = localStorage;
localStorage.setItem("meilleurScore", 0);
document.getElementById("meilleurScore").innerHTML = monStockage.getItem("meilleurScore");

let startTime = Date.now();
let score = (Date.now() - startTime) / 1000;
let gameRunning = false;
let rafId;


let ball = {
    x : canvas.width / 2,
    y : canvas.height - canvas.height / 10,
    xSpeed : Math.random() * 2 - 1,
    ySpeed : -1.5,
    radius : 10,
    speedCoef : 1,
    initialSpeedX : 1.5,
    initialSpeedY : 1.5
}

let barre = {
    lenght : 70,
    x : canvas.width / 2 - 35,
    y : canvas.height - 20,
    speed : 3,
    movingLeft : false,
    movingRight : false
}

function startGame() {
    if (rafId) cancelAnimationFrame(rafId);
    gameRunning = true;
    startTime = Date.now();
    score = 0;

    ball.x = canvas.width / 2;
    ball.y = canvas.height - canvas.height / 10;
    ball.xSpeed = Math.random() * 2 - 1;
    ball.ySpeed = -ball.initialSpeedY;
    ball.speedCoef = 1;

    update();
    loop();
    
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    score = Math.floor(( Date.now() - startTime ) / 1000);
    console.log(ball.xSpeed);
    document.getElementById("score").innerHTML = score;
    
    ball.x += ball.xSpeed * ball.speedCoef;
    ball.y += ball.ySpeed * ball.speedCoef;
    if (ball.x > canvas.width - ball.radius) {
        ball.xSpeed = -ball.xSpeed;
        if (ball.speedCoef < 5) ball.speedCoef += 0.03;
    }
    if (ball.x < ball.radius) {
        ball.xSpeed = -ball.xSpeed;
        if (ball.speedCoef < 5) ball.speedCoef += 0.03;
    }
    if (ball.y < ball.radius) {
        ball.ySpeed = -ball.ySpeed;
        if (Math.abs(ball.xSpeed) != ball.initialSpeedX && ball.xSpeed >= 0) ball.xSpeed = ball.initialSpeedX;
        else if (Math.abs(ball.xSpeed) != ball.initialSpeedX && ball.xSpeed < 0) ball.xSpeed = -ball.initialSpeedX;
        if (ball.ySpeed != ball.initialSpeedY) ball.ySpeed = ball.initialSpeedY;
        if (ball.speedCoef < 5) ball.speedCoef += 0.03;
    }
    if (ball.y + ball.radius > barre.y && ball.y + ball.radius < barre.y + 5 && ball.x + ball.radius > barre.x && ball.x - ball.radius < barre.x + barre.lenght) {
        ball.ySpeed = -ball.ySpeed;
        if (ball.speedCoef < 5) ball.speedCoef += 0.03;
    }
    if (ball.y > canvas.height - ball.radius) {
        loseScreen();
        gameRunning = false;
        if (score > monStockage.getItem("meilleurScore")) {
            monStockage.setItem("meilleurScore", score);
        }
        document.getElementById("meilleurScore").innerHTML = monStockage.getItem("meilleurScore");
    }

    if (barre.movingLeft && barre.x > 0) barre.x -= barre.speed;
    if (barre.movingRight && barre.x + barre.lenght < canvas.width) barre.x += barre.speed; 
    range.disabled = gameRunning
}

function loop() {
    if (gameRunning) update();
    drawBall();
    drawBarre();
    rafId = requestAnimationFrame(loop);
}

function drawBall() {
    ctx.fillStyle = "blue";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); 
    ctx.fill();
    ctx.closePath();
}

function drawBarre() {
    ctx.fillStyle = "red";
    // dessin de la barre
    ctx.beginPath();
    ctx.fillRect(barre.x, barre.y, barre.lenght, 5);
    ctx.fill();
    ctx.closePath();
}

function loseScreen() {
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.font = "40px arial";
    ctx.fillText("YOU LOSE", canvas.width / 2, canvas.height / 2);
}

var reset=document.getElementById("reset");
reset.addEventListener("click", function() {
    startGame();
});


var left = document.getElementById("left");
var right = document.getElementById("right");

// Déplacement continu avec souris ou tactile
left.addEventListener("mousedown", function() {
    barre.movingLeft = true;
});
left.addEventListener("mouseup", function() {
    barre.movingLeft = false;
});
left.addEventListener("mouseleave", function() {
    barre.movingLeft = false;
});
left.addEventListener("touchstart", function(e) {
    e.preventDefault();
    barre.movingLeft = true;
});
left.addEventListener("touchend", function() {
    barre.movingLeft = false;
});

right.addEventListener("mousedown", function() {
    barre.movingRight = true;
});
right.addEventListener("mouseup", function() {
    barre.movingRight = false;
});
right.addEventListener("mouseleave", function() {
    barre.movingRight = false;
});
right.addEventListener("touchstart", function(e) {
    e.preventDefault();
    barre.movingRight = true;
});
right.addEventListener("touchend", function() {
    barre.movingRight = false;
});

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            barre.movingLeft = true; 
            break;

        case "ArrowRight":
            barre.movingRight = true;
            break;
        case "Space":
            startGame();
        default:
            break;
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            barre.movingLeft = false; 
            break;

        case "ArrowRight":
            barre.movingRight = false;
            break;

        default:
            break;
    }
});

// gestion de la difficulté

const range = document.getElementById("difficulty-range");

const levels = ["Facile", "Normale", "Difficile"];

range.addEventListener("input", () => {
    if (levels[range.value] == "Facile") {
        ball.initialSpeedX = 1;
        ball.initialSpeedY = 1;
    }
    if (levels[range.value] == "Normale") {
        ball.initialSpeedX = 1.5;
        ball.initialSpeedY = 1.5;
    }
    if (levels[range.value] == "Difficile") {
        ball.initialSpeedX = 2;
        ball.initialSpeedY = 2;
    }
});

drawBall();
drawBarre();