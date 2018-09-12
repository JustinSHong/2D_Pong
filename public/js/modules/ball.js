class Ball {
	constructor(height, width) {
		this.ballColor = "#0095DD";
		// starting position
		this.x = width / 2;
		this.y = height - 30;
		this.ballRadius = 10;
		// velocity - change in position
		this.dx = 2;
		this.dy = -2;
	}

	changeColor() {
		const red = Math.random() * 256;
		const green = Math.random() * 256;
		const blue = Math.random() * 256;
		const color = `rgb(${red}, ${green}, ${blue})`;
		console.log(`change ball color to ${color}`);
		this.ballColor = color;
	}

	// draw ball to the canvas
	drawBall(canvas) {
		canvas.ctx.beginPath();
		canvas.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
		canvas.ctx.fillStyle = this.ballColor;
		canvas.ctx.fill();
		canvas.ctx.closePath();
	}

	// update ball's movement
	update() {
		this.x += this.dx;
		this.y += this.dy;
	}
}

export default Ball;