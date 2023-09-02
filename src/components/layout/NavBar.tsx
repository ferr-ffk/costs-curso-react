import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../img/costs_logo.png";
import Container from "./Container";

function NavBar() {
	return (
		<nav className={styles.navbar}>
			<Link to='/'>
				<img className='logo' src={logo} alt='costs-logo' />
			</Link>
			<Container customClass=''>
				<ul className={styles.list}>
					<li className={styles.item}>
						<Link to='/'>Home</Link>
					</li>
					<li className={styles.item}>
						<Link to='/projetos'>Projetos</Link>
					</li>
					<li className={styles.item}>
						<Link to='/contato'>Contato</Link>
					</li>
					<li className={styles.item}>
						<Link to='/empresa'>Empresa</Link>
					</li>
				</ul>
			</Container>
		</nav>
	);
}

export default NavBar;
