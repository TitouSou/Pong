const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let startTime = Date.now();
let score = (Date.now() - startTime) / 1000;
let speedCoef = 1;
let rafId;
let xSpeed = 1;
let ySpeed = 1;
let x = 50;
let y = 50;

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

    x += xSpeed;
    y += ySpeed;
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
    ctx.arc(x, y, 10, 0, Math.PI * 2);
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