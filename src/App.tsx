import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar.tsx";
import Home from "./components/pages/Home.tsx";
import Empresa from "./components/pages/Empresa.tsx";
import Contato from "./components/pages/Contato.tsx";
import NovoProjeto from "./components/pages/NovoProjeto.tsx";

import Container from "./components/layout/Container.tsx";
import Footer from "./components/layout/Footer.tsx";
import Projetos from "./components/pages/Projetos.tsx";
import Projeto from "./components/pages/Projeto.tsx";

function App() {
	return (
		<>
			<Container customClass=''>
				<Router>
					<NavBar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/Empresa' element={<Empresa />} />
						<Route path='/contato' element={<Contato />} />
						<Route path='/novoprojeto' element={<NovoProjeto />} />
						<Route path='/projetos' element={<Projetos />} />
						<Route path='/projeto/:id' element={<Projeto />}/>
					</Routes>
				</Router>
				<Footer />
			</Container>
		</>
	);
}

export default App;
