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
            description="Podría ir, o no, un texto más aca diciendo tipo todos de maderas de distintas partes de la Patagonia, pero hechos en nuestro taller" 
            products={relojes}
            />
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const relojes = await getProductCategory('relojes');
    const props = { relojes }
    return { props }
}

Relojes.nav = <Nav theme="scrolled" whiteFooter={true} />
Relojes.footer = <Footer theme="white" />

export default Relojes;