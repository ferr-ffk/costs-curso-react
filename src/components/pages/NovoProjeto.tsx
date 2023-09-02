import { useNavigate } from "react-router-dom";
import ProjetoForm from "../projeto/ProjetoForm";
import styles from "./NovoProjeto.module.css";

interface IProjeto {
	id: number;
	name: string;
	custo: string;
	orcamento: number;
	category: { id: number; name: string };
	servicos: any[];
}

function NovoProjeto() {
	const navigate = useNavigate();

	const createPost = (projeto: IProjeto) => {
		// inicializar o custo e serviços

		projeto.custo = "0";
		projeto.servicos = [];

		fetch("http://localhost:5100/projetos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(projeto),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data), navigate("/projetos", { state: "Projeto criado com sucesso!" });
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<section className={styles.novoprojeto_container}>
				<h1>Criar Projeto</h1>
				<p>Crie seu projeto para depois adicionar os serviços...</p>
				<ProjetoForm handleSubmit={createPost} btnText='Criar Projeto' />
			</section>
		</>
	);
}

export default NovoProjeto;
