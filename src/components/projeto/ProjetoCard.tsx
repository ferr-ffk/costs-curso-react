import styles from "./ProjetoCard.module.css";
import { Link } from "react-router-dom";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";

interface Props {
	id: Number;
	nome: string;
	orcamento: string;
	categoria: { id: Number; name: string };
	handleRemove: (id: Number) => void;
}

function ProjetoCard({ id, nome, orcamento, categoria, handleRemove }: Props) {
	return (
		<div className={styles.projeto_card}>
			<h4>{nome}</h4>
			<p>
				<span>Orçamento: R${orcamento}</span>
			</p>
			<p className={styles.categoria_texto}>
				<span className={categoria.name}></span> {categoria.name}
			</p>
			<div className={styles.projeto_card_acoes}>
				<Link to={`/projeto/${id}`}>
					<BsPencil /> Editar
				</Link>
				<button
					onClick={(event) => {
						event.preventDefault();
						handleRemove(id);
					}}>
					<BsFillTrashFill /> Excluir
				</button>
			</div>
		</div>
	);
}

export default ProjetoCard;
