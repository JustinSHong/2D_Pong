import { ICanvas } from './canvas'

export interface IPlayer {
	drawScore(canvas: ICanvas): void
	drawLives(canvas: ICanvas): void
	getLives(): number
	getScore(): number
	setLives(lives: number): void
	setScore(score: number): void
}

class Player implements IPlayer {
	private lives: number
	private score: number

	constructor(public mode: any) {
		this.lives = mode.lives
		this.score = 0
	}

	// draw current score to the canvas
	public drawScore(canvas: ICanvas): number {
		const ctx = canvas.getCtx()

		ctx.font = '24px Arial'
		ctx.fillStyle = '#0095DD'
		ctx.fillText('Score: ' + this.score, 8, 20)
		return this.score
	}

	// draw current number of lives to the canvas
	public drawLives(canvas: ICanvas): number {
		const ctx = canvas.getCtx()
		const canvasWidth = canvas.getWidth()

		ctx.font = '24px Arial'
		ctx.fillStyle = '#0095DD'
		ctx.fillText('Lives: ' + this.lives, canvasWidth - 90, 20)
		return this.lives
	}

	public getLives(): number {
		return this.lives
	}

	public getScore(): number {
		return this.score
	}

	public setLives(lives: number): void {
		this.lives = lives
	}

	public setScore(score: number): void {
		this.score = score
	}

	// udpate player data
	// update(lives: number, username: string, score: number) {
	// 	this.lives += lives
	// 	this.username = username
	// 	this.score += score
	// }
}

export default Player
