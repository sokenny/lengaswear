import { NextPageAugmented, ProductType } from "types";
import ProductCategory from '@/components/layouts/ProductCategory/ProductCategory';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

const relojes:ProductType[] = [
    {name: 'Quemanta', price: 10900, href: "/relojes/quemanta", image: "/relojes/quemanta/thumbnail.webp"},
    {name: 'Jauke', price: 10900, href: "/relojes/jauke", image: "/relojes/jauke/thumbnail.webp"},
    {name: 'Tesh', price: 10900, href: "/relojes/tesh", image: "/relojes/tesh/thumbnail.webp"},
    {name: 'Mahai', price: 10900, href: "/relojes/mahai", image: "/relojes/mahai/thumbnail.webp"},
]

const Relojes:NextPageAugmented = () => {
    return (
        <ProductCategory 
        title="Nuestros Relojes" 
        description="Podría ir, o no, un texto más aca diciendo tipo todos de maderas de distintas partes de la Patagonia, pero hechos en nuestro taller" 
        products={relojes}
        />
    )
}

Relojes.nav = <Nav theme="scrolled" whiteFooter={true} />
Relojes.footer = <Footer theme="white" />

export default Relojes;