import { useRef, useState, useMemo, ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollPosition, useOnScreen, useIsMobile, formatNumber, getMotionProps, specs, productPageCopy } from '@/utils/index'
import { returns, shipping, safePurchase, safe } from "@/utils/icons";
import { ProductType, SpecType } from 'types';
import Image from 'next/image';
import { TitleWDescription } from 'pages/relojes/[reloj]';
import AddToCart from '@/components/elements/AddToCart/AddToCart';
import styles from './TopProductSection.module.scss';
import ColoresCarrousel from '../ColoresCarrousel/ColoresCarrousel';

type TopProductSectionProps = {
    product: ProductType,
    imgs: string[],
    onCtaIntersect: (isIntersecting: boolean) => void,
    addToCart: () => boolean,
    onViewSpecs?: ()=>void
}

const TopProductSection:React.FC<TopProductSectionProps> = ({imgs, product, onCtaIntersect, addToCart, onViewSpecs}) => {

    const isMobile = useIsMobile();
    const scrollPosition = useScrollPosition()
    const lastPicRef = useRef<HTMLDivElement>(null)
    const picOnScreen = useOnScreen(lastPicRef)
    const ctaRefMobile = useRef<HTMLDivElement>(null)
    const ctaRefDesktop = useRef<HTMLDivElement>(null)
    const ctaOnScreen = useOnScreen(isMobile ? ctaRefMobile : ctaRefDesktop)
    const [lockAt, setLockAt] = useState<number>(0)
    const thisSpecs:SpecType[] = specs.filter((spec)=>spec.products.includes(product.name))

    useEffect(()=>{
        onCtaIntersect(ctaOnScreen)
    }, [onCtaIntersect, ctaOnScreen, isMobile])

    useEffect(()=>{
        if(lastPicRef.current !== null){
            const lockPosition:number = window.pageYOffset + lastPicRef.current.getBoundingClientRect().top - window.innerHeight
            if((lockAt === 0 && picOnScreen) || window.pageYOffset >= lockPosition) setLockAt(lockPosition);
        }
    }, [scrollPosition, picOnScreen, lockAt])

    function shouldLockHeader():boolean{
        return (picOnScreen || scrollPosition > lockAt) && lockAt !== 0
    }

    return (
            <section className={styles.TopProductSection}>
                <div className={styles.TopProductSection__gallery}>
                    {product.category === 'billeteras' &&
                    <div style={{border: "1px solid rgba(0,0,0,0.1)"}}>
                        <ColoresCarrousel billetera={product.name} />
                    </div>
                    }
                    {imgs.slice(product.category === 'billeteras' ? 1 : 0, 3).map((img, i)=>
                        <div key={img}>
                            {i === 0 && product.category !== 'billeteras' && <TopMobileInfo product={product} ctaRef={ctaRefMobile} specs={thisSpecs} addToCart={addToCart} /> }
                            <Image src={img} layout="fill" objectFit='cover' key={img} alt={product.name} />
                        </div>
                    )}
                    <div ref={lastPicRef}>
                        <div>
                            <Image src={imgs[3]} layout="fill" objectFit='cover' alt={product.name} />
                        </div>
                        <div>
                            <TitleWDescription 
                            title={productPageCopy[product.category][product.name][0].title}
                            description={productPageCopy[product.category][product.name][0].description}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.TopProductSection__headerInfo} desktop`} style={shouldLockHeader() ? {top: lockAt, position: "absolute"} : undefined}>
                    <div>
                        <motion.div
                        ref={ctaRefDesktop}
                        {...getMotionProps("slideVertical", true)}
                        >
                            <h1>{product.name}</h1>
                            <div className={styles.TopProductSection__description}>
                                <div>{product.description}</div>
                                {thisSpecs.map((spec)=>
                                    <div key={spec.label}>{spec.label}: <strong>{spec.value}</strong></div>
                                )}
                            </div>
                            {product.price === product.sellingPrice ? 
                            <div className={styles.TopProductSection__price}>${formatNumber(product.price)}</div>
                            :
                            <div className={styles.wDiscount}>
                                <div className={styles.price}>${formatNumber(product.price)}</div>
                                <div className={styles.sellingPrice}>${formatNumber(product.sellingPrice)}</div>
                            </div>
                            }
                            <AddToCart onClick={addToCart} product={product.name} />
                            <div className={styles.TopProductSection__verMas}>
                                <div onClick={onViewSpecs}>Ver especificaciones</div>
                            </div>
                        </motion.div>
                        <PurchaseInfo />
                    </div>
                </div>
            </section>
    )
}

const TopMobileInfo:React.FC<{product: ProductType, ctaRef:any, specs: SpecType[], addToCart:()=>boolean}> = ({product, ctaRef, specs, addToCart}) => {
    return (
        <motion.div 
        className={`mobile ${styles.TopProductSection__mobileInfo}`} 
        ref={ctaRef}
        {...getMotionProps("slideVertical", true)}
        >
            <div className={styles.TopProductSection__namePrice}>   
                <div>
                    <h1>{product.name}</h1>
                    {product.price === product.sellingPrice ?
                    <div>${formatNumber(product.price)}</div>
                    :
                    <div className={styles.wDiscount}>
                        <div className={styles.price}>${formatNumber(product.price)}</div>
                        <div className={styles.sellingPrice}>${formatNumber(product.sellingPrice)}</div>
                    </div>
                    }
                </div>
            </div>
            <div className={styles.TopProductSection__description}>
                <div>{product.description}</div>
                {specs.map((spec)=>
                    <div key={spec.label}>{spec.label}: <strong>{spec.value}</strong></div>
                )}
                <AddToCart onClick={addToCart} product={product.name} />
            </div>
        </motion.div>
    )
}

const PurchaseInfo:React.FC = () => {
    
    const items:{icon:ReactNode, text: string}[] = useMemo(()=>[
        {icon: returns(20, "gray"), text: 'Devoluciones hasta 7 días tras realizada tu compra.'},
        {icon: shipping(20, "gray"), text: 'Envíos gratis a todo el país.'},
        {icon: safePurchase(20, "gray"), text: 'Compra segura mediante crédito, débito o efectivo.'},
        {icon: safe(20, "gray"), text: 'Garantía por 12 meses en caso de cualquier falla.'},
    ], [])

    return (
        <div className={styles.PurchaseInfo}>
            {items.map((item)=>
                <motion.div 
                className={styles.PurchaseInfo__item} 
                key={item.text}
                {...getMotionProps("slideVertical", true, {delay:0.1 * items.indexOf(item)})}
                >
                    <div>{item.icon}</div>
                    <div>{item.text}</div>
                </motion.div>
            )}
        </div>
    )
} 

export default TopProductSection;