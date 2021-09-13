var WinConditions = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
];
export default WinConditions;
export function checkWinCondition(board, marker) {
	for	(let i = 0; i < WinConditions.length; i++) {
		let won = true;
		for	(let j = 0; j < WinConditions[i].length; j++) {
			if (board[WinConditions[i][j]] !== marker) {
				won = false;
				break;
			}
		}
		if (won)
			return won;
	}
	return false;
}