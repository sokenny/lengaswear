import { useEffect, useRef, useState, useMemo, ReactNode } from 'react'
import { NextPageAugmented } from 'types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useScrollPosition, useOnScreen } from '@/utils/index'
import { returns, shipping, safePurchase, safe } from "@/utils/icons";
import { ParsedUrlQuery } from 'querystring'
import Nav from '@/components/modules/Nav/Nav'
import Button from '@/components/elements/Button/Button'
import AssetAndText from '@/components/modules/AssetAndText/AssetAndText';
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from '../../styles/Reloj.module.scss'

const Reloj:NextPageAugmented<{reloj: string}> = ({reloj}) => {

    const scrollPosition = useScrollPosition()
    const lastPicRef = useRef()
    const picOnScreen = useOnScreen(lastPicRef)
    const [lockAt, setLockAt] = useState<number>(0)

    useEffect(()=>{
        if(lockAt === 0 && picOnScreen) setLockAt(scrollPosition);
    }, [scrollPosition, picOnScreen, lockAt])

    function shouldLockHeader():boolean{
        return (picOnScreen || scrollPosition > lockAt) && lockAt !== 0
    }

    return (
        <div className={styles.Reloj}>
            <section className={styles.Reloj__header}>
                <div className={styles.Reloj__topGallery}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div ref={lastPicRef}>
                        <div></div>
                        <div>
                            <TitleWDescription title="El tuyo es único" description="El veteado natural de cada pieza garantiza unicidad en el reloj. Cada reloj esta construido de manera artesanal y cada madera que utilizamos tiene sus propias vetas y propiedades por lo cual cada pieza de tiempo Lengas es unica." />
                        </div>
                    </div>
                </div>
                <div className={styles.Reloj__headerInfo} style={shouldLockHeader() ? {top: lockAt, position: "absolute"} : undefined}>
                    <div>
                        <h1>{reloj}</h1>
                        <div className={styles.Reloj__description}>
                            <div>Texto corto de descripción del modelo, cual es el diferencial.</div>
                            <div>Madera: <strong>Lenga</strong></div>
                            <div>Peso: <strong>22g</strong></div>
                        </div>
                        <div className={styles.Reloj__price}>$ 10.670</div>
                        <Button onClick={()=>{}}>Agregar al carrito</Button>
                        <div className={styles.Reloj__verMas}>
                            <div>Ver más características</div>
                            <div>Ver más detalles</div>
                        </div>
                        <PurchaseInfo />
                    </div>
                </div>
            </section>
            <div className='container'>
                <AssetAndText title="Tratamiento natural y artesanal" description="Le damos muchisima importancia al tratamiento que adoptamos para el cuidado de la madera. Totalmente libre de quimicos nocivos. Aplicamos un acabado de aceites vegetales y lino." image="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} assetLeft={false} />
            </div>
            <div className={styles.Reloj__slightGray}>
                <div className='container'>
                    <section className={styles.Reloj__azar}>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <TitleWDescription title="No dejamos nada al azar" description="Representando todos los valores que Lengas simboliza. Como la transparencia, la sustentabilidad y la simplicidad." />
                        </div>
                    </section>
                    <div className={styles.Reloj__overlapSections}>
                        <AssetAndText title="La función en la simplicidad" description="Un reloj que mantiene el cuadrante, bisel y caja unidos en una pieza pura e íntegra. Logrando un frente que enamora." image="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} />
                        <AssetAndText title="Acero aeroespacial" description="Una fina base de aluminio anodizado le da el toque de clase y elegancia a la pieza. Le otorga frescura a la muñeca y mayor durabilidad." image="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} assetLeft={false} />
                        <AssetAndText title="Pieza ultra ligera" description="Ligero e ingravido, con un peso de tan solo 22grs. Lo suficiente para que no moleste en la muñeca, pero lo necesario para sentirlo parte de tu cuerpo." image="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} />
                        <AssetAndText title="Hacemos más con menos" description="Queríamos avanzar hacia la simplicidad total, un matrimonio eficiente de forma y función. Replanteando completamente el concepto de hebillas." image="/asset-placeholder.webp" ctaSection={<ArrowCta cta={"Leer mas sobre el proceso"} color="gray" />} assetLeft={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const PurchaseInfo:React.FC = () => {
    
    const items:{icon:ReactNode, text: string}[] = useMemo(()=>[
        {icon: returns(20, "gray"), text: 'hasta 7 dias despues de tu compra.'},
        {icon: shipping(20, "gray"), text: 'a todo el país.'},
        {icon: safePurchase(20, "gray"), text: 'mediante Mercadopago, Paypal o GooglePay.'},
        {icon: safe(20, "gray"), text: 'por 12 meses en caso de cualquier falla.'},
    ], [])

    return (
        <div className={styles.PurchaseInfo}>
            {items.map((item)=>
                <div className={styles.PurchaseInfo__item}>
                    <div>{item.icon}</div>
                    <div>{item.text}</div>
                </div>
            )}
        </div>
    )
} 

const TitleWDescription:React.FC<{title:string, description:string}> = ({title, description}) => {
    
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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
          { params: { reloj: 'quemanta' } },
          { params: { reloj: 'tesh' } },
          { params: { reloj: 'jauke' } },
          { params: { reloj: 'mahai' } },
        ],
        fallback: true // false or 'blocking'
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