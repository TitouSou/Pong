const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let startTime = Date.now();
let score = (Date.now() - startTime) / 1000;
let gameRunning = false;
let rafId;


let ball = {
    x : 50,
    y : 50,
    xSpeed : 1,
    ySpeed : -1,
    radius : 10,
    speedCoef : 1
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

    ball.x = Math.random() * (canvas.width - 2 * ball.radius) + ball.radius;
    ball.y = Math.random() * (canvas.height - 2 * ball.radius - canvas.height / 10) + ball.radius;
    ball.xSpeed = 1;
    ball.ySpeed = -1;
    ball.speedCoef = 1;

    update();
    loop();
    
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    score = Math.floor(( Date.now() - startTime ) / 1000);
    console.log(score);
    document.getElementById("score").innerHTML = score;

    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    if (ball.x > canvas.width - ball.radius) {
        ball.xSpeed = -ball.xSpeed * ball.speedCoef;
        if (ball.speedCoef < 5) ball.speedCoef += 0.02;
    }
    if (ball.x < ball.radius) {
        ball.xSpeed = -ball.xSpeed * ball.speedCoef;
        if (ball.speedCoef < 5) ball.speedCoef += 0.02;
    }
    if (ball.y < ball.radius) {
        ball.ySpeed = -ball.ySpeed * ball.speedCoef;
        if (ball.speedCoef < 5) ball.speedCoef += 0.02;
    }
    if (ball.y + ball.radius > barre.y && ball.y + ball.radius < barre.y + 5 && ball.x > barre.x && ball.x < barre.x + barre.lenght) {
        ball.ySpeed = -ball.ySpeed * ball.speedCoef;
        if (ball.speedCoef < 5) ball.speedCoef += 0.02;
    }
    if (ball.y > canvas.height - ball.radius) {
        loseScreen();
        gameRunning = false;
    }

    if (barre.movingLeft && barre.x > 0) barre.x -= barre.speed;
    if (barre.movingRight && barre.x + barre.lenght < canvas.width) barre.x += barre.speed; 
    
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

var left=document.getElementById("left");
left.addEventListener("click", function() {
    barre.x -= barre.speed;
});

var right=document.getElementById("right");
right.addEventListener("click", function() {
    barre.x += barre.speed;
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