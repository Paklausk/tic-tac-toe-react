import './ResultOverlay.scss';

function ResultOverlay(props) {
	return (
		<div className="result-overlay">
			<span className="message">{props.message}</span>
			<button className="button" onClick={props.restartClick}>Restart</button>
		</div>
	);
}

export default ResultOverlay;