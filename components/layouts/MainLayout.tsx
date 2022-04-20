import Head from "next/head";
import Image from "next/image";
import { useScrollPosition } from "@/utils/index";
import { cart } from "@/utils/icons";
import styles from '../../styles/MainLayout.module.scss';

type Props = {
    children: React.ReactNode
}

const MainLayout: React.FC<Props>  = ({children}) => {

    return (
        <div>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Silk Serif:wght@100;400&family=Manrope:wght@200;400;500&display=swap" rel="stylesheet" />

            </Head>
            <Nav theme={""} />
            {children}
        </div>
    )
    
}

interface NavProps {
    theme: string
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

export default MainLayout;