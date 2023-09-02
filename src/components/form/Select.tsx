import styles from "./Select.module.css";

interface Props {
	text: string;
	options: any[];
	name: string;
	handleOnChange: any;
	value: number;
}

function Select({ text, options, name, handleOnChange, value }: Props) {
	return (
		<div className={styles.form_control}>
			<label htmlFor={name}>{text}</label>
			<select value={value} onChange={handleOnChange} name={name} id={name}>
				{options.map((o) => (
					<option value={o.id} key={o.id}>
						{o.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default Select;
