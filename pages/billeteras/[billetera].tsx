import { useCallback, useEffect, useState, useRef } from 'react'
import { AugmentedSwiperProps, NextPageAugmented, ProductType } from 'types'
import { getProductPaths, getProduct } from '@/utils/db';
import { GetStaticPaths, GetStaticProps } from 'next'
import { useAppContext } from "contexts/AppContext";
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import { capitalize, colors as utilityColors, scrollTo, useIsMobile, useOnScreen, getMotionProps } from '@/utils/index'
import { WalletHTML }  from '@/utils/wallet'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import Recommended from '@/components/modules/Recommended/Recommended'
import Nav from '@/components/modules/Nav/Nav'
import FixedProductCta from '@/components/modules/FixedProductCta/FixedProductCta'
import AssetAndText from '@/components/modules/AssetAndText/AssetAndText';
import TopProductSection from '@/components/modules/TopProductSection/TopProductSection'
import Footer from '@/components/modules/Footer/Footer';
import PropositoCarrousel from '@/components/modules/PropositoCarrousel/PropositoCarrousel';
import styles from '../../styles/Billetera.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import ColoresCarrousel from '@/components/modules/ColoresCarrousel/ColoresCarrousel';
SwiperCore.use([Pagination, Autoplay]);

const recommendedProducts = ["quemanta", "tesh", "jauke"]

const Billetera:NextPageAugmented<{billetera: ProductType}> = ({billetera}) => {
    
    const isMobile = useIsMobile()
    const { addToCart } = useAppContext()
    const [showFixedCta, setShowFixedCta] = useState<boolean>(false)
    const imgs = [1,2,3,4].map((item)=> `/billeteras/${billetera.name}/billetera-cuero-genuino-${item}${isMobile && item === 1 ? '-mobile' : ''}.webp`)
    const addThisToCart = () => addToCart(billetera.name)
    const specsRef = useRef<HTMLDivElement>(null)

    return (
        <>
        <Head>
            <title>{capitalize(billetera.name)} | Billeteras | Lengas</title>
        </Head>
        <div className={styles.Billetera}>
            <FixedProductCta product={billetera} show={showFixedCta} addToCart={addThisToCart} />
            <TopProductSection imgs={imgs} product={billetera} onCtaIntersect={(isIntersecting)=>setShowFixedCta(!isIntersecting)} addToCart={addThisToCart} onViewSpecs={()=>scrollTo(specsRef, -100)} />
            <div className='container'>
                <AssetAndText 
                title="Una nueva forma de llevarlo todo" 
                description="Ser feliz es simple, ser simple no tanto. Proponemos una billetera que viene a instaurar un andar más sencillo." 
                asset={`/billeteras/billetera-en-uso.webp`} 
                assetLeft={false} />
            </div>
            <CarrouselSection billetera={billetera.name} />
            <div className={`container ${styles.Billetera__containsCarrousel}`}>    
                <AssetAndText 
                title="Colores de la Patagonia" 
                description="Manteniéndonos dentro de la impronta Lengas lanzamos estos 3 colores que vienen a conectar con la Patagonia." 
                asset={`/billeteras/simpleza.webp`} 
                />
                <AssetAndText 
                title="Creado con propósito" 
                description="Creemos en un consumo responsable, esto nos lleva a crear con propósito. Este taquito de madera lenga no solo es el responsable de hacer llegar tu billetera en perfectas condiciones. También viene a dar un toque único dentro de tu hogar." 
                asset={<PropositoCarrousel />} 
                assetLeft={false} 
                />
            </div>
            <div ref={specsRef}>
                <WalletSpecs />
            </div>
            <div className="container">
                <Recommended products={recommendedProducts} />
            </div>
        </div>
        </>
    )
}
    
interface IParams extends ParsedUrlQuery {
    billetera: string
}

const WalletSpecs:React.FC = () => {

    const isMobile = useIsMobile();
    const rotatorRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const isIntersecting = useOnScreen(containerRef, ANIMATE_BREAKPOINT)
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;
    const [rotate, setRotate] = useState<boolean>(false)
    const centerSection = useCallback(()=>{
        scrollTo(rotatorRef, !rotate ? 0 : -250)
    }, [rotatorRef, rotate])    

    return (

        <section className={`${styles.WalletSpecs} ${rotate ? styles[`WalletSpecs-rotated`] : ''}`}>
            <motion.div
            {...getMotionProps("slideVertical", hasIntersected.current)}
            transition={{duration: 1}}
            ref={containerRef}
            >
                <motion.div 
                className={styles.rotator}
                onClick={isMobile ? ()=>{setRotate(!rotate), centerSection()} : undefined}
                animate={rotate ? {height: "800px"} : {}}
                transition={{duration: .5}}
                ref={rotatorRef}
                >
                    <motion.div
                    animate={rotate ? {rotate: -90, width: "600px"} : {rotate: 0}}
                    transition={{duration: .5}}
                    >
                        <motion.div 
                        style={{width: "100%"}}
                        animate={rotate ? {width: "600px"} : {}}
                        dangerouslySetInnerHTML={{__html: WalletHTML}}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

const CarrouselSection:React.FC<{billetera:string}> = ({billetera}) => {

    const router = useRouter()
    const isMobile = useIsMobile();
    const titleRef = useRef<HTMLDivElement>(null)
    const carrouselRef = useRef<HTMLDivElement>(null)
    const colors:string[] = ['Chocolate', 'Suela', 'Boom']
    const [hoveringOn, setHoveringOn] = useState<string>("")
    const titleIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT)     
    const hasIntersected = useRef(false)

    if(titleIntersecting && !hasIntersected.current) hasIntersected.current = true;

    const transitioning = useCallback(()=>{
        return hoveringOn?.toLocaleLowerCase() !== "" && hoveringOn?.toLocaleLowerCase() !== billetera
    }, [hoveringOn, billetera])

    function getHexColor(color:string){
        return utilityColors[color?.toLocaleLowerCase() as keyof {}]
    }

    return (
        <section className={styles.CarrouselSection}>
            <div className={styles.text}>
                <div>
                    <motion.h3
                    ref={titleRef}
                    {...getMotionProps("slideVertical", hasIntersected.current)}
                    >
                        Lo que nos define son nuestras elecciones
                    </motion.h3>
                    <motion.p
                    {...getMotionProps("slideVertical", hasIntersected.current, {delay: .2})}
                    >
                        Hicimos billeteras que se ajusten a distintas estilos de vida. Deslizá para descubrir cuál es la indicada para vos.
                    </motion.p>
                    <div className={styles.toggler}>
                        <div className={styles.colors}>
                            {colors.map((color, i)=>
                                <motion.div 
                                className={`${styles.color} ${styles[`color-${color?.toLocaleLowerCase()}`]} ${billetera?.toLocaleLowerCase() === color?.toLocaleLowerCase() ? styles[`color-selected`] : ''}`} 
                                {...getMotionProps("slideVertical", hasIntersected.current, {delay: .1 + (.2 * i), duration: .75})}
                                onMouseEnter={()=>setHoveringOn(color)}
                                onMouseLeave={()=>setHoveringOn("")}
                                onClick={()=>{
                                    router.push({ pathname: `/billeteras/${color?.toLocaleLowerCase()}`, }, undefined, { scroll: false });
                                    isMobile && scrollTo(carrouselRef, -200);
                                }}
                                style={{backgroundColor: getHexColor(color)}}
                                key={color}
                                >
                                    <div style={{borderColor: getHexColor(color)}}></div>
                                </motion.div>
                            )}
                        </div>
                        <div className={styles.activeColor}>
                            <span>Color:</span> 
                            <div>
                                <AnimatePresence>
                                {transitioning() &&
                                <motion.div initial={{y: -30}} animate={{y: -5}}>{hoveringOn}</motion.div>
                                }
                                </AnimatePresence>
                                <motion.div animate={transitioning() ? {y: 20, opacity: .3} : {y: 0}}>{capitalize(billetera)}</motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={carrouselRef}>
                <ColoresCarrousel billetera={billetera} />            
            </div>
        </section>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getProductPaths('billeteras', 'billetera')
    return {
        paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { billetera } = context.params as IParams 
    const product = await getProduct(billetera)
    const props = { billetera: product }
    return { props }
}

Billetera.nav = <Nav theme="scrolled" />
Billetera.footer = <Footer />

export default Billetera;