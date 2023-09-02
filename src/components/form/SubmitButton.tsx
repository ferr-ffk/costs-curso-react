import styles from "./SubmitButton.module.css";

interface Props {
	text: string;
	handleOnClick: any;
}

function SubmitButton({ text, handleOnClick }: Props) {
	return (
		<button onClick={handleOnClick} className={styles.btn_submit}>
			{text}
		</button>
	);
}

export default SubmitButton;
