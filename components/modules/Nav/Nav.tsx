import { useScrollPosition } from "@/utils/index";
import { cart } from "@/utils/icons";
import styles from './Nav.module.scss';

interface NavProps {
    theme?: string
}

const Nav:React.FC<NavProps> = ({theme}) => {

    const scrollPosition = useScrollPosition();
    const hasScrolled = scrollPosition > 0;

    return (
        <nav className={`${styles.Nav} ${hasScrolled ? styles['Nav-scrolled'] : ''}`}>
            <div>
                <div>
                    {/* <div className={styles.Nav__logo}>
                        <Image src="/lengas.png" width={80} height={80} />
                    </div> */}
                    <ul>
                        <li>Nosotros</li>
                        <li>Relojes</li>
                        <li>Billeteras</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Soporte</li>
                        <li>arg</li>
                        <li>
                            <div>{cart(undefined, hasScrolled ? "black" : "white")}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;