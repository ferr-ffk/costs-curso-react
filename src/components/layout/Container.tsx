import styles from "./Container.module.css";

interface Props {
	children: any;
	customClass: string;
}

function Container({ children, customClass }: Props) {
	return (
		<>
			<div className={`${styles.container} ${styles[customClass]}`}>{children}</div>
		</>
	);
}

export default Container;
