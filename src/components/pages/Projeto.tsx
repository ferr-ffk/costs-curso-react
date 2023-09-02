import { v4 as uuidv4 } from "uuid";

import styles from "./Projeto.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjetoForm from "../projeto/ProjetoForm";
import Mensagem from "../layout/Mensagem";
import ServicoForm from "../servicos/ServicoForm";
import ProjetoInfo from "../projeto/ProjetoInfo";
import ServicoCard from "../servicos/ServicoCard";

export interface IProjeto {
	id: number;
	name: string;
	custo: string;
	orcamento: number;
	category: { id: number; name: string };
	servicos: IServico[];
}

export interface IServico {
	id: string;
	descricao: string;
	custo: string;
	nome: string;
}

function Projeto() {
	const { id } = useParams();
	// o parametro virá da url

	const [projeto, setProjeto] = useState<IProjeto>({
		name: "",
		id: 0,
		orcamento: 0,
		category: { id: 0, name: "" },
		custo: "0",
		servicos: [],
	});
	const [servicos, setServicos] = useState([]);
	const [mostrarProjetoForm, setMostrarProjetoForm] = useState(false);
	const [mostrarServicoForm, setMostrarServicoForm] = useState(false);
	const [mensagem, setMensagem] = useState("");
	const [tipoMensagem, setTipoMensagem] = useState("");

	useEffect(() => {
		setTimeout(() => {
			fetch(`http://localhost:5100/projetos/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					setProjeto(data);
					setServicos(data.servicos);
				})
				.catch((err) => console.log(err));
		}, 800);
	}, [id]);

	function editarPost(projeto: IProjeto): void {
		setMensagem("");
		// validar orçamento
		if (projeto.orcamento < parseFloat(projeto.custo)) {
			setMensagem("O orçamento não pode ser menor que o custo do projeto!");
			setTipoMensagem("erro");
			return;
		}

		fetch(`http://localhost:5100/projetos/${projeto.id}`, {
			// patch: atualiza somente os valores enviados
			// update: atualiza todos os valores, independente se foram especificados ou não
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(projeto),
		})
			.then((resp) => resp.json())
			.then((data) => {
				setProjeto(data);
				setMostrarProjetoForm(false);
				setMensagem("Projeto atualizado!");
				setTipoMensagem("sucesso");
			})
			.catch((err) => console.log(err));
	}

	const toggleProjetoForm = () => {
		setMostrarProjetoForm(!mostrarProjetoForm);
	};

	function toggleServicoForm(): void {
		setMostrarServicoForm(!mostrarServicoForm);
	}

	function criarServico(projeto: IProjeto) {
		// ultimo serviço
		const ultimoServico: IServico = projeto.servicos[projeto.servicos.length - 1];

		console.log(ultimoServico);

		ultimoServico.id = uuidv4();

		const ultimoServicoCusto = ultimoServico.custo;
		console.log(ultimoServicoCusto);

		const projetoCusto = projeto.custo == null ? "0" : projeto.custo;

		const novoCusto = parseFloat(projetoCusto) + parseFloat(ultimoServicoCusto);

		// validação do valor máximo

		if (novoCusto > projeto.orcamento) {
			setMensagem("Orçamento ultrapassado! Verifique o valor do serviço");
			setTipoMensagem("erro");
			projeto.servicos.pop();
			return;
		}

		// adicionar custos ao total do projeto

		projeto.custo = novoCusto.toString();

		// update projeto
		console.log(novoCusto);

		fetch(`http://localhost:5100/projetos/${projeto.id}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(projeto),
		})
			.then((resp) => resp.json())
			.then((data) => {
				// exibir os serviços
				console.log(data);
				setMostrarServicoForm(false);
			})
			.catch((err) => console.log(err));
	}

	function removerServico(id: string, custo: string) {
		const servicosAtualizado = servicos.filter((servico: IServico) => servico.id !== id);

		const projetoAtualizado = projeto;

		projetoAtualizado.servicos = servicosAtualizado;

		projetoAtualizado.custo = (parseFloat(projetoAtualizado.custo) - parseFloat(custo)).toString();

		fetch(`http://localhost:5100/projetos/${projetoAtualizado.id}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(projetoAtualizado),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				setProjeto(projetoAtualizado);
				setServicos(servicosAtualizado);
				setMensagem("Serviço removido com sucesso!");
				setTipoMensagem("sucesso");
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			{projeto.name ? (
				<div className={styles.projeto_detalhes}>
					<Container customClass='column'>
						{mensagem && <Mensagem tipo={tipoMensagem} msg={mensagem} />}
						<div className={styles.detalhes_container}>
							<h1>Projeto: {projeto.name}</h1>
							<button className={styles.botao_projeto} onClick={toggleProjetoForm}>
								{!mostrarProjetoForm ? "Editar Projeto" : "Fechar"}
							</button>
							{!mostrarProjetoForm ? (
								<ProjetoInfo projeto={projeto} />
							) : (
								<div className={styles.projeto_info}>
									<ProjetoForm
										btnText='Enviar'
										handleSubmit={editarPost}
										projetoData={projeto}
									/>
								</div>
							)}
						</div>
						<div className={styles.servico_form_container}>
							<h2>Adicione um serviço:</h2>
							<button className={styles.botao_projeto} onClick={toggleServicoForm}>
								{!mostrarServicoForm ? "Adicionar Serviço" : "Fechar"}
							</button>
							<div className={styles.projeto_info}>
								{mostrarServicoForm && (
									<ServicoForm
										handleSubmit={criarServico}
										btnText='Adicionar Serviço'
										projetoData={projeto}
									/>
								)}
							</div>
						</div>
						<h2>Serviços</h2>
						<Container customClass='start'>
							{servicos.length > 0 &&
								servicos.map((servico: IServico) => (
									<ServicoCard
										key={servico.id}
										id={servico.id}
										nome={servico.nome}
										custo={servico.custo}
										descricao={servico.descricao}
										handleRemove={removerServico}
									/>
								))}
							{servicos.length === 0 && <p>Não há serviços cadastrados...</p>}
						</Container>
					</Container>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Projeto;
