import styles from "./Input.module.css";

interface Props {
	type: string;
	text: string;
	name: string;
	placeholder: string;
	value?: string | number;
	handleOnChange?: any;
}

function Input({ type, text, name, placeholder, value, handleOnChange }: Props) {
	return (
		<div className={styles.form_control}>
			<label htmlFor={name}>{text}</label>
			<input
				onChange={handleOnChange}
				name={name}
				id={name}
				placeholder={placeholder}
				type={type}
				value={value}
			/>
		</div>
	);
}

export default Input;
