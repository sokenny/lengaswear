import Head from "next/head";
import Image from "next/image";
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
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;400&family=Manrope:wght@200;400;500&display=swap" rel="stylesheet" />

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
    return (
        <nav className={styles.Nav}>
            <div>
                <div className={styles.Nav__logo}>
                    <Image src="/lengas.png" width={80} height={80} />
                </div>
                <ul>
                    <li>Nosotros</li>
                    <li>Relojes</li>
                    <li>Billeteras</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>Soporte</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </nav>
    )
}

export default MainLayout;