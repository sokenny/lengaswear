import { useEffect, useMemo, useRef, useCallback } from "react";
import { NextPageAugmented, ProductType } from "types";
import { AnimatePresence, motion } from 'framer-motion';
import { capitalize, scrollTo } from "../utils";
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
import styles from '../styles/Carrito.module.scss';

const Carrito: NextPageAugmented = () => {

    const { store, checkout, setCheckout } = useAppContext();
    const carritoRef = useRef<HTMLDivElement>(null)
    const cartDetail = useMemo(()=>getCartDetail(checkout.carrito), [checkout.carrito]);
    const cartIsEmpty = checkout.carrito.length < 1;

    useEffect(()=>{
        setCheckout({...checkout, step: 1})
    }, [])

    useEffect(()=>{
        setCheckout({...checkout, cartTotal: getCartTotal()})
    }, [cartDetail])

    function getCartDetail(carrito:string[]){
        const cartDetail:any = {};
        carrito.forEach(element => {
            cartDetail[element] = (cartDetail[element] || 0) + 1;
        });
        return cartDetail;
    }

    const getCartTotal = useCallback(() => {
        let total = 0;
        Object.keys(cartDetail).forEach(prdName => {
            const qty = cartDetail[prdName];
            const product:ProductType = store.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
            total += qty * product.price;
        });
        return total;
    }, [cartDetail, store]);

    function handleIniciarCompra(){
        setCheckout({...checkout, step: 2})
        scrollTo(carritoRef, -50)
    }

    const stepScreens:any = useMemo(()=>{
        return {
            1: <StepOne cartDetail={cartDetail} />,
            2: <StepTwo />,
            3: <StepThree />,
        }
    }, [cartDetail])

    return (
        <>
        <Head>
            <title>Carrito | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className={`${styles.Carrito} ${cartIsEmpty ? styles['Carrito-empty'] : ''}`} ref={carritoRef}>
            <div className="container" style={{paddingTop: 0}}>
                <main>
                    <div className={styles.col1}>

                        {cartIsEmpty ? <EmptyCart /> : stepScreens[checkout.step]}

                    </div>

                    {!cartIsEmpty && 
                    <div className={styles.col2}>
                        <section className={styles.detalle}>
                            <h2>Detalle final</h2>
                            <CodigoDescuento />
                            
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
                                <motion.div
                                initial={{y: -NUMBER_BOUNCE_DISTANCE}}
                                animate={{y: 0}}
                                key={checkout.cartTotal}
                                >
                                    {checkout.cartTotal}
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {checkout.step === 1 &&
                                <motion.div 
                                style={{overflow: "hidden"}}
                                initial={{height:"auto"}}
                                animate={{height:"auto"}}
                                exit={{height: 0}}
                                >
                                    <div className={styles.cta}>
                                        <Button onClick={handleIniciarCompra}>Iniciar Compra</Button>
                                    </div>
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
    animate:{y: 0}
}

const StepOne:React.FC<{cartDetail:any}> = ({cartDetail}) => {

    return (
        <section className={styles.StepOne}>
            <div className={styles.header}>
                <h1><motion.div {...slideDownProps}>01</motion.div>/03</h1>
                <h2 {...slideDownProps}>Llevando 2 o más productos tenés un 10% off!</h2>
            </div>
            <section className={styles.products}>
                {Object.keys(cartDetail).map((prdName) =>
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

    const { checkout, setCheckout } = useAppContext();
    const stepIsValid = checkout.nombre !== "" && checkout.mail !== "" && checkout.telefono !== "" && checkout.fuente !== "";

    return (
        <section className={styles.StepTwo}>
            <div className={styles.header}>
                <h1><motion.div {...slideDownProps}>02</motion.div>/03</h1>
                <h2 {...slideDownProps}>
                    <div>Datos de contacto - Información de envío - Método de pago</div>
                </h2>
            </div>
            <motion.section 
            className={styles.inputs}
            initial={{y: -10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            >
                <div className={styles.inputRow}>
                    <LabelAndInput label="Nombre" type="text" value={checkout.nombre} onChange={(nombre)=>setCheckout({...checkout, nombre})} placeholder="Chuck" />
                    <LabelAndInput label="Apellido" type="text" value={checkout.apellido} onChange={(apellido)=>setCheckout({...checkout, apellido})} placeholder="Norris" />
                </div>
                <div className={styles.inputRow}>
                    <LabelAndInput label="Mail" type="mail" value={checkout.mail} onChange={(mail)=>setCheckout({...checkout, mail})} placeholder="chucknorris@mail.com" />
                    <LabelAndInput label="Whatsapp / Telefono" name="telefono" type="number" value={checkout.telefono} onChange={(telefono)=>setCheckout({...checkout, telefono})} placeholder="1123456789" />
                </div>
                <div className={`${styles.inputRow} ${styles['inputRow-full']}`}>
                    <LabelAndInput label="Por donde nos conociste?" name="fuente" type="text" value={checkout.fuente} onChange={(fuente)=>setCheckout({...checkout, fuente})} placeholder="Instagram" />
                </div>
            </motion.section>
            <div className={styles.cta}>
                <Button onClick={()=>setCheckout({...checkout, step: 3})} active={stepIsValid}>Siguiente</Button>
            </div>
        </section>
    )
}

const StepThree:React.FC = () => {

    const { checkout, setCheckout } = useAppContext();
    const stepIsValid = checkout.pais !== "" && checkout.provincia !== "" && checkout.localidad !== "" && checkout.calle !== "" && checkout.numero !== "";
    
    async function handleIrAPagar () {
        setCheckout({...checkout, completed: true});
        const res = await registerCheckout(checkout);
        if(res.data.status === "success") {
            window.location.href = res.data.paymentLink
        }
    }

    return (
        <section className={styles.StepThree}>
            <div className={styles.header}>
                <h1><motion.div {...slideDownProps}>03</motion.div>/03</h1>
                <h2 {...slideDownProps}>
                    <div>Datos de contacto - Información de envío - Método de pago</div>
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
                    <LabelAndInput label="Provincia" type="text" value={checkout.provincia} onChange={(provincia)=>setCheckout({...checkout, provincia})} placeholder="CABA" />
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
                <Button onClick={handleIrAPagar} active={stepIsValid}>Ir a pagar</Button>
            </div>
        </section>
    )
}

const LabelAndInput:React.FC<{label:string, value:string | number, type:string, name?:string, onChange?:(value:string | number)=>void, disabled?:boolean, placeholder: string}> = ({label, value, type, name, disabled, onChange=()=>{}, placeholder}) => {
    return (
        <div className={styles.LabelAndInput}>
            <label htmlFor="pais">{label}</label>
            <Input value={value} type={type} name={name || label} disabled={disabled} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

const ProductRow:React.FC<{prdName:string, qty:number}> = ({prdName, qty}) => {

    const { store, addToCart, removeFromCart } = useAppContext();
    const product:ProductType = store.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
    const addThisToCart = () => addToCart(prdName);
    const removeThisFromCart = (all=false) => removeFromCart(prdName, all);
    const thumbnailSrc = `/${product.category}/${product.name.toLocaleLowerCase()}/main.webp`

    return (
        <div className={styles.ProductRow}>
            <div className={styles.desktop}>
                <div className={styles.image}>
                    <Link href={product.href}>
                        <a>
                            <Image src={thumbnailSrc} alt={product.name} layout="fill" objectFit="cover" />
                        </a>
                    </Link>
                </div>
                <div className={styles.name}>
                    <h3>{product.name}</h3>
                </div>
                <div className={styles.price}>
                    {product.price}
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
                        {product.sellingPrice * qty}
                    </motion.div>
                </div>
                <div className={styles.delete}>
                    <span onClick={()=>removeThisFromCart(true)}>Eliminar</span>
                </div>
            </div>
            <div className={styles.mobile}>
                <div className={styles.image}>
                    <Link href={product.href}>
                        <a>
                            <Image src={thumbnailSrc} alt={product.name} layout="fill" objectFit="cover" />
                        </a>
                    </Link>
                </div>
                <div className={styles.cols}>
                    <div>
                        <div>
                            <h3>{product.name}</h3>
                            <div className={styles.qty}>
                                <span>QTY:</span> {qty}
                            </div>
                        </div>
                        <div className={styles.addSubstract}>
                            <div onClick={addThisToCart}>+</div>
                            <div onClick={()=>removeThisFromCart(false)}>-</div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <div>{product.sellingPrice}</div>
                        <motion.div
                        key={qty}
                        initial={{y: -NUMBER_BOUNCE_DISTANCE}}
                        animate={{y: 0}}
                        >
                            {product.sellingPrice * qty}
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

Carrito.nav = <Nav theme="scrolled" whiteFooter={true} />
Carrito.footer = <Footer theme="white" />

export default Carrito;