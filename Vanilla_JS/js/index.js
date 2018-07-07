const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;

// starting point for the ball
let x = canvas.height - 30;
let y = canvas.width / 2;

// values that x and y will change by each frame
let dx = 2;
let dy = -2;

// paddle dimensions
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; // starting point of the paddle

// pressed buttons states
let rightPressed = false;
let leftPressed = false;

// listen for key press and key release
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode === 39) {
		// right cursor key pressed
		rightPressed = true;
	} else if (e.keyCode === 37) {
		// left cursor key pressed
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	// reset key state to default
	if (e.keyCode === 39) {
		// right cursor key released
		rightPressed = false;
	} else if (e.keyCode === 37) {
		// right cursor key released
		leftPressed = false;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	// clear previous ball before drawing a new one
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	// detect collisions with top edge
	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		// ball reaches the bottom edge
		alert("GAME OVER");
		document.location.reload(); // refreshes the page to restart the game
	}
	// detect collision with left and right edges
	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}
	// move paddle right until the right edge of the canvas
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		// move paddle left until the left edge of the canvas
		paddleX -= 7;
	}
	// increment x and y
	x += dx;
	y += dy;
}

setInterval(draw, 10);

// // creates a red rectangle with height and width of 50px
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// // creates a green circle
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// // creates a blue-stroked empty rectangle
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
