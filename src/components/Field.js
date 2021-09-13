import './Field.css';
import { BiCircle } from 'react-icons/bi';
import { VscClose } from 'react-icons/vsc';

function Field(props) {
	function Content(props) {
		switch(props.value) {
			case 1:
				return <VscClose />;
			case 2:
				return <BiCircle className="circle" />;
			default:
				return null;
		}
	}
	return (
		<div className="field" disabled={props.disabled} onClick={props.onClick}>
			<Content value={props.value} />
		</div>
	);
}

export default Field;