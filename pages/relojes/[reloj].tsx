import { useEffect, useRef, useState } from 'react'
import { NextPageAugmented, ProductType } from 'types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useAppContext } from "contexts/AppContext";
import { getProduct, getProducts } from 'api';
import { useOnScreen, capitalize, getMotionProps } from '@/utils/index'
import { ANIMATE_BREAKPOINT } from '@/utils/constants'
import { motion } from 'framer-motion'
import { ParsedUrlQuery } from 'querystring'
import { ProcessVideoAsset } from 'pages';
import Image from 'next/image';
import Head from 'next/head';
import Nav from '@/components/modules/Nav/Nav'
import Footer from '@/components/modules/Footer/Footer'
import FixedProductCta from '@/components/modules/FixedProductCta/FixedProductCta'
import AssetAndText from '@/components/modules/AssetAndText/AssetAndText';
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import TopProductSection from '@/components/modules/TopProductSection/TopProductSection'
import Recommended, {TRecommended} from '@/components/modules/Recommended/Recommended'
import styles from '../../styles/Reloj.module.scss'

const recommendedProducts:TRecommended[] = [
    {name: 'mahai', image: '/relojes/mahai/recommended.webp', href: '/relojes/mahai', price: 10000},
    {name: 'jauke', image: '/relojes/jauke/recommended.webp', href: '/relojes/jauke', price: 10000},
    {name: 'billetera suela', image: '/billeteras/suela/recommended.webp', href: '/billeteras/suela', price: 10000},
]

const Reloj:NextPageAugmented<{relojName: string}> = ({relojName}) => {

    const reloj = {
        id: 1,
        name: relojName,
        price: 10900,
        sellingPrice: 10900,
        description: 'Texto corto de descripción del modelo, cual es el diferencial.',
        href: ""
    }
   
    const { addToCart } = useAppContext()
    const [showFixedCta, setShowFixedCta] = useState<boolean>(false)
    const imgs = [1,2,3,4].map((item)=> `/relojes/${reloj.name}/reloj-de-madera-artesanal-${reloj.name}-${item}.webp`)
    const addThisToCart = () => addToCart(reloj.name)

    return (
        <>
        <Head>
            <title>{capitalize(reloj.name)} | Relojes | Lengas</title>
        </Head>
        <div className={styles.Reloj}>
            <FixedProductCta product={reloj} show={showFixedCta} addToCart={addThisToCart} />
            <TopProductSection imgs={imgs} product={reloj} onCtaIntersect={(isIntersecting)=>setShowFixedCta(!isIntersecting)} addToCart={addThisToCart} />
            <div className='container'>
                <AssetAndText title="Tratamiento natural y artesanal" description="Le damos muchisima importancia al tratamiento que adoptamos para el cuidado de la madera. Totalmente libre de quimicos nocivos. Aplicamos un acabado de aceites vegetales y lino." asset={<ProcessVideoAsset />} ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} assetLeft={false} />
            </div>
            <div className={styles.Reloj__slightGray}>
                <div className='container'>
                    <SuiGeneris reloj={reloj.name} />
                    <div className={styles.Reloj__overlapSections}>
                        <AssetAndText title="La función en la simplicidad" description="Un reloj que mantiene el cuadrante, bisel y caja unidos en una pieza pura e íntegra. Logrando un frente que enamora." asset={<WatchPartAsset img={`/relojes/${reloj.name}/cuadrante.webp`} />}  assetLeft={false} />
                        <AssetAndText title="Aluminio aeroespacial" description="Una fina base de aluminio anodizado le da el toque de clase y elegancia a la pieza. Le otorga frescura a la muñeca y mayor durabilidad." asset={<WatchPartAsset img={`/relojes/tapa-aluminio.webp`} />} />
                        <AssetAndText title="Pieza ultra ligera" description="Ligero e ingravido, con un peso de tan solo 22grs. Lo suficiente para que no moleste en la muñeca, pero lo necesario para sentirlo parte de tu cuerpo." asset={<WatchPartAsset img={`/relojes/${reloj.name}/ligero.webp`} />}  assetLeft={false} />
                        <AssetAndText title="Hacemos más con menos" description="Queríamos avanzar hacia la simplicidad total, un matrimonio eficiente de forma y función. Replanteando completamente el concepto de hebillas." asset={<WatchPartAsset img={`/relojes/${reloj.name}/correas.webp`} />} />
                    </div>
                </div>
            </div>
            <WatchSpecs />
            <div className="container">
                <Recommended products={recommendedProducts} />
            </div>
        </div>
        </>
    )
}

const WatchPartAsset:React.FC<{img:string}> = ({img}) => {
    const divRef = useRef(null)
    const isIntersecting = useOnScreen(divRef, ANIMATE_BREAKPOINT*.8);
    const [cursor, setCursor] = useState<{x: number, y:number}>({x: 0, y: 0})
    return (
        <div 
        className={styles.WatchPartAsset}
        onMouseMove={(e)=>setCursor({x: e.clientX, y: e.clientY})}
        >
            <motion.div
            ref={divRef}
            initial={{scale: 1.4}}
            animate={isIntersecting && {scale: 1.1}}
            transition={{duration: 1.5}}
            style={{y: -cursor.y / 45, x: -cursor.x / 45}}
            >
                <Image src={img} layout="fill" objectFit="contain" alt="Watch part" />
            </motion.div>
        </div>
    )
}

export const TitleWDescription:React.FC<{title:string, description:string}> = ({title, description}) => {
    return (
        <div className={styles.TitleWDescription}>
            <h2>{title}</h2>
            <div>{description}</div>
        </div>
    )
}
    
interface IParams extends ParsedUrlQuery {
    reloj: string
}

const SuiGeneris:React.FC<{reloj:string}> = ({reloj}) => {

    const [hovering, setHovering] = useState<string>("")
    const materials = ['cristal', 'madera', 'aluminio']
    const divRef = useRef<HTMLDivElement>(null)
    const isIntersecting = useOnScreen(divRef, ANIMATE_BREAKPOINT)
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;

    function getMaterialImg(material:string) {
        return material === 'madera' ? `/relojes/${reloj}/${material}.png` : `/relojes/${material}.png`
    }

    return (
        <section className={styles.SuiGeneris}>
            <div>
                <DisAssembly reloj={reloj} hovering={hovering} />
            </div>
            <div ref={divRef}>
                <TitleWDescription 
                title="No dejamos nada al azar" 
                description="Representando todos los valores que Lengas simboliza. Como la transparencia, la sustentabilidad y la simplicidad." 
                />
                <div className={styles.SuiGeneris__materiales}>
                    <div>
                        {materials.map((material, i)=>
                            <motion.div 
                            className={`${styles.SuiGeneris__material} ${styles[`SuiGeneris__material-${material}`]}`}  
                            onMouseEnter={()=>setHovering(material)} 
                            onMouseLeave={()=>setHovering("")} 
                            style={{backgroundImage: `url('${getMaterialImg(material)}')`}}
                            key={material} 
                            {...getMotionProps("slideUp", hasIntersected.current, {delay: .5 + (.1 * i), duration: .75})}
                            />
                        )}
                    </div>
                    <div>Materiales que te van a encantar</div>
                </div>
            </div>
        </section>
    )
}

const DisAssembly:React.FC<{reloj: string, hovering?:string}> = ({reloj, hovering}) => {

    const divRef = useRef<HTMLDivElement>(null)
    const onScreen = useOnScreen(divRef, ANIMATE_BREAKPOINT)
    const [float, setFloat] = useState<boolean>(false)

    useEffect(()=>{
        if(onScreen){
            const timeoutId:ReturnType<typeof setTimeout>  = setTimeout(()=>{
                setFloat(true)
            }, 1700)
            return ()=>clearTimeout(timeoutId)
        }
    }, [onScreen])

    return (
        <div className={`${styles.DisAssembly} ${float ? styles['DisAssembly-float'] : ''}`} ref={divRef}>
            <motion.div 
            className={hovering !== '' && hovering !== 'cristal' ? styles['DisAssembly__piece-notHovered'] : ''}
            initial={{y: 0}}
            animate={onScreen && {y: -80}}
            transition={{duration: 1.5, ease: "easeOut"}}
            >
                <img src='/relojes/cristal.webp' />
            </motion.div>
            <div className={hovering !== '' && hovering !== 'madera' ? styles['DisAssembly__piece-notHovered'] : ''}>
                <img src={`/relojes//${reloj}/mecanizado.webp`} />
            </div>
            <motion.div 
            className={hovering !== '' && hovering !== 'aluminio' ? styles['DisAssembly__piece-notHovered'] : ''}
            initial={{y: 0}}
            animate={onScreen && {y: 80}}
            transition={{duration: 1.5, ease: "easeOut"}}
            >
                <img src='/relojes/tapa.webp' />
            </motion.div>
        </div>
    )
}

const WatchSpecs:React.FC = () => {

    const divRef1 = useRef<HTMLDivElement>(null)
    const isIntersecting = useOnScreen(divRef1, ANIMATE_BREAKPOINT)
    const divRef2 = useRef<HTMLDivElement>(null)
    const isIntersecting2 = useOnScreen(divRef2, ANIMATE_BREAKPOINT)
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;
    const hasIntersected2 = useRef(false)
    if(isIntersecting2 && !hasIntersected2.current) hasIntersected2.current = true;

    const specs = [
        [{label: 'Correas', value: 'Cuero genuino marron'},
        {label: 'Vidro', value: 'Cristal mineral'}],
        [{label: 'Dorso', value: 'Aluminio anodizado'},
        {label: 'Espesor', value: '9.8mm'}],
        [{label: 'Madera', value: 'Guayubira'},
        {label: 'Peso', value: '22grs'}],
        [{label: 'Rango muñeca', value: '16.3 - 21.1cm'},
        {label: 'Movimiento', value: 'Epson Y121E'}],
    ]

    return (
        <section className={styles.WatchSpecs}>
            <motion.div 
            className={styles.WatchSpecs__asset}
            {...getMotionProps("slideUp", hasIntersected.current)}
            ref={divRef1}
            >
                <img src="/relojes/specs.webp" alt="Watch specs" />
            </motion.div>
            <motion.div 
            className={styles.WatchSpecs__specs}
            {...getMotionProps("slideUp", hasIntersected2.current)}
            ref={divRef2}
            >
                <h2>Especificaciones</h2>
                <div>
                    {specs.map((specRow, i)=>
                        <div className={styles.WatchSpecs__specRow} key={i}>
                            {specRow.map((spec)=>
                                <div className={styles.WatchSpecs__spec} key={spec.label}>
                                    <div>{spec.label}</div>
                                    <div>{spec.value}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // return {
    //     paths: [
    //       { params: { reloj: 'quemanta' } },
    //       { params: { reloj: 'tesh' } },
    //       { params: { reloj: 'jauke' } },
    //       { params: { reloj: 'mahai' } },
    //     ],
    //     fallback: true
    //   }

    const res = await getProducts('relojes')
    const paths = res.data.products.map((reloj:ProductType)=>({params: {reloj: reloj.name.toLocaleLowerCase()}}))
    return {
        paths,
        fallback: false
      };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { reloj } = context.params as IParams 
    const props = {relojName:reloj}
    return { props }

    // const { reloj } = context.params as IParams 
    // const res = await getProduct('relojes', reloj)
    // const product = {...res.data.product}
    // const props = { reloj:product }
    // return { props, revalidate: 1 }
}

Reloj.nav = <Nav theme="scrolled" />
Reloj.footer = <Footer />

export default Reloj;