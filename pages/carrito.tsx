import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { NextPageAugmented, ProductType } from "types";
import { AnimatePresence, motion } from 'framer-motion';
import { capitalize, scrollTo, formatNumber, provincias, fuentes, useFirstRender, getMotionProps, useIsMobile, useOnScreen } from "../utils";
import { registerCheckout } from "api";
import { NUMBER_BOUNCE_DISTANCE, WHATSAPP_LINK } from "@/utils/constants";
import { chat } from "@/utils/icons";
import { useAppContext } from "contexts/AppContext";
import { perkItems } from "@/components/modules/StoreInfo/StoreInfo";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import Button from "@/components/elements/Button/Button";
import ArrowInput from "@/components/elements/ArrowInput/ArrowInput";
import Input from "@/components/elements/Input/Input";
import Select from "@/components/elements/Select/Select";
import styles from '../styles/Carrito.module.scss';

const Carrito: NextPageAugmented = () => {

    const router = useRouter();
    const isMobile = useIsMobile();
    const isFirstRender = useFirstRender();
    const { store, checkout, setCheckout } = useAppContext();
    const carritoRef = useRef<HTMLDivElement>(null)
    const cartDetail = useMemo(()=>getCartDetail(checkout.carrito), [checkout.carrito, checkout.step]);
    const cartIsEmpty = checkout.carrito.length < 1 && store.products.length > 0;
    const [ctaInView, setCtaInView] = useState<boolean>(false)

    useEffect(()=>{
        scrollTo(carritoRef, -50)
        if(!isFirstRender){
            setCheckout({...checkout, step: router.query.step});
        }
        if(router.query.step === undefined || isFirstRender) router.replace({ query: { ...router.query, step: 1 } }, undefined, {shallow: true})
    }, [router.query.step, isFirstRender])

    useEffect(()=>{
        if(!isFirstRender){
            setCheckout({...checkout, cartGrossTotal: getCartGrossTotal(), cartNetTotal: Math.floor(getCartGrossTotal() * 0.9)});
        }
    }, [cartDetail.length])

    function getCartDetail(carrito:string[]){
        const cartDetail:any = {};
        carrito.forEach(element => {
            cartDetail[element] = (cartDetail[element] || 0) + 1;
        });
        return cartDetail;
    }

    const getCartGrossTotal = useCallback(():number => {
        let total = 0;
        if(Object.keys(cartDetail).length > 0 && store.products.length > 0){
            Object.keys(cartDetail).forEach(prdName => {
                const qty = cartDetail[prdName];
                const product:ProductType = store.products.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
                total += qty * product.price;
            });
        }
        return total;
    }, [cartDetail.length, store]);

    function handleIniciarCompra(){
        router.push({ query: { ...router.query, step: 2 } }, undefined, {shallow: true})
    }

    const stepScreens:any = useMemo(()=>{
        return {
            1: <StepOne cartDetail={cartDetail} cartGrossTotal={getCartGrossTotal()} />,
            2: <StepTwo />,
            3: <StepThree />,
        }
    }, [cartDetail.length])

    useEffect(()=>{
        console.log('cart  detail: ', cartDetail)
    })

    return (
        <>
        <Head>
            <title>Carrito | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className={`${styles.Carrito} ${cartIsEmpty ? styles['Carrito-empty'] : ''}`} ref={carritoRef}>
            <div className="container" style={{paddingTop: 0}}>
                <main>
                    {isMobile && <FixedCta show={ctaInView && checkout.carrito.length > 0 && checkout.step == 1} onClick={handleIniciarCompra} />}
                    <div className={styles.col1}>
                        {cartIsEmpty ? <EmptyCart /> : stepScreens[checkout.step]}
                    </div>
                    {!cartIsEmpty && 
                    <div className={styles.col2}>
                        <section className={styles.detalle}>
                            <h2>Detalle final</h2>
                            <motion.div
                            style={{overflow: "hidden"}}
                            initial={{height: 0}}
                            animate={router.query.step === "1" ? {height: "auto"} : {height: 0, opacity: 0}}
                            >
                                <CodigoDescuento />
                            </motion.div>
                            <div className={styles.listado}>
                                <div>Productos:</div>
                                <ul>
                                    {Object.keys(cartDetail).map((prdName)=>
                                        <li key={prdName}>x{cartDetail[prdName]} {capitalize(prdName)}</li>
                                    )}
                                </ul>
                            </div>
                            
                            <div className={styles.envio}>
                                <h3 className={styles.detalleLabel}>Envío</h3>
                                <div>GRATIS!</div>
                            </div>
                            <div className={styles.total}>
                                <h3 className={styles.detalleLabel}>Total (ARS)</h3>
                                <div className={styles.totalDetail}>
                                    {checkout.carrito.length > 1 &&
                                        <div  
                                        className={styles.crossedTotal}
                                        key={checkout.carrito.length}
                                        >
                                            {"$" + formatNumber(checkout.cartGrossTotal)}
                                        </div>
                                    }
                                    <motion.div
                                    initial={{y: -NUMBER_BOUNCE_DISTANCE}}
                                    animate={{y: 0}}
                                    key={checkout.cartGrossTotal}
                                    >
                                        {checkout.carrito.length > 1 
                                        ?
                                        "$" + formatNumber(checkout.cartNetTotal)
                                        :
                                        "$" + formatNumber(checkout.cartGrossTotal)
                                        }
                                    </motion.div>
                                </div>
                            </div>
                            <AnimatePresence>
                                {router.query.step === "1" &&
                                <motion.div 
                                style={{overflow: "hidden"}}
                                initial={{height:"auto"}}
                                animate={{height:"auto"}}
                                exit={{height: 0}}
                                >
                                    <motion.div 
                                    className={styles.cta}
                                    onViewportEnter={()=>setCtaInView(false)}
                                    onViewportLeave={()=>setCtaInView(true)}
                                    >
                                        <Button onClick={handleIniciarCompra}>Iniciar Compra</Button>
                                    </motion.div>
                                </motion.div>
                                }
                            </AnimatePresence>
                        </section>
                        <div className={styles.ayuda}>
                            <div>{chat()}</div>
                            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                                <div>Necesitás ayuda? Chatea con nosotros!</div>
                            </a>
                        </div>
                    </div>
                    }
                </main>
            </div>
        </div>
        </>
    )
}

const EmptyCart = () => {
    return (
        <section className={styles.EmptyCart}>
            <h1>Tu carrito se encuentra vacío!</h1>
            <Link href="/">
                <a>
                    <h2><span>Ir a comprar</span> <div>✨</div></h2>
                </a>
            </Link>
        </section>
    )
}

const slideDownProps = {
    initial:{y: -10},
    animate:{y: 0},
    transition: {duration: .25, delay: .2}
}

const StepOne:React.FC<{cartDetail:any, cartGrossTotal:number}> = ({cartDetail, cartGrossTotal}) => {

    const { checkout } = useAppContext();
    const sortedUniqueCartProducts = useMemo(()=>Object.keys(cartDetail).sort((a, b) => a.localeCompare(b)), [cartDetail]);

    return (
        <section className={styles.StepOne}>
            <div className={styles.header}>
                <h1><motion.div {...slideDownProps}>01</motion.div>/03</h1>
                <h2 {...slideDownProps}>
                    {checkout.carrito.length > 1 ?
                    <motion.div 
                    className={styles.descuentoAplicado}
                    initial={{rotateX: 100, y: -10}} 
                    animate={{rotateX: 0, y: 0}} 
                    key={"aplicado"}
                    >10% off aplicado! Estas ahorrando <motion.span initial={{scale: 1.1}} animate={{scale: 1}} key={cartGrossTotal}>${formatNumber(checkout.cartGrossTotal - checkout.cartNetTotal)}</motion.span></motion.div>
                    :
                    <motion.div initial={{y: -10}} animate={{y: 0}} key={"por aplicar"}>Llevando 2 o más productos tenés un 10% off!</motion.div>
                    }
                </h2>
            </div>
            <section className={styles.products}>
                {sortedUniqueCartProducts.map((prdName) =>
                    <ProductRow prdName={prdName} qty={cartDetail[prdName]} key={prdName} />
                )}
            </section>
            <div className={styles.storeInfo}>
                {perkItems.map((item)=>
                <div className={styles.perk} key={item.title}>
                    <div>{item.icon}</div>
                    <div>{`${item.title} ${item.text}`}</div>
                </div>
                )}
            </div>
        </section>
    )
}

const StepTwo:React.FC = () => {

    const router = useRouter();
    const { checkout, setCheckout } = useAppContext();
    const stepIsValid = checkout.nombre !== "" && checkout.mail !== "" && checkout.telefono !== "" && checkout.fuente !== "";

    return (
        <section className={styles.StepTwo}>
            <div className={styles.header}>
                <h1><motion.div {...slideDownProps}>02</motion.div>/03</h1>
                <h2 {...slideDownProps}>
                    <div>Introducí tus datos de contacto!</div>
                </h2>
            </div>
            <motion.section 
            className={styles.inputs}
            initial={{y: -10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            >
                <div className={styles.inputRow}>
                    <LabelAndInput label="Nombre" type="text" value={checkout.nombre} onChange={(nombre)=>setCheckout({...checkout, nombre})} placeholder="Ryan" />
                    <LabelAndInput label="Apellido" type="text" value={checkout.apellido} onChange={(apellido)=>setCheckout({...checkout, apellido})} placeholder="Gosling" />
                </div>
                <div className={styles.inputRow}>
                    <LabelAndInput label="Mail" type="mail" value={checkout.mail} onChange={(mail)=>setCheckout({...checkout, mail})} placeholder="ryangosling@mail.com" />
                    <LabelAndInput label="Whatsapp / Telefono" name="telefono" type="number" value={checkout.telefono} onChange={(telefono)=>setCheckout({...checkout, telefono})} placeholder="1123456789" />
                </div>
                <div className={`${styles.inputRow} ${styles['inputRow-full']}`}>
                    <div className={styles.LabelAndInput}>
                        <label htmlFor="fuente">Cómo nos conociste?</label>
                        <Select value={checkout.fuente} options={fuentes} name="fuente" onChange={(fuente)=>setCheckout({...checkout, fuente})} randomize={true} />
                    </div>
                </div>
            </motion.section>
            <div className={styles.cta}>
                <Button onClick={()=>router.push({ query: { ...router.query, step: 3 } }, undefined, {shallow: true})} active={stepIsValid}>Siguiente</Button>
            </div>
        </section>
    )
}

const StepThree:React.FC = () => {

    const { checkout, setCheckout } = useAppContext();
    const stepIsValid = checkout.pais !== "" && checkout.provincia !== "" && checkout.localidad !== "" && checkout.calle !== "" && checkout.numero !== "";
    const [loading, setLoading] = useState<boolean>(false);
    
    async function handleIrAPagar () {
        setLoading(true);
        setCheckout({...checkout, completed: true});
        const res = await registerCheckout(checkout);
        if(res.data.status === "success") {
            window.location.href = res.data.paymentLink
        }
        setLoading(false);
    }

    return (
        <section className={styles.StepThree}>
            <div className={styles.header}>
                <h1><motion.div {...slideDownProps}>03</motion.div>/03</h1>
                <h2 {...slideDownProps}>
                    <div>Introducí tu información de envío</div>
                </h2>
            </div>
            <motion.section 
            className={styles.inputs}
            initial={{y: -10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            >
                <div className={styles.inputRow}>
                    <LabelAndInput label="País" type="text" value={checkout.pais} onChange={(pais)=>setCheckout({...checkout, pais})} placeholder="Argentina" disabled={true} />
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.LabelAndInput}>
                        <label htmlFor="provincia">Provincia</label>
                        <Select options={provincias.map((provincia)=>{return {value: provincia, label: provincia}})} value={checkout.provincia} name="provincia" onChange={(provincia)=>setCheckout({...checkout, provincia})} />
                    </div>
                    <LabelAndInput label="Localidad" type="text" value={checkout.localidad} onChange={(localidad)=>setCheckout({...checkout, localidad})} placeholder="Nuñez" />
                </div>
                <div className={`${styles.inputRow} ${styles['inputRow-full']}`}>
                    <LabelAndInput label="Calle" type="text" value={checkout.calle} onChange={(calle)=>setCheckout({...checkout, calle})} placeholder="Av. del Libertador" />
                </div>
                <div className={styles.inputRow}>
                    <LabelAndInput label="Número" type="text" value={checkout?.numero } onChange={(numero)=>setCheckout({...checkout, numero})} placeholder="1010" />
                    <LabelAndInput label="Dpto (opcional)" type="text" value={checkout?.dpto} onChange={(dpto)=>setCheckout({...checkout, dpto})} placeholder="1C" />
                </div>
            </motion.section>
            <div className={styles.cta}>
                <Button onClick={handleIrAPagar} active={stepIsValid} loading={loading}>Ir a pagar</Button>
            </div>
        </section>
    )
}

const LabelAndInput:React.FC<{label:string, value:string | number, type:string, name?:string, onChange?:(value:string | number)=>void, disabled?:boolean, placeholder?: string}> = ({label, value, type, name, disabled, onChange=()=>{}, placeholder}) => {
    return (
        <div className={styles.LabelAndInput}>
            <label htmlFor={name}>{label}</label>
            <Input value={value} type={type} name={name || label} disabled={disabled} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

const ProductRow:React.FC<{prdName:string, qty:number}> = ({prdName, qty}) => {
    
    const { store, addToCart, removeFromCart } = useAppContext();
    if(store.products.length < 1) return <></>
    const product:ProductType = store.products.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
    const addThisToCart = () => addToCart(prdName);
    const removeThisFromCart = (all=false) => removeFromCart(prdName, all);
    const thumbnailSrc = store.products.length > 0 ? `/${product.category}/${product.name.toLocaleLowerCase()}/thumbnail.webp` : ''

    return (
        <div className={styles.ProductRow}>
            <div className={styles.desktop}>
                <div className={styles.image}>
                    <Link href={`/${product.category}/${product.name}`}>
                        <a>
                            <Image src={thumbnailSrc} layout="fill" objectFit="cover" alt={product.name} />
                        </a>
                    </Link>
                </div>
                <div className={styles.name}>
                    <h3>{capitalize(product.name)}</h3>
                </div>
                <div className={styles.price}>
                    ${formatNumber(product.price)}
                </div>
                <div className={`${styles.qty} no-select`}>
                    <div onClick={addThisToCart}>+</div>
                        <span>{qty}</span>
                    <div onClick={()=>removeThisFromCart(false)}>-</div>
                </div>
                <div className={styles.subTotal}>
                    <motion.div
                    key={qty}
                    initial={{y: -NUMBER_BOUNCE_DISTANCE}}
                    animate={{y: 0}}
                    >
                        ${formatNumber(product.sellingPrice * qty)}
                    </motion.div>
                </div>
                <div className={styles.delete}>
                    <span onClick={()=>removeThisFromCart(true)}>Eliminar</span>
                </div>
            </div>
            <div className={styles.mobile}>
                <div className={styles.image}>
                    <Link href={`/${product.category}/${product.name}`}>
                        <a>
                            <Image src={thumbnailSrc} layout="fill" objectFit="cover" alt={product.name} />
                        </a>
                    </Link>
                </div>
                <div className={styles.cols}>
                    <div>
                        <div>
                            <h3>{capitalize(product.name)}</h3>
                            <div className={styles.qty}>
                                <span>QTY:</span> 
                                {qty}
                            </div>
                        </div>
                        <div className={styles.addSubstract}>
                            <div onClick={addThisToCart}>+</div>
                            <div onClick={()=>removeThisFromCart(false)}>-</div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <div>${formatNumber(product.sellingPrice)}</div>
                        <motion.div
                        key={qty}
                        initial={{y: -NUMBER_BOUNCE_DISTANCE}}
                        animate={{y: 0}}
                        >
                            ${formatNumber(product.sellingPrice * qty)}
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    )
} 

const CodigoDescuento = () => {
    return (<div className={styles.CodigoDescuento}>
        <div>Tenés un código de descuento?</div>
        <ArrowInput value="" onChange={()=>{}} placeholder="RELOJ20OFF" />
    </div>)
}

const FixedCta:React.FC<{show:boolean, onClick: ()=>void}> = ({show, onClick}) => {
    
    const { checkout } = useAppContext();
    
    return (
        <AnimatePresence>
        {show &&
            <motion.div 
            className={styles.FixedCta}
            initial={{y: "100%", opacity: 1}}
            animate={{y: 0, opacity: 1}}
            exit={{y: "100%", opacity: 1, 
                transition:{duration: 0.5}
            }}
            transition={{
                stiffness: 0,
                ease: "easeOut",
                duration: 1.2
            }}
            >
                <div>
                    <div className={styles.info}>
                        <h1>TOTAL:</h1>
                        {checkout.carrito.length <= 1 ?
                            <div>${formatNumber(checkout.cartGrossTotal)}</div>
                        :
                        <>
                            <div className={styles.gross}>${formatNumber(checkout.cartGrossTotal)}</div>
                            <div className={styles.net}>${formatNumber(checkout.cartNetTotal)}</div>
                        </>
                        }
                    </div>
                    <div className={styles.cta}>
                        <Button onClick={onClick}>Iniciar compra</Button>
                    </div>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}

Carrito.nav = <Nav theme="scrolled" whiteFooter={true} />
Carrito.footer = <Footer theme="white" />

export default Carrito;