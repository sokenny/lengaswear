import { NextPageAugmented, ProductType } from "types";
import ProductCategory from '@/components/layouts/ProductCategory/ProductCategory';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

const billeteras:ProductType[] = [
    {name: 'Chocolate', price: 3950, href: "/billeteras/chocolate", image: "/billeteras/chocolate/thumbnail.webp"},
    {name: 'Suela', price: 3950, href: "/billeteras/suela", image: "/billeteras/suela/thumbnail.webp"},
    {name: 'Boom', price: 3950, href: "/billeteras/boom", image: "/billeteras/boom/thumbnail.webp"},
]

const Billeteras:NextPageAugmented = () => {
    return (
        <ProductCategory 
        title="Nuestras Billeteras" 
        description="Podría ir, o no, un texto más aca diciendo tipo todos de maderas de distintas partes de la Patagonia, pero hechos en nuestro taller" 
        products={billeteras}
        />
    )
}

Billeteras.nav = <Nav theme="scrolled" whiteFooter={true} />
Billeteras.footer = <Footer theme="white" />

export default Billeteras;