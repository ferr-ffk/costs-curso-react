import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "../projeto/ProjetoForm.module.css";
import { IProjeto } from "../pages/Projeto";

interface Props {
	handleSubmit: (projetoData: IProjeto) => void;
	btnText: string;
	projetoData: IProjeto;
}

function ServicoForm({ handleSubmit, btnText, projetoData }: Props) {
	const [servico, setServico] = useState({});

	function submit(event: any) {
		event.preventDefault();
		projetoData.servicos.push(servico);
		handleSubmit(projetoData);
	}

	function handleChange(event: Event) {
		setServico({ ...servico, [event.target?.name]: event.target?.value });
		console.log(servico);
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			<Input
				type='text'
				text='Nome do serviço'
				name='nome'
				placeholder='Insira o nome do serviço'
				handleOnChange={handleChange}
			/>
			<Input
				type='number'
				text='Custo do serviço'
				name='custo'
				placeholder='Insira o valor total do serviço'
				handleOnChange={handleChange}
			/>
			<Input
				type='text'
				text='Descrição do serviço'
				name='descricao'
				placeholder='Descreva o serviço'
				handleOnChange={handleChange}
			/>
			<SubmitButton text={btnText} handleOnClick={handleSubmit} />
		</form>
	);
}

export default ServicoForm;
