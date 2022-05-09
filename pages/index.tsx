import { NextPage } from "next"
import ArrowCta from "@/components/elements/ArrowCta/ArrowCta";
import HeroBanner from "@/components/modules/HeroBanner/HeroBanner";
import FeaturedCategories from "@/components/modules/FeaturedCategories/FeaturedCategories";
import AssetAndText from "@/components/modules/AssetAndText/AssetAndText";
import StoreInfo from "@/components/modules/StoreInfo/StoreInfo";
import HeroStripe from "@/components/modules/HeroStripe/HeroStripe";
import Gallery from "@/components/modules/Gallery/Gallery";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import Newsletter from "@/components/modules/Newsletter/Newsletter";
import styles from '../styles/Home.module.scss';

export type TestimonialsType = {stars: number, quote: string, name: string, location: string}[]

const testimonials:TestimonialsType = [
    {stars: 4, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
    {stars: 5, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
    {stars: 3, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
]

const Home: NextPage = () => {
    return (
        <div className={styles.Home}>
            <HeroBanner title="artesanales" subtitle="Piezas de tiempo" cta="Ver productos" image="/home-banner.webp" />
            <div className="container">
                <FeaturedCategories />
                <StoreInfo />
                <AssetAndText title="Sustentable y artesanal" description="Aca escribir un texto, tipo intro a algun tema mas desarrollado en la parte de nosotros/historia, sobre el proceso de producción contando valores de lengas. Talvez de la historia de lengas o los relojes." asset="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas"} color="gray" />} />
            </div>
            <HeroStripe title="Plantas un árbol" description="Con tu compra, en conjunto con la fundacion ReforestArg estamos ayudando a restaurar areas degradadas de Patagonia." cta="Leer más" image="/bosque-de-lengas.webp" />
            <div className="container">
                <Gallery />
            </div>
            <Testimonials testimonials={testimonials} />
            <div className="container">
                <Newsletter />
            </div>
        </div>
    )
}

export default Home;