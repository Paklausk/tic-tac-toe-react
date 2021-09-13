import {useState, useRef, useEffect} from 'react'
import Settings, {difficultyLevels} from './components/Settings'
import Board, {hasEmptyFields} from './components/Board'
import ResultOverlay from './components/ResultOverlay'
import {checkWinCondition} from './objects/WinConditions'
import {getEasyBotMove, getNormalBotMove, getHardBotMove} from './objects/Bot'
import './Game.css'

function Game() {
	const boardRef = useRef(null), playerFirst = useRef(true);
	const [settings, setSettings] = useState(loadSettings({difficulty: difficultyLevels[1]}));
	const [FIELD_VALUES, setFieldValues] = useState(getFieldValues(playerFirst.current));
	const [result, setResult] = useState({message: "", show: false});

	useEffect(() => {
		boardRef.current.resetBoard();
	}, [FIELD_VALUES]);

	function triggerWinEvent(playerWon) {
		setResult({
			message: (playerWon ? 'You won! Congratulations!' : 'Computer won!'),
			show: true
		});
	}
	function triggerDrawEvent() {
		setResult({message: "It's a draw! No one won.", show: true});
	}
	function resetGame() {
		playerFirst.current = !playerFirst.current;
		setFieldValues(getFieldValues(playerFirst.current));
	}
	function getFieldValues(playerFirst) {
		return Object.freeze({
			EMPTY: 0,
			PLAYER: playerFirst ? 1 : 2,
			COMPUTER: playerFirst ? 2 : 1
		});
	}
	function makeAiMove(board) {
		let index;
		if (settings.difficulty === difficultyLevels[0])
			index = getEasyBotMove(board, FIELD_VALUES);
		else if (settings.difficulty === difficultyLevels[1])
			index = getNormalBotMove(board, FIELD_VALUES);
		else if (settings.difficulty === difficultyLevels[2])
			index = getHardBotMove(board, FIELD_VALUES);
		boardRef.current.setNewField(index, FIELD_VALUES.COMPUTER);
	}
	function saveSettings(settings) {
		localStorage.setItem("tictactoe-settings", JSON.stringify(settings));
	}
	function loadSettings(defaultSettings) {
		return JSON.parse(localStorage.getItem("tictactoe-settings")) ?? defaultSettings;
	}

	function onBoardChange(newBoard, index, newValue) {
		if (newValue !== FIELD_VALUES.EMPTY && checkWinCondition(newBoard, newValue)) triggerWinEvent(newValue === FIELD_VALUES.PLAYER);
		else if (!hasEmptyFields(newBoard, FIELD_VALUES)) triggerDrawEvent();
		else if ((newValue === FIELD_VALUES.EMPTY && !playerFirst.current) || newValue === FIELD_VALUES.PLAYER)
			makeAiMove(newBoard);
	}
	function onSettingsChanged(newSettings) {
		setSettings(newSettings);
		saveSettings(newSettings);
	}
	function onRestartClick() {
		setResult({message: "", show: false});
		resetGame();
	}

	return (
		<div className="game center-content">
			<Board ref={boardRef} onChange={onBoardChange} fieldValues={FIELD_VALUES} />
			<Settings settings={settings} onChange={onSettingsChanged} />
			{result.show ? <ResultOverlay message={result.message} restartClick={onRestartClick} /> : null}
		</div>
	);
}

export default Game;
