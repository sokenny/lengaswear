import { NextPageAugmented, ProductType } from "types";
import Head from "next/head";
import ProductCategory from '@/components/layouts/ProductCategory/ProductCategory';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

const billeteras:ProductType[] = [
    {id: 5, name: 'Chocolate', price: 3950, sellingPrice: 3950, href: "/billeteras/chocolate", image: "/billeteras/chocolate/thumbnail.webp"},
    {id: 6, name: 'Suela', price: 3950, sellingPrice: 3950, href: "/billeteras/suela", image: "/billeteras/suela/thumbnail.webp"},
    {id: 7, name: 'Boom', price: 3950, sellingPrice: 3950, href: "/billeteras/boom", image: "/billeteras/boom/thumbnail.webp"},
]

const Billeteras:NextPageAugmented = () => {
    return (
        <>
            <Head>
                <title>Billeteras | Lengas Wear</title>
            </Head>
            <ProductCategory 
            title="Nuestras Billeteras" 
            description="Podría ir, o no, un texto más aca diciendo tipo todos de maderas de distintas partes de la Patagonia, pero hechos en nuestro taller" 
            products={billeteras}
            />
        </>
    )
}

Billeteras.nav = <Nav theme="scrolled" whiteFooter={true} />
Billeteras.footer = <Footer theme="white" />

export default Billeteras;