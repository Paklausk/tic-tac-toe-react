import {useState} from 'react'
import { RiSettings5Fill } from 'react-icons/ri';
import './Settings.scss';

const difficultyLevels = ["easy", "medium", "hard"];

function SettingsContainer(props) {
	const [showMenu, setShowMenu] = useState(false);
	
	function setDifficultyProxy(difficulty) {
		props.settings.difficulty = difficulty;
		if (props.onChange) props.onChange({...props.settings});
	}

	function SettingsButton(props) {
		return (
			<div className="settings-button" onClick={props.onClick}>
				<RiSettings5Fill />
			</div>
		);
	}
	function SettingsMenu(props) {
		return (
			<div className={`settings-menu noselect ${ props.visible ? "" : "invisible"}`}>
				<span className="title">Settings</span>
				<hr />
				<span>Ai Difficulty</span>
				<div className="difficulty">
					{difficultyLevels.map((difficultyLevel)=>{
						return <div className={`button ${difficultyLevel} ${props.settings.difficulty === difficultyLevel ? "active" : ""}`} onClick={() => setDifficultyProxy(difficultyLevel)} key={difficultyLevel}>{difficultyLevel}</div>
					})}
				</div>
			</div>
		);
	}
	function SettingsMenuArrow(props) {
		return (
			<div className={`arrow-down ${ props.visible ? "" : "invisible"}`}></div>
		);
	}

	return (
		<div className="settings-container" onMouseLeave={() => showMenu && setShowMenu(false)}>
			<SettingsMenu visible={showMenu} settings={props.settings} />
			<SettingsMenuArrow visible={showMenu} />
			<SettingsButton onClick={() => setShowMenu(!showMenu)} />
		</div>
	);
}

export default SettingsContainer;
export {difficultyLevels}