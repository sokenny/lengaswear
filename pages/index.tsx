import { NextPage } from "next"
import { useState, useRef, useEffect } from "react";
import { useOnScreen, scrollTo } from "@/utils/index";
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
    {stars: 5, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Jose Gutierrez", location: "Buenos Aires, Argentina"},
    {stars: 3, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Lucas Martinez", location: "Buenos Aires, Argentina"},
]

const Home: NextPage = () => {

    const productsRef = useRef(null)

    return (
        <div className={styles.Home}>
            <HeroBanner title="artesanales" subtitle="Piezas de tiempo" cta="Ver productos" image="/home-banner.webp" onClick={()=>scrollTo(productsRef)} />
            <div className="container" ref={productsRef}>
                <FeaturedCategories />
                <StoreInfo />
                <AssetAndText title="Hecho acá, por nosotros" description="Aca escribir un texto, tipo intro a algun tema mas desarrollado en la parte de nosotros/historia, sobre el proceso de producción contando valores de lengas. Talvez de la historia de lengas o los relojes." asset={<ProcessVideoAsset />} ctaSection={<ArrowCta cta={"Leer mas"} color="gray" />} />
            </div>
            <HeroStripe 
            title="Plantas un árbol" 
            description={<>En conjunto con la fundacion ReforestArg estamos ayudando a restaurar areas degradadas de Patagonia.</>}
            cta="Leer más" 
            image="/bosque-de-lengas.webp" 
            extraText={<>Empezamos con un concepto muy romántico y ambicioso. Por cada compra plantamos un árbol. Al día de hoy donamos el 5% de cada compra a la reforestación de bosques nativos. Esto promedia alrededor de 1 árbol cada 3 ventas. Conocé a la fundación que hace todo esto posible: <a href="https://www.reforestarg.org.ar/" target="_blank" rel="noreferrer" style={{fontWeight: 500}} >ReforestArg.</a></>}
            />
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

export const ProcessVideoAsset:React.FC = () => {
    const videoRef = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(videoRef);
    const [src, setSrc] = useState<string>("");
    useEffect(()=>{
        if(isOnScreen && src === "") setSrc("/relojes/process.mp4")
    }, [isOnScreen])
    return (
        <div className={styles.ProcessVideoAsset} data-component="ProcessVideoAsset" ref={videoRef}>
            <video src={src} poster="/relojes/process-placeholder.webp" autoPlay muted loop></video>
        </div>
    )
}

export default Home;