import { useLocation } from "react-router-dom";
import Mensagem from "../layout/Mensagem";
import styles from "./Projetos.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjetoCard from "../projeto/ProjetoCard";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

interface Projeto {
	id: Number;
	name: string;
	orcamento: string;
	category: { id: Number; name: string };
	custo: number;
	handleRemove: () => void;
}

function Projetos() {
	const [projetos, setProjetos] = useState([]);
	const [removeLoading, setRemoveLoading] = useState(false);
	const [projetoMensagem, setProjetoMensagem] = useState("");

	const location = useLocation();
	let msg: string = location.state;

	useEffect(() => {
		setTimeout(() => {
			fetch("http://localhost:5100/projetos", {
				method: "GET",
				headers: {
					"Content-Type": "application;/json",
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					setProjetos(data);
					setRemoveLoading(true);
				})
				.catch((err) => console.log(err));
		}, 1800);
	}, []);

	const removerProjeto = (id: Number): void => {
		fetch(`http://localhost:5100/projetos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then(() => {
				setProjetos(projetos.filter((p: Projeto) => p.id !== id));
				// filtra o projeto com o id a ser removido e remove ele da lista
				setProjetoMensagem("Projeto Removido com Sucesso");
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<section className={styles.projeto_container}>
				<div className={styles.titulo_container}>
					<h1>Projetos</h1>
					<LinkButton to={"/novoprojeto"} text={"Novo Projeto"} />
				</div>

				{msg && <Mensagem tipo='sucesso' msg={msg} />}
				{projetoMensagem && <Mensagem tipo='sucesso' msg={projetoMensagem} />}
				<Container customClass='start'>
					{projetos.length > 0 &&
						projetos.map(
							(p: Projeto) => (
								console.log(p),
								(
									<ProjetoCard
										id={p.id}
										nome={p.name}
										orcamento={p.orcamento}
										categoria={p.category}
										handleRemove={removerProjeto}
									/>
								)
							)
						)}

					{!removeLoading && <Loading />}

					{removeLoading && projetos.length === 0 && <p>Não há projetos cadastrados...</p>}
				</Container>
			</section>
		</>
	);
}

export default Projetos;
