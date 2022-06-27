import { NextPageAugmented, ProductType } from "types";
import { GetStaticProps } from 'next';
import { getProductCategory } from "@/utils/db";
import Head from "next/head";
import ProductCategory from '@/components/layouts/ProductCategory/ProductCategory';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

const Relojes:NextPageAugmented<{relojes: ProductType[]}> = ({relojes}) => {
    return (
        <>
            <Head>
                <title>Relojes | Lengas Wear</title>
            </Head>
            <ProductCategory 
            title="Nuestros Relojes" 
            description="Encapsulando el tiempo en un objeto simbólico que busca representar las más lindas partes de nuestra Patagonia." 
            products={relojes}
            />
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const relojes = await getProductCategory('relojes');
    const props = { relojes }
    return { props }
}

Relojes.nav = <Nav theme="scrolled" whiteFooter={true} />
Relojes.footer = <Footer theme="white" />

export default Relojes;