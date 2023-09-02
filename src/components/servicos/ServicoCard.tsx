import styles from "../projeto/ProjetoCard.module.css";

import { BsFillTrashFill } from "react-icons/bs";

interface Props {
	id: string;
	nome: string;
	custo: string;
	descricao: string;
	handleRemove: (id: string, custo: string) => void;
}

function ServicoCard({ id, nome, custo, descricao, handleRemove }: Props) {
	function remove(event: any) {
		event.preventDefault();
		handleRemove(id, custo);
	}

	return (
		<div className={styles.projeto_card}>
			<h4>{nome}</h4>
			<p>
				<span>Custo total: </span>
				R${custo}
			</p>
			<p>{descricao}</p>
			<div className={styles.projeto_card_acoes}>
				<button onClick={remove}>
					<BsFillTrashFill />
					Remover
				</button>
			</div>
		</div>
	);
}

export default ServicoCard;
