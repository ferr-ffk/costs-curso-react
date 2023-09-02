import styles from '../pages/Projeto.module.css';

import { IProjeto } from '../pages/Projeto';

type Props = {
    projeto: IProjeto;    
}

function ProjetoInfo({projeto}: Props) {
  return (
		<div className={styles.projeto_info}>
			<p>
				<span>Categoria: </span>
				{projeto.category.name}
			</p>
			<p>
				<span>Total de orçamento: </span>
				R${projeto.orcamento}
			</p>
			<p>
				<span>Total utilizado: </span>
				R${projeto.custo}
			</p>
		</div>
  );
}

export default ProjetoInfo