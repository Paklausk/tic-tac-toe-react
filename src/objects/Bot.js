import {checkWinCondition} from './WinConditions'
import {hasEmptyFields} from './../components/Board'

function getEasyBotMove(board, FIELD_VALUES) {
	let move = getRandomMove(board, FIELD_VALUES.EMPTY);
	return move;
}
function getNormalBotMove(board, FIELD_VALUES) {
	//win if possible
	for (let i = 0; i < board.length; i++)
		if (board[i] === FIELD_VALUES.EMPTY) {
			let newBoard = [...board];
			newBoard[i] = FIELD_VALUES.COMPUTER;
			if (checkWinCondition(newBoard, FIELD_VALUES.COMPUTER))
				return i;
		}
	
	//deny win
	for (let i = 0; i < board.length; i++)
		if (board[i] === FIELD_VALUES.EMPTY) {
			let newBoard = [...board];
			newBoard[i] = FIELD_VALUES.PLAYER;
			if (checkWinCondition(newBoard, FIELD_VALUES.PLAYER))
				return i;
		}

	//get best field
	if (board[4] === FIELD_VALUES.EMPTY)
		return 4;

	return getRandomMove(board, FIELD_VALUES.EMPTY);
}
function getHardBotMove(board, FIELD_VALUES) {
	let bestScore = -Infinity, move;
	for (let i = 0; i < 9; i++) {
		if (board[i] === FIELD_VALUES.EMPTY) {
			board[i] = FIELD_VALUES.COMPUTER;
			let score = minimaxab(board, 0, -Infinity, +Infinity, false, FIELD_VALUES);
			board[i] = FIELD_VALUES.EMPTY;
			if (score > bestScore) {
				bestScore = score;
				move = i;
			}
		}
	}
	return move;
}

function minimaxab(board, depth, alpha, beta, isMaximizing, FIELD_VALUES) {
	let result = checkScore(board, FIELD_VALUES);
	if (result !== null) {
		return result;
	}

	if (isMaximizing) {
		for (let i = 0; i < board.length; i++) {
			if (board[i] === FIELD_VALUES.EMPTY) {
				board[i] = FIELD_VALUES.COMPUTER;
				let score = minimaxab(board, depth + 1, alpha, beta, false, FIELD_VALUES);
				board[i] = FIELD_VALUES.EMPTY;
				if (score > alpha) {
					alpha = score;
				} else if (alpha >= beta) {
						return alpha;
				}
			}
		}
		return alpha;
	} else {
		for (let i = 0; i < board.length; i++) {
			if (board[i] === FIELD_VALUES.EMPTY) {
				board[i] = FIELD_VALUES.PLAYER;
				let score = minimaxab(board, depth + 1, alpha, beta, true, FIELD_VALUES);
				board[i] = FIELD_VALUES.EMPTY;
				if (score < beta) {
					beta = score;
				} else if (beta <= alpha) {
					return beta;
				}
			}
		}
		return beta;
	}
}
function checkScore(board, FIELD_VALUES) {
	if (checkWinCondition(board, FIELD_VALUES.COMPUTER))
		return 1;
	else if (checkWinCondition(board, FIELD_VALUES.PLAYER))
		return -1;
	else if (!hasEmptyFields(board, FIELD_VALUES))
		return 0;
	return null;
}
function getRandomMove(board, emptyFieldValue) {
	var steps = getRandomInt(board.length - 1);
	
	for	(let i = 0; i < board.length; i++) {
		let move = (steps + i) % board.length;
		if (board[move] === emptyFieldValue)
			return move;
	}
	return 0;
}
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export {getEasyBotMove, getNormalBotMove, getHardBotMove};