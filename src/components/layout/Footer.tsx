import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
	return (
		<footer className={styles.footer}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<FaInstagram />
				</li>
				<li className={styles.item}>
					<FaFacebook />
				</li>
				<li className={styles.item}>
					<FaLinkedin />
				</li>
			</ul>
			<p>
				<a
					className={styles.insta}
					target='_blank'
					href='https://www.instagram.com/freitax.li/'>
					@freitax.li
				</a>
			</p>
			<p className={styles.copyright}>
				<span>Costs &copy; 2023</span>
			</p>
			<p></p>
		</footer>
	);
}

export default Footer;
