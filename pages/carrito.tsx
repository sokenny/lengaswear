import { NextPageAugmented, ProductType } from "types";
import { chat } from "@/utils/icons";
import { perkItems } from "@/components/modules/StoreInfo/StoreInfo";
import Head from 'next/head';
import Image from 'next/image';
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import Button from "@/components/elements/Button/Button";
import ArrowInput from "@/components/elements/ArrowInput/ArrowInput";
import styles from '../styles/Carrito.module.scss';

const products:ProductType[] = [
    {name: "Quemanta", price: 10670, href: "/relojes/quemanta", image: ""},
    {name: "Mahai", price: 11500, href: "/relojes/mahai", image: ""},
    {name: "Chocolate", price: 3950, href: "/billeteras/chocolate", image: ""},
]

const Carrito: NextPageAugmented = () => {

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
                            {products.map((product) =>
                                <ProductRow product={product} key={product.name} />
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
                                <div>GRATIS</div>
                            </div>
                            <div className={styles.total}>
                                <h3 className={styles.detalleLabel}>Total</h3>
                                <div>$38.910</div>
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

const ProductRow:React.FC<{product:ProductType}> = ({product}) => {
    return (
        <div className={styles.ProductRow}>
            <div className={styles.desktop}>
                <div className={styles.image}>
                    {/* <Image src={""} alt={product.name} width={70} height={70} /> */}
                </div>
                <div className={styles.name}>
                    <h3>{product.name}</h3>
                </div>
                <div className={styles.price}>
                    {product.price}
                </div>
                <div className={styles.qty}>
                    2
                </div>
                <div className={styles.subTotal}>
                    $21.340
                </div>
                <div className={styles.delete}>
                    <span>Eliminar</span>
                </div>
            </div>
            <div className={styles.mobile}>
                <div className={styles.image}>
                    {/* <Image src={""} alt={product.name} width={70} height={70} /> */}
                </div>
                <div className={styles.cols}>
                    <div>
                        <div>
                            <h3>{product.name}</h3>
                            <div className={styles.qty}>Unidades: 2</div>
                        </div>
                        <div className={styles.addSubstract}>
                            <div>+</div>
                            <div>-</div>
                        </div>
                    </div>
                    <div>
                        <div>10670</div>
                        <div>21340</div>
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