import { Link } from "react-router-dom";
import "./LinkButton.css";

interface Props {
	to: string;
	text: string;
}

function LinkButton({ to, text }: Props) {
	return (
		<Link className='linkbtn' to={to}>
			{text}
		</Link>
	);
}

export default LinkButton;
