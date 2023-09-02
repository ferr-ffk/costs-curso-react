import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjetoForm.module.css";

interface IProjeto {
	id: number;
	name: string;
	custo: string;
	orcamento: number;
	category: { id: number; name: string };
	servicos: any[];
}

interface Props {
	btnText: string;
	handleSubmit: (projeto: IProjeto) => void;
	projetoData?: IProjeto;
}

function ProjetoFormulario({ btnText, handleSubmit, projetoData }: Props) {
	const [categorias, setCategorias] = useState([]);
	const [projeto, setProjeto] = useState<IProjeto>(
		projetoData || {
			name: "",
			id: 0,
			orcamento: 0,
			category: { id: 0, name: "" },
			custo: "0",
			servicos: [],
		}
	);

	useEffect(() => {
		fetch("http://localhost:5100/categorias", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => setCategorias(data))
			.catch((err) => console.log(err));
	}, []);

	function submit(event: any) {
		event.preventDefault();
		handleSubmit(projeto);
	}

	function handleChange(event: any) {
		setProjeto({ ...projeto, [event.target?.name]: event.target?.value });
	}

	function handleSelect(event: any) {
		setProjeto({
			...projeto,
			category: {
				id: event.target?.value,
				name: event.target?.options[event.target?.selectedIndex].text,
			},
		});
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			<Input
				type='text'
				text='Nome do projeto'
				name='name'
				placeholder='Nome do projeto'
				handleOnChange={handleChange}
				value={projeto.name ? projeto.name : ""}
			/>
			<Input
				type='number'
				text='Orçamento do projeto'
				name='orcamento'
				placeholder='Orçamento total'
				handleOnChange={handleChange}
				value={projeto.orcamento ? projeto.orcamento : ""}
			/>

			<Select
				name='category_id'
				text='Selecione a categoria'
				options={categorias}
				handleOnChange={handleSelect}
				value={projeto.category.id}
			/>
			<SubmitButton handleOnClick={handleSubmit} text={btnText} />
		</form>
	);
}

export default ProjetoFormulario;
