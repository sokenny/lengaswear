import { useRouter } from "next/router";
import Head from "next/head";
import Nav from '@/components/modules/Nav/Nav';
import Footer from '@/components/modules/Footer/Footer';
import Button from "@/components/elements/Button/Button";
import styles from '../styles/404.module.scss'

const Custom404 = ()=> {
    
    const router = useRouter();
    
    return (
        <>
            <Head>
                <title>Ups... | {process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            <main className={styles.Custom404}>
                <div>
                    <div>
                        <h2>Ups!</h2>
                        <h1>404</h1>
                        <div>Parece que estás perdido...</div>
                    </div>
                    <div>
                        <Button onClick={()=>router.replace('/')}>
                            Volver al inicio
                        </Button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Custom404;

Custom404.nav = <Nav theme="scrolled" whiteFooter={true} />
Custom404.footer = <Footer theme="white" />