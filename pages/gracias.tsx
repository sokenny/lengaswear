import { NextPageAugmented } from "types";
import { motion  } from "framer-motion";
import  Head from 'next/head';
import { WHATSAPP_LINK } from "@/utils/constants";
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import styles from '../styles/Gracias.module.scss';
import { getMotionProps } from "../utils";

const Terminos: NextPageAugmented = () => {

    return (
        <>
        <Head>
            <title>Gracias | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className={styles.Gracias}>
            <header>
                <motion.h1
                {...getMotionProps("slideVertical", true, {delay: .2})}
                >Gracias!</motion.h1>
                <motion.h2
                {...getMotionProps("slideVertical", true, {delay: .4})}
                >
                    Acabas de contribuir con la <span>reforestación</span>.</motion.h2>
            </header>
            <motion.main
            {...getMotionProps("slideVertical", true, {delay: .4})}
            >
                <p>Estamos corriendo 🏃 al taller para armar tu pedido!</p>
                <p>Cualquier duda podes escribirnos por <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Whatsapp</a> o enviarnos un mail a <a href="mailto:lengaswear@gmail.com" target="_blank" rel="noreferrer">lengaswear@gmail.com</a></p>
            </motion.main>
        </div>
        </>
    )
}

Terminos.nav = <Nav theme="scrolled" whiteFooter={true} />
Terminos.footer = <Footer theme="white" />

export default Terminos;