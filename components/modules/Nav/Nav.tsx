import Link from "next/link";
import { useScrollPosition, useIsMobile } from "@/utils/index";
import { cart } from "@/utils/icons";
import styles from './Nav.module.scss';

interface NavProps {
    theme?: string
}

const Nav:React.FC<NavProps> = ({theme}) => {

    const isMobile = useIsMobile();
    const scrollPosition = useScrollPosition();
    const hasScrolled = scrollPosition > 0;

    return (
        <div className={`${styles.Nav} ${(hasScrolled || theme === "scrolled") ? styles['Nav-scrolled'] : ''}`}>
            {isMobile ? <MobileNav /> : <DesktopNav />}
        </div>
    )
}

const MobileNav:React.FC = () => {
    return (
        <nav className={`${styles.MobileNav}`}>
            <div>
                <div>HAM</div>
                <div className={styles.MobileNav__logo}>
                    <img src="/lengas.png" alt="Lengas logo" />
                </div>
                <div className={styles.MobileNav__cart}>
                    <div>
                        0
                    </div>
                </div>
            </div>
        </nav>
    )
}

const DesktopNav:React.FC = () => {
    return (
        <nav className={`${styles.DesktopNav}`}>
            <div>
                <div>
                    <div className={styles.DesktopNav__logo}>
                        <Link href="/">
                            <img src="/lengas.png" alt="Lengas logo" height={30} />
                        </Link>
                    </div>
                    <ul>
                        <li>Nosotros</li>
                        <Link href="/relojes">
                            <li>Relojes</li>
                        </Link>
                        <li>Billeteras</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Soporte</li>
                        <li>
                            <img src="/flags/arg.png" height="14px" alt="Bandera Argentina" />
                        </li>
                        <li>
                            <div className={styles.DesktopNav__cart}>{cart(undefined, "white")}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;