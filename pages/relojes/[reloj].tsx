import { useEffect, useRef, useState } from 'react'
import { NextPageAugmented, ProductType } from 'types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useOnScreen, capitalize } from '@/utils/index'
import { ParsedUrlQuery } from 'querystring'
import { ProcessVideoAsset } from 'pages';
import Head from 'next/head';
import Nav from '@/components/modules/Nav/Nav'
import FixedProductCta from '@/components/modules/FixedProductCta/FixedProductCta'
import AssetAndText from '@/components/modules/AssetAndText/AssetAndText';
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import TopProductSection from '@/components/modules/TopProductSection/TopProductSection'
import Recommended, {TRecommended} from '@/components/modules/Recommended/Recommended'
import styles from '../../styles/Reloj.module.scss'

const recommendedProducts:TRecommended[] = [
    {name: 'mahai', image: '/relojes/mahai/recommended.webp', href: '/relojes/mahai', price: '$10,000'},
    {name: 'jauke', image: '/relojes/jauke/recommended.webp', href: '/relojes/jauke', price: '$10,000'},
    {name: 'billetera suela', image: '/billeteras/suela/recommended.webp', href: '/billeteras/suela', price: '$10,000'},
]

const Reloj:NextPageAugmented<{reloj: string}> = ({reloj}) => {
    
    const imgs = [1,2,3,4].map((item)=> `/relojes/${reloj}/reloj-de-madera-artesanal-${reloj}-${item}.webp`)
    const product:ProductType = {
        name: reloj,
        price: 10900,
        description: 'Texto corto de descripción del modelo, cual es el diferencial.'
    }

    return (
        <>
        <Head>
            <title>{capitalize(reloj)} | Relojes | Lengas</title>
        </Head>
        <div className={styles.Reloj}>
            <FixedProductCta product={product} />
            <TopProductSection imgs={imgs} product={product} />
            <div className='container'>
                <AssetAndText title="Tratamiento natural y artesanal" description="Le damos muchisima importancia al tratamiento que adoptamos para el cuidado de la madera. Totalmente libre de quimicos nocivos. Aplicamos un acabado de aceites vegetales y lino." asset={<ProcessVideoAsset />} ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} assetLeft={false} />
            </div>
            <div className={styles.Reloj__slightGray}>
                <div className='container'>
                    <SuiGeneris reloj={reloj} />
                    <div className={styles.Reloj__overlapSections}>
                        <AssetAndText title="La función en la simplicidad" description="Un reloj que mantiene el cuadrante, bisel y caja unidos en una pieza pura e íntegra. Logrando un frente que enamora." asset={<WatchPartAsset img={`/relojes/${reloj}/cuadrante.webp`} />}  assetLeft={false} />
                        <AssetAndText title="Aluminio aeroespacial" description="Una fina base de aluminio anodizado le da el toque de clase y elegancia a la pieza. Le otorga frescura a la muñeca y mayor durabilidad." asset={<WatchPartAsset img={`/relojes/tapa-aluminio.webp`} />} />
                        <AssetAndText title="Pieza ultra ligera" description="Ligero e ingravido, con un peso de tan solo 22grs. Lo suficiente para que no moleste en la muñeca, pero lo necesario para sentirlo parte de tu cuerpo." asset={<WatchPartAsset img={`/relojes/${reloj}/ligero.webp`} />}  assetLeft={false} />
                        <AssetAndText title="Hacemos más con menos" description="Queríamos avanzar hacia la simplicidad total, un matrimonio eficiente de forma y función. Replanteando completamente el concepto de hebillas." asset={<WatchPartAsset img={`/relojes/${reloj}/correas.webp`} />} />
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
    return (
        <div className={styles.WatchPartAsset}>
            <img src={img} alt="Watch part" />
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

    return (
        <section className={styles.SuiGeneris}>
            <div>
                <DisAssembly reloj={reloj} hovering={hovering} />
            </div>
            <div>
                <TitleWDescription title="No dejamos nada al azar" description="Representando todos los valores que Lengas simboliza. Como la transparencia, la sustentabilidad y la simplicidad." />
                <div className={styles.SuiGeneris__materiales}>
                    <div>
                        {materials.map((material)=>
                            <div className={styles.SuiGeneris__material} onMouseEnter={()=>setHovering(material)} onMouseLeave={()=>setHovering("")} key={material}></div>
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
    const onScreen = useOnScreen(divRef)
    const [float, setFloat] = useState<boolean>(false)
    const [translate, setTranslate] = useState<boolean>(false)

    useEffect(()=>{
       let timeoutId:ReturnType<typeof setTimeout>
       if(onScreen && !translate){
           timeoutId = setTimeout(() => {
               setTranslate(true)
           }, 300);
       } 
       return ()=>clearTimeout(timeoutId)
    }, [onScreen])

    useEffect(()=>{
        const timeoutId:ReturnType<typeof setTimeout>  = setTimeout(()=>{
            setFloat(translate)
        }, 300)
        return ()=>clearTimeout(timeoutId)
    }, [translate])

    return (
        <div className={`${styles.DisAssembly} ${translate ? styles['DisAssembly-translate'] : ''} ${float ? styles['DisAssembly-float'] : ''}`} ref={divRef}>
            <div className={hovering !== '' && hovering !== 'cristal' ? styles['DisAssembly__piece-notHovered'] : ''}>
                <img src='/relojes/cristal.webp' />
            </div>
            <div className={hovering !== '' && hovering !== 'madera' ? styles['DisAssembly__piece-notHovered'] : ''}>
                <img src={`/relojes//${reloj}/mecanizado.webp`} />
            </div>
            <div className={hovering !== '' && hovering !== 'aluminio' ? styles['DisAssembly__piece-notHovered'] : ''}>
                <img src='/relojes/tapa.webp' />
            </div>
        </div>
    )
}

const WatchSpecs:React.FC = () => {

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
            <div className={styles.WatchSpecs__asset}>
                <img src="/relojes/specs.webp" alt="Watch specs" />
            </div>
            <div className={styles.WatchSpecs__specs}>
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
            </div>
        </section>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
          { params: { reloj: 'quemanta' } },
          { params: { reloj: 'tesh' } },
          { params: { reloj: 'jauke' } },
          { params: { reloj: 'mahai' } },
        ],
        fallback: true
      };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { reloj } = context.params as IParams 
    // const props = fetch(`/api/${reloj}`)
    const props = {reloj}
    return { props }
}

Reloj.nav = <Nav theme="scrolled" />

export default Reloj;