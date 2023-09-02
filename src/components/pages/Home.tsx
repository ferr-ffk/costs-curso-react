import './Home.module.css';

import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";

function Home() {
	return (
		<section className='home'>
			<h1>
				Bem-vindo ao <span>Costs!</span>
			</h1>
			<p>Comece a gerenciar seus projetos agora mesmo...</p>
			<LinkButton to='/novoprojeto' text='Criar Projeto' />
			<img className='savings' src={savings} alt='Savings' />
		</section>
	);
}

export default Home;
