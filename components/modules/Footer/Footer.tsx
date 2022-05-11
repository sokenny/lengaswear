import Link from "next/link";
import styles from './Footer.module.scss';

type FooterProps = {
    theme?: string
}

const Footer:React.FC<FooterProps> = ({theme}) => {
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
                    <li>Nuestra historia</li>
                    <li>ReforestArg</li>
                    <li>Procesos</li>
                </ul>
                <ul>
                    <li>Productos</li>
                    <li>Billeteras</li>
                    <Link href="/relojes">
                        <li>Relojes</li>
                    </Link>
                </ul>
                <ul>
                    <li>Soporte</li>
                    <li>FAQ</li>
                    <li>Políticas de devolución</li>
                    <li>Garantía</li>
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
                <div>
                    Seguinos!
                    <div>Insta</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;