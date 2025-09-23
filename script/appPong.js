const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let startTime = Date.now();
let score = (Date.now() - startTime) / 1000;
let speedCoef = 1;
let rafId;
let xSpeed = 2;
let ySpeed = 2;

let ball = {
    x : 50,
    y : 50,
    radius : 10
}

function startGame() {
    startTime = Date.now();
    score = 0;
    speedCoef = 1;
    update();
    
}

function update() {
    score = Math.floor(( Date.now() - startTime ) / 1000);
    console.log(score);
    document.getElementById("score").innerHTML = score;

    ball.x += xSpeed;
    ball.y += ySpeed;
    if (ball.x > canvas.width - ball.radius) xSpeed = -xSpeed;
    if (ball.x < ball.radius) xSpeed = -xSpeed;
    if (ball.y > canvas.height - ball.radius) ySpeed = -ySpeed;
    if (ball.y < ball.radius) ySpeed = -ySpeed;
    
    
}

function loop() {
    update();
    drawBall();
    rafId = requestAnimationFrame(loop);
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    ctx.fillStyle = "blue";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); 
    ctx.fill();
    ctx.closePath();
}

var reset=document.getElementById("reset");
reset.addEventListener("click", function() {
    startGame();
});

var scoreLabel=document.getElementById("score");
scoreLabel.addEventListener("click", function() {
    update();
});

loop();