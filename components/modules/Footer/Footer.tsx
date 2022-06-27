import { instagram } from "@/utils/icons";
import { INSTAGRAM_LINK } from "@/utils/constants";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import styles from './Footer.module.scss';

type FooterProps = {
    theme?: string,
}

const Footer:React.FC<FooterProps> = ({theme}) => {

    const { setModal } = useAppContext();
    const showVideo = () => setModal(<VideoPlayer src="/institucional.mp4" />)

    return (
        <footer className={`${styles.Footer} ${theme ? styles[`Footer-${theme}`] : ''}`}>
            <div className={styles.logo}>
                <Link href="/">
                    <img src="/lengas2.png" height={40} />
                </Link>
            </div>
            <div className={styles.links}>
                <ul>
                    <li>Sobre nosotros</li>
                    <li onClick={showVideo}>Nuestra historia</li>
                    <a href="https://www.reforestarg.org.ar/" target="_blank" rel="noreferrer">
                        <li>ReforestArg</li>
                    </a>
                    <li onClick={showVideo}>Procesos</li>
                </ul>
                <ul>
                    <li>Productos</li>
                    <Link href="/billeteras">
                        <a>
                            <li>Billeteras</li>
                        </a>
                    </Link>
                    <Link href="/relojes">
                        <a>
                            <li>Relojes</li>
                        </a>
                    </Link>
                    <Link href="/carrito">
                        <a>
                            <li>Carrito</li>
                        </a>
                    </Link>
                </ul>
                <ul>
                    <li>Soporte</li>
                    <Link href="/terminos">
                        <a>
                            <li>FAQ</li>
                        </a>
                    </Link>
                    <Link href="/terminos">
                        <a>
                            <li>Políticas de devolución</li>
                        </a>
                    </Link>
                    <Link href="/terminos">
                        <a>
                            <li>Garantía</li>
                        </a>
                    </Link>
                    <li>Contactanos</li>
                </ul>
            </div>
            <div className={styles.social}>
                <div>¿Tenés alguna duda?</div>
                <div>
                    Envianos un mail a 
                    <br />
                    hola@lengaswear.com
                </div>
                <div className={styles.seguinos}>
                    <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                        Seguinos! <div className={styles.ig}>{instagram(19, "white")}</div>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;