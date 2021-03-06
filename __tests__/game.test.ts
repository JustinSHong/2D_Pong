import Ball from '../public/js/modules/ball'
import Brick from '../public/js/modules/brick'
import Game from '../public/js/modules/game'
import MockCanvas from '../public/js/modules/canvas'
import Mode from '../public/js/modules/mode'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'
import { veryEasyMode } from '../public/js/constants'
import { changeGameTheme } from '../public/js/services/theme'

jest.mock('../public/js/modules/canvas')
jest.mock('../public/js/services/score')
jest.mock('../public/js/services/theme')

describe('game', () => {
	window.alert = () => {}

	const mode = new Mode(veryEasyMode)
	const canvas = new MockCanvas()
	const ball = new Ball(canvas.height, canvas.width, mode)
	const player = new Player(mode)
	const brick = new Brick(mode)
	const paddle = new Paddle(canvas)
	const game = new Game(ball, brick, canvas, mode, paddle, player)

	test('game should have the right properties', () => {
		expect(game).toHaveProperty('ball')
		expect(game).toHaveProperty('brick')
		expect(game).toHaveProperty('canvas')
		expect(game).toHaveProperty('paddle')
		expect(game).toHaveProperty('rightPressed')
		expect(game).toHaveProperty('leftPressed')
		expect(game).toHaveProperty('player')
		expect(game).toHaveProperty('pause')
		expect(game).toHaveProperty('init')
		expect(game).toHaveProperty('draw')
		expect(game).toHaveProperty('drawCurrentGameMode')
		expect(game).toHaveProperty('keyDownHandler')
		expect(game).toHaveProperty('keyUpHandler')
		expect(game).toHaveProperty('mouseClickHandler')
		expect(game).toHaveProperty('mouseMoveHandler')
		expect(game).toHaveProperty('pauseGame')
		expect(game).toHaveProperty('resumeGame')
		expect(game).toHaveProperty('selectGameMode')
	})

	test('pause and resume', () => {
		expect(game.pauseGame()).toBe(true)
		expect(game.resumeGame()).toBe(false)
	})

	test('selectGameMode', () => {
		let mockEvent = { target: { value: 'Easy' } }
		const easyMode = {
			dx: 2,
			dy: -2,
			lives: 5,
			maxDx: 2.5,
			maxDy: -2.5,
			name: 'easy',
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(easyMode)

		mockEvent = { target: { value: 'Medium' } }
		const mediumMode = {
			dx: 2.5,
			dy: -2.5,
			lives: 4,
			maxDx: 3,
			maxDy: -3,
			name: 'medium',
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(mediumMode)

		mockEvent = { target: { value: 'Hard' } }
		const hardMode = {
			dx: 3,
			dy: -3,
			lives: 3,
			maxDx: 3.5,
			maxDy: -3.5,
			name: 'hard',
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(hardMode)

		mockEvent = { target: { value: 'Very Hard' } }
		const veryHardMode = {
			dx: 3.5,
			dy: -3.5,
			lives: 4,
			maxDx: 4,
			maxDy: -4,
			name: 'veryHard',
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(veryHardMode)
	})

	test('keyDownHandler', () => {
		const spy = jest.spyOn(game, 'keyDownHandler')
		const spy2 = jest.spyOn(game, 'pauseGame')
		let mockEvent = { keyCode: 39 }
		let code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(39)

		mockEvent = { keyCode: 37 }
		code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(37)

		mockEvent = { keyCode: 80 }
		code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(3)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy2).toHaveBeenCalled()
		expect(spy2).toHaveBeenCalledTimes(1)
		expect(code).toBe(80)

		mockEvent = { keyCode: 81 }
		code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(4)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(81)

		spy2.mockClear()
	})

	test('keyUpHandler', () => {
		const spy = jest.spyOn(game, 'keyUpHandler')
		let mockEvent = { keyCode: 39 }
		let code = game.keyUpHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(39)

		mockEvent = { keyCode: 37 }
		code = game.keyUpHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(37)
	})

	test('mouseClickHandler', () => {
		const spy = jest.spyOn(game, 'mouseClickHandler')
		const spy2 = jest.spyOn(game, 'pauseGame')
		const spy4 = jest.spyOn(game, 'resumeGame')

		let mockEvent = { target: { id: 'playBtn' } }
		let id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy4).toHaveBeenCalled()
		expect(spy4).toHaveBeenCalledTimes(1)
		expect(id).toBe('playBtn')

		mockEvent = { target: { id: 'pauseBtn' } }
		id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy2).toHaveBeenCalled()
		expect(spy2).toHaveBeenCalledTimes(1)
		expect(id).toBe('pauseBtn')

		mockEvent = { target: { id: 'pastelTwoRadio' } }
		id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(3)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy2).toHaveBeenCalled()
		expect(spy2).toHaveBeenCalledTimes(1)
		expect(id).toBe('pastelTwoRadio')
		expect(changeGameTheme).toHaveBeenCalledTimes(1)
		expect(changeGameTheme).toHaveBeenCalledWith('pastelTwoRadio')
	})

	describe('integration tests', () => {
		window.requestAnimationFrame = jest.fn()
		window.cancelAnimationFrame = jest.fn()

		test('drawCurrentGameMode should be called when game draws', () => {
			const canvas = new MockCanvas()
			const mode = new Mode(veryEasyMode)
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)
			const spy = jest.spyOn(game, 'drawCurrentGameMode')

			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith(mode)

			spy.mockClear()
		})

		test("showGameEndModal should be called with 'You Win' message when game is over", () => {
			const canvas = new MockCanvas()
			const mode = new Mode(veryEasyMode)
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			player.setScore(
				brick.getBrickRowCount() * brick.getBrickColumnCount()
			)

			const spy = jest.spyOn(game, 'showGameEndModal')

			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith('You Win', 'You Win! Congrats!')

			spy.mockRestore()
		})

		test("showGameEndModal should be called with 'Game Over' message when game draws", () => {
			const canvas = new MockCanvas()
			const mode = new Mode(veryEasyMode)
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			player.setLives(0)

			const spy = jest.spyOn(game, 'showGameEndModal')

			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith(
				'Game Over',
				'You lost. Game Over!'
			)

			spy.mockRestore()
		})

		test('paddle posiiton should update when user presses right arrow key', () => {
			const canvas = new MockCanvas()
			const mode = new Mode(veryEasyMode)
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy = jest.spyOn(paddle, 'update')

			game.keyDownHandler({ keyCode: 39 } as any)
			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith(7)
		})

		test('paddle position should update when user presses left arrow key', () => {
			const mode = new Mode(veryEasyMode)
			const canvas = new MockCanvas()
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy = jest.spyOn(paddle, 'update')

			game.keyDownHandler({ keyCode: 37 } as any)
			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith(-7)
		})

		test('requestAnimationFrame should be called when game is not paused', () => {
			const canvas = new MockCanvas()
			const mode = new Mode(veryEasyMode)
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy = jest.spyOn(window, 'requestAnimationFrame')

			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
		})

		test('cancelAnimationFrame should be called when game is paused', () => {
			const canvas = new MockCanvas()
			const mode = new Mode(veryEasyMode)
			const ball = new Ball(canvas.height, canvas.width, mode)
			const player = new Player(mode)
			const brick = new Brick(mode)
			const paddle = new Paddle(canvas)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy = jest.spyOn(window, 'cancelAnimationFrame')

			game.pauseGame()
			game.draw(ball, brick, canvas, paddle, player)

			expect(spy).toHaveBeenCalled()
		})
	})
})
