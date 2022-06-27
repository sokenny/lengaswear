import { NextPageAugmented, ProductType } from "types";
import { GetStaticProps } from 'next';
import { getProductCategory } from "@/utils/db";
import Head from "next/head";
import ProductCategory from '@/components/layouts/ProductCategory/ProductCategory';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

const Billeteras:NextPageAugmented<{billeteras: ProductType[]}> = ({billeteras}) => {
    return (
        <>
            <Head>
                <title>Billeteras | Lengas Wear</title>
            </Head>
            <ProductCategory 
            title="Nuestras Billeteras" 
            description="Ser feliz es simple, ser simple no tanto. Nuestras billeteras vienen a proponer un andar más sencillo." 
            products={billeteras}
            />
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const billeteras = await getProductCategory('billeteras');
    const props = { billeteras }
    return { props }
}

Billeteras.nav = <Nav theme="scrolled" whiteFooter={true} />
Billeteras.footer = <Footer theme="white" />

export default Billeteras;