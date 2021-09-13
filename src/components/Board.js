import React, {useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react'
import './Board.css'
import Field from './Field'

function Board(props, ref) {
	let FIELD_VALUES = props.fieldValues;
	const EMPTY_BOARD = Array(9).fill(FIELD_VALUES.EMPTY);
	const [board, setBoard] = useState(EMPTY_BOARD);
	const onChangePromise = useRef();

	useImperativeHandle(ref, () => ({
		setNewField, isFieldEmpty, resetBoard
	}));
	useEffect(() => {
		if (onChangePromise.current) {
			var onChange = onChangePromise.current;
			onChangePromise.current = null;
			onChange();
		}
	});

	function onFieldClick(index) {
		if (!isFieldEmpty(index)) return;
		
		setNewField(index, FIELD_VALUES.PLAYER);
	}
	function isFieldEmpty(index) {
		return board[index] === FIELD_VALUES.EMPTY;
	}
	function setNewField(index, newValue) {
		if (board[index] === newValue) return;

		var newBoard = Array.from(board, (oldValue, i) => i === index ? newValue : oldValue);

		onBoardChange(newBoard, index, newValue);
		setBoard(newBoard);
	}
	function resetBoard() {
		onBoardChange(EMPTY_BOARD, null, FIELD_VALUES.EMPTY);
		setBoard(Array.from(EMPTY_BOARD));
	}
	function onBoardChange(board, index, newValue) {
		if (props.onChange) onChangePromise.current = () => props.onChange(board, index, newValue);
	}

	return (
		<div className="board">
			{board.map((fieldValue, index) => <Field disabled={fieldValue !== FIELD_VALUES.EMPTY} value={fieldValue} key={index} onClick={onFieldClick.bind(this, index)} />)}
		</div>
	);
}

var hasEmptyFields = function (board, FIELD_VALUES) {
	for	(let i = 0; i < board.length; i++)
		if (board[i] === FIELD_VALUES.EMPTY)
			return true;
	return false;
}

export default forwardRef(Board);
export {hasEmptyFields}