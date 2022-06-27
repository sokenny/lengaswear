import { NextPage } from "next"
import { useState, useRef, useEffect } from "react";
import { useOnScreen, scrollTo, useIsMobile } from "@/utils/index";
import { TestimonialsType } from "types";
import { useAppContext } from "contexts/AppContext";
import ArrowCta from "@/components/elements/ArrowCta/ArrowCta";
import HeroBanner from "@/components/modules/HeroBanner/HeroBanner";
import FeaturedCategories from "@/components/modules/FeaturedCategories/FeaturedCategories";
import AssetAndText from "@/components/modules/AssetAndText/AssetAndText";
import StoreInfo from "@/components/modules/StoreInfo/StoreInfo";
import HeroStripe from "@/components/modules/HeroStripe/HeroStripe";
import Gallery from "@/components/modules/Gallery/Gallery";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import Newsletter from "@/components/modules/Newsletter/Newsletter";
import VideoPlayer from "@/components/modules/VideoPlayer/VideoPlayer";
import BilleteraPromote from "@/components/modules/BilleteraPromote/BilleteraPromote";
import styles from '../styles/Home.module.scss';

const testimonials:TestimonialsType = [
    {stars: 4, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Martina Andrade", location: "Buenos Aires, Argentina"},
    {stars: 5, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Jose Gutierrez", location: "Buenos Aires, Argentina"},
    {stars: 3, quote: `"El reloj es divino. Me parece super fino y delicado. Y, lo que más me hace apreciarlo es la sencillez."`, name: "Lucas Martinez", location: "Buenos Aires, Argentina"},
]

const Home: NextPage = () => {

    const isMobile = useIsMobile();
    const productsRef = useRef(null)
    const { setModal } = useAppContext();
    const showVideo = () => setModal(<VideoPlayer src="/institucional.mp4" />)

    return (
        <div className={styles.Home}>
            <HeroBanner title="artesanales" subtitle="Piezas de tiempo" cta="Ver productos" image={`/banners/piezas-artesanales-2${isMobile ? '-mobile' : ''}.webp`} onClick={()=>scrollTo(productsRef, -50)} />
            <div className="container" ref={productsRef}>
                <FeaturedCategories />
                <BilleteraPromote />
                <StoreInfo />
                <AssetAndText title="Hecho acá, por nosotros" description="Aca escribir un texto, tipo intro a algun tema mas desarrollado en la parte de nosotros/historia, sobre el proceso de producción contando valores de lengas. Talvez de la historia de lengas o los relojes." asset={<ProcessVideoAsset />} ctaSection={<div onClick={showVideo}><ArrowCta cta={"Ver mas"} color="gray" /></div>} />
            </div>
            <HeroStripe 
            title="Plantas un árbol" 
            description={<>En conjunto con la fundacion ReforestArg estamos ayudando a restaurar areas degradadas de Patagonia.</>}
            cta="Leer más" 
            image="/bosque-de-lengas.webp" 
            extraText={<>Empezamos con un concepto muy romántico y ambicioso. Por cada compra plantamos un árbol. Al día de hoy donamos el 5% de cada venta a la reforestación de bosques nativos. Esto promedia alrededor de 1 árbol cada 3 productos vendidos. Conocé a la fundación que hace todo esto posible: <a href="https://www.reforestarg.org.ar/" target="_blank" rel="noreferrer" style={{fontWeight: 500}} >ReforestArg.</a></>}
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
            <video src={src} poster="/relojes/process-placeholder.webp" autoPlay muted loop playsInline></video>
        </div>
    )
}

export default Home;