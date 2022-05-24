import { useEffect, useMemo } from "react";
import { NUMBER_BOUNCE_DISTANCE } from "@/utils/constants";
import { NextPageAugmented, ProductType } from "types";
import { motion } from 'framer-motion';
import { cart, chat } from "@/utils/icons";
import { useAppContext } from "contexts/AppContext";
import { perkItems } from "@/components/modules/StoreInfo/StoreInfo";
import Head from 'next/head';
import Image from 'next/image';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import Button from "@/components/elements/Button/Button";
import ArrowInput from "@/components/elements/ArrowInput/ArrowInput";
import styles from '../styles/Carrito.module.scss';

const Carrito: NextPageAugmented = () => {

    const { store, checkout } = useAppContext();
    const cartDetail = checkout !== null ? getCartDetail(checkout.carrito) : {}

    function getCartDetail(carrito:string[]){
        const cartDetail:any = {};
        carrito.forEach(element => {
            cartDetail[element] = (cartDetail[element] || 0) + 1;
        });
        return cartDetail;
    }

    function getCartTotal(){
        let total = 0;
        Object.keys(cartDetail).forEach(prdName => {
            const qty = cartDetail[prdName];
            const product:ProductType = store.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
            total += qty * product.price;
        });
        return total;
    }

    return (
        <>
        <Head>
            <title>Carrito | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className={styles.Carrito}>
            <div className="container" style={{paddingTop: 0}}>
                <main>
                    <div className={styles.col1}>
                        <div className={styles.header}>
                            <h1>Tu Carrito</h1>
                            <h2>Llevando 2 o más productos tenés un 10% off!</h2>
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
                    </div>
                    <div className={styles.col2}>
                        <section className={styles.detalle}>
                            <h2>Detalle final</h2>
                            <CodigoDescuento />
                            <div className={styles.envio}>
                                <h3 className={styles.detalleLabel}>Envío</h3>
                                <div>GRATIS!</div>
                            </div>
                            <div className={styles.total}>
                                <h3 className={styles.detalleLabel}>Total</h3>
                                <motion.div
                                initial={{y: -NUMBER_BOUNCE_DISTANCE}}
                                animate={{y: 0}}
                                key={getCartTotal()}
                                >
                                    {getCartTotal()}
                                </motion.div>
                            </div>
                            <div className={styles.cta}>
                                <Button onClick={()=>console.log('hola')}>Iniciar Compra</Button>
                            </div>
                        </section>
                        <div className={styles.ayuda}>
                            <div>{chat()}</div>
                            <div>Necesitás ayuda? Chatea con nosotros!</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}

const ProductRow:React.FC<{prdName:string, qty:number}> = ({prdName, qty}) => {

    const { store, addToCart, removeFromCart } = useAppContext();
    const product:ProductType = store.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
    const addThisToCart = () => addToCart(prdName);
    const removeThisFromCart = () => removeFromCart(prdName);

    return (
        <div className={styles.ProductRow}>
            <div className={styles.desktop}>
                <div className={styles.image}>
                    <Image src={"/relojes/quemanta/main.webp"} alt={product.name} layout="fill" objectFit="cover" />
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
                    <div onClick={removeThisFromCart}>-</div>
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
                    <span>Eliminar</span>
                </div>
            </div>
            <div className={styles.mobile}>
                <div className={styles.image}>
                    <Image src={"/relojes/quemanta/main.webp"} alt={product.name} layout="fill" objectFit="cover" />
                </div>
                <div className={styles.cols}>
                    <div>
                        <div>
                            <h3>{product.name}</h3>
                            <div className={styles.qty}>
                                Unidades: {qty}
                            </div>
                        </div>
                        <div className={styles.addSubstract}>
                            <div onClick={addThisToCart}>+</div>
                            <div onClick={removeThisFromCart}>-</div>
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