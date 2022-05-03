import { NextPageAugmented } from "types";
import Link from "next/link";
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import styles from '../../styles/Relojes.module.scss';

export type RelojType = {name: string, price: number, href: string, image: string}

const relojes:RelojType[] = [
    {name: 'Quemanta', price: 10900, href: "/relojes/quemanta", image: "/categoria-relojes.webp"},
    {name: 'Jauke', price: 10900, href: "/relojes/jauke", image: "/categoria-relojes.webp"},
    {name: 'Tesh', price: 10900, href: "/relojes/tesh", image: "/categoria-relojes.webp"},
    {name: 'Mahai', price: 10900, href: "/relojes/mahai", image: "/categoria-relojes.webp"},
]

const Relojes:NextPageAugmented = () => {
    return (
        <div className={styles.Relojes}>
            <div className={styles.Relojes__container}>
                <main>
                    <div className={styles.Relojes__header}>
                        <h1>Nuestros relojes</h1>
                        <h2>Podría ir, o no, un texto más aca diciendo tipo todos de maderas de distintas partes de la Patagonia, pero hechos en nuestro taller.</h2>
                    </div>
                    <section className={styles.Relojes__relojes}>
                        {relojes.map((reloj)=>
                            <Link href={reloj.href} passHref>
                                <RelojItem reloj={reloj} />
                            </Link>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

type RelojItemProps = {
    reloj: RelojType
}

const RelojItem:React.FC<RelojItemProps> = ({reloj}) => {
    return (
        <Link href={`/relojes/${reloj.name}`}>
            <div className={styles.RelojItem}>
                <div className={styles.RelojItem__image}>
                    <img src={reloj.image} alt="" />
                </div>
                <div>
                    <h3>{reloj.name}</h3>
                    <div>{reloj.price}</div>
                </div>
            </div>
        </Link>
    )
}

Relojes.nav = <Nav theme="scrolled" />
Relojes.footer = <Footer theme="white" />

export default Relojes;