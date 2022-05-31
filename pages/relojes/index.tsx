import { NextPageAugmented, ProductType } from "types";
import Head from "next/head";
import ProductCategory from '@/components/layouts/ProductCategory/ProductCategory';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

const relojes:ProductType[] = [
    {id: 1, name: 'Quemanta', price: 10900, sellingPrice: 10900, href: "/relojes/quemanta", image: "/relojes/quemanta/thumbnail.webp"},
    {id: 2, name: 'Jauke', price: 10900, sellingPrice: 10900, href: "/relojes/jauke", image: "/relojes/jauke/thumbnail.webp"},
    {id: 3, name: 'Tesh', price: 10900, sellingPrice: 10900, href: "/relojes/tesh", image: "/relojes/tesh/thumbnail.webp"},
    {id: 4, name: 'Mahai', price: 10900, sellingPrice: 10900, href: "/relojes/mahai", image: "/relojes/mahai/thumbnail.webp"},
]

const Relojes:NextPageAugmented = () => {
    return (
        <>
            <Head>
                <title>Relojes | Lengas Wear</title>
            </Head>
            <ProductCategory 
            title="Nuestros Relojes" 
            description="Podría ir, o no, un texto más aca diciendo tipo todos de maderas de distintas partes de la Patagonia, pero hechos en nuestro taller" 
            products={relojes}
            />
        </>
    )
}

Relojes.nav = <Nav theme="scrolled" whiteFooter={true} />
Relojes.footer = <Footer theme="white" />

export default Relojes;