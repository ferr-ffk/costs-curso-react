import { useEffect, useState } from "react";
import styles from "./Mensagem.module.css";

interface Props {
	tipo: string;
	msg: string;
}

function Mensagem({ tipo, msg }: Props) {
	const [visivel, setVisivel] = useState(false);

    useEffect(() => {

        if(!msg) {
            setVisivel(false);
            return;
        }

        setVisivel(true);

        const timer = setTimeout(() => {
            setVisivel(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [msg])

	return (
		<>
			{visivel && (
				<div className={`${styles.mensagem} ${styles[tipo]}`}>
					<p>{msg}</p>
				</div>
			)}
		</>
	);
}

export default Mensagem;
