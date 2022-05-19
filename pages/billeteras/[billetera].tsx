import { useCallback, useState } from 'react'
import { NextPageAugmented, ProductType } from 'types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { capitalize } from '@/utils/index'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { motion, AnimatePresence } from 'framer-motion';
import Recommended, {TRecommended} from '@/components/modules/Recommended/Recommended'
import Nav from '@/components/modules/Nav/Nav'
import FixedProductCta from '@/components/modules/FixedProductCta/FixedProductCta'
import AssetAndText from '@/components/modules/AssetAndText/AssetAndText';
import TopProductSection from '@/components/modules/TopProductSection/TopProductSection'
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../styles/Billetera.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
SwiperCore.use([Pagination]);

const recommendedProducts:TRecommended[] = [
    {name: 'chocolate', image: '/billeteras/chocolate/recommended.webp', href: '/billeteras/chocolate', price: '$3.950'},
    {name: 'suela', image: '/billeteras/suela/recommended.webp', href: '/billeteras/suela', price: '$3.950'},
    {name: 'quemanta', image: '/relojes/quemanta/recommended.webp', href: '/relojes/quemanta', price: '$10.950'},
]

const Billetera:NextPageAugmented<{billetera: string}> = ({billetera}) => {
    
    const [showFixedCta, setShowFixedCta] = useState<boolean>(false)
    const imgs = [1,2,3,4].map((item)=> `/billeteras/${billetera}/billetera-cuero-genuino-${item}.webp`)
    const product:ProductType = {
        name: billetera,
        price: 3950,
        description: 'Texto corto de descripción del modelo, cual es el diferencial.'
    }

    return (
        <>
        <Head>
            <title>{capitalize(billetera)} | Billeteras | Lengas</title>
        </Head>
        <div className={styles.Billetera}>
            <FixedProductCta product={product} show={showFixedCta} />
            <TopProductSection imgs={imgs} product={product} onCtaIntersect={(isIntersecting)=>setShowFixedCta(!isIntersecting)} />
            <div className='container'>
                <AssetAndText 
                title="Una nueva forma de llevarlo todo" 
                description="Ser feliz es simple, ser simple no tanto. Proponemos una billetera que viene a instaurar un andar más sencillo." 
                asset={`/billeteras/${billetera}/billetera-en-uso.webp`} 
                assetLeft={false} />
            </div>
            <CarrouselSection billetera={billetera} />
            <div className="container">    
                <AssetAndText 
                title="La simpleza de Lengas en una billetera" 
                description="Creemos en un consumo responsable, esto nos lleva a crear con propósito. Este taquito de madera lenga no solo es el responsable de hacer llegar tu billetera en perfectas condiciones. Sino que viene a dar un toque único, estética y funcionalmente, dentro de tu hogar." 
                asset={`/billeteras/${billetera}/billetera-en-uso.webp`} 
                />
                <AssetAndText 
                title="Creado con propósito" 
                description="Creemos en un consumo responsable, esto nos lleva a crear con propósito. Este taquito de madera lenga no solo es el responsable de hacer llegar tu billetera en perfectas condiciones. Sino que viene a dar un toque único, estética y funcionalmente, dentro de tu hogar." 
                asset={`/billeteras/${billetera}/billetera-en-uso.webp`} 
                assetLeft={false} 
                />
            </div>
            <WalletSpecs />
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
    return (
        <section className={styles.WalletSpecs}>
            <div>
                <Image src="/billeteras/specs.webp" width={1200} height={571} />
            </div>
        </section>
    )
}

const CarrouselSection:React.FC<{billetera:string}> = ({billetera}) => {

    const router = useRouter()
    const colors:string[] = ['Chocolate', 'Suela', 'Boom']
    const slides = [1,2,3].map((item)=> `/billeteras/${billetera}/billetera-artesanal-${item}.webp`)
    const [hoveringOn, setHoveringOn] = useState<string>("")

    const transitioning = useCallback(()=>{
        return hoveringOn.toLocaleLowerCase() !== "" && hoveringOn.toLocaleLowerCase() !== billetera
    }, [hoveringOn, billetera])

    return (
        <section className={styles.CarrouselSection}>
            <div className={styles.text}>
                <div>
                    <h3>Lo que nos define son nuestras elecciones</h3>
                    <p>Hicimos billeteras que se ajusten a distintas estilos de vida. Deslizá para descubrir cuál es la indicada para vos.</p>
                    <div className={styles.toggler}>
                        <div className={styles.colors}>
                            {colors.map((color)=>
                                <div 
                                className={`${styles.color} ${styles[`color-${color.toLocaleLowerCase()}`]}`} 
                                key={color}
                                onMouseEnter={()=>setHoveringOn(color)}
                                onMouseLeave={()=>setHoveringOn("")}
                                onClick={()=>router.push({
                                    pathname: `/billeteras/${color.toLocaleLowerCase()}`,
                                  }, undefined, { scroll: false })}
                                >
                                    <div></div>
                                </div>
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
            <div className={styles.carrousel}>
            <Swiper 
            pagination={true}
            slidesPerView={1.2}
            spaceBetween={15}
            className="CarrouselSection">
                {slides.map((slide, i)=>
                    <SwiperSlide key={i}>
                        <Image src={slide} height={600} width={522} />
                    </SwiperSlide>
                )}
            </Swiper>
            </div>
        </section>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
          { params: { billetera: 'chocolate' } },
          { params: { billetera: 'suela' } },
          { params: { billetera: 'boom' } },
        ],
        fallback: true
      };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { billetera } = context.params as IParams 
    // const props = fetch(`/api/${billetera}`)
    const props = {billetera}
    return { props }
}

Billetera.nav = <Nav theme="scrolled" />

export default Billetera;