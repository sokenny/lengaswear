import { NextPageAugmented, ProductType } from "types";
import Head from 'next/head';
import { WHATSAPP_LINK } from "@/utils/constants";
import Nav from "@/components/modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import styles from '../styles/Terminos.module.scss';

const Terminos: NextPageAugmented = () => {

    return (
        <>
        <Head>
            <title>Terminos | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className={styles.Terminos}>
            <header>
                <h1>Terminos / FAQ</h1>
            </header>
            <main>
                 
                 <div>
                    <h3>Como recibis tu reloj?</h3>
                    <p>Solamente tenés que completar los datos de tu domicilio al momento de la compra.</p>
                 </div>
                 <div>
                    <h3>Cuanto te tarda el envio y cuanto cuesta?</h3>
                    <p>En períodos de stock disponible, desde efectuada la compra, puede demorar hasta 48hs hábiles en ser despachado. Cuando se realiza la compra dentro de un período de pre-venta, se despacha en la fecha indicada de re-lanzamiento. El envío puede tardar de 3 a 6 días hábiles dependiendo de tu localidad. En todo momento vas a poder hacer el seguimiento del envío desde un link que te llega a tu mail. Para enviarte el reloj no tenés que pagar nada, el envío es gratis. El único costo adicional puede imponerlo la aduana de tu país. Eso siempre va a depender de las políticas internas de la aduana, y la situación impositiva dentro de tu país (Si alguna vez compraste algo de afuera ya estarás familiarizado con el proceso).</p>
                 </div>
                 <div>
                    <h3>Que pasa si te lo enviamos y no hay nadie para recibirlo?</h3>
                    <p>Se deja un aviso de que el despachante pasó por el domicilio y lo vuelve a intentar al día siguiente. En caso de que suceda lo mismo, el reloj permanece en la sucursal del Correo más cercano al domicilio durante 3 días para ser retirado. Si pasado ese transcurso de tiempo nadie lo retira, vuelve a nuestras oficinas y se coordina otra forma de entrega.</p>
                 </div>
                 <div>
                    <h3>Por que existe diferencia de precio entre modelos?</h3>
                    <p>Con cada modelo, se trabajan distintas maderas y cueros. Cada una con sus distintivas propiedades y exclusividad. Por lo general, a medida que aumenta la dureza de la madera, se torna mas costosa tanto en precio como en maleabilidad. Los modelos mas caros cuentan con maderas de excelentes propiedades físicas que llevan ligada una mano de obra artesanal mas intensa para dar con la pieza final.</p>
                 </div>
                 <div>
                    <h3>Garantia</h3>
                    <p>
                        Te recomendamos leer atentamente la garantía para sacarte cualquier tipo de dudas.
                        <br />
                        <br />
                        Esta garantía de un año, vigente desde la fecha de compra, cubre defectos de fabricación en el propio reloj (movimiento, caja, cristal). La garantía no cubre los gastos de envió del producto, es decir que los cargos del mismo corren por cuenta del cliente.
                        <br />
                        <br />
                        El desgaste normal no está cubierto por la garantía. Se requiere comprobante de compra para todos los reclamos de garantía. Se requiere confirmación del pedido on-line.
                        <br />
                        <br />
                        Lengas no aceptará un reclamo de garantía si un reloj tiene evidencia de exceso de desgaste o uso indebido. Si tenés preguntas sobre reemplazos de garantía, ponete en contacto con nuestro Equipo de Soporte enviándonos un mail a lengaswear@gmail.com y especificando tu nombre, número de teléfono y una descripción detallada con imágenes de los problemas en cuestión.
                        <br />
                        <br />
                        De no recibir el pedido tal cual fue hecho, o con algún daño o falla, comunicate a la brevedad a lengaswear@gmail.com. Vamos a necesitar que nos lo envíes (costos de envío corren por cuenta de Lengas) para poder enviarte uno nuevo.
                        <br />
                        <br />
                        La garantía al comprador es válida para compras por nuestra web o por medio de un distribuidor autorizado. Tu reloj Lengas está cubierto bajo los siguientes términos y condiciones por un período de 1 año a partir de la fecha de compra original. Tené en cuenta que se requiere comprobante de compra para todos los reclamos. En caso de vicios o defectos que afecten el correcto funcionamiento del producto vinculado a la pila del reloj, nos haremos cargo de su reparación para que el producto vuelva a reunir las condiciones óptimas de uso.
                        <br />
                        <br />
                        <span style={{textDecoration: "underline"}}>La garantía NO cubre:</span>
                        <ul>
                            <li>-Los daños causados por manipulaciones incorrectas, falta de atención, accidentes, pérdida, robo o desgaste.</li>
                            <li>-La decoloración de los relojes de colores claros y/o componentes.</li>
                            <li>-Los gastos de envío por cambios a compras no realizadas a través de nuestra página web.</li>
                            <li>-Correa dañada: el desgaste y el rasgón.</li>
                            <li>-Daños causados por agua.</li>
                        </ul>

                        <span style={{textDecoration: "underline"}}>La garantía cubre:</span>
                        <ul>
                            <li>-Fallas en las agujas (movimiento).</li>
                            <li>-Falla del reloj (caja/corona).</li>
                            <li>-Falla en el cristal.</li>
                            <li>-Logística (si el reloj se recibe en condiciones defectuosas).</li>
                        </ul>
                    </p>
                 </div>
                 <div>
                    <h3>Devolución</h3>
                    <p>Si no estas conforme con el producto que compraste, podes devolverlo gratis (con envío a cargo de Lengas) o incluso cambiarlo (bonificamos uno de los dos envíos que habría que efectuar) dentro de los primeros 7 días de recibido tu producto. Sólo válido para compras de Argentina.</p>
                 </div>
                 <div>
                    <h3>Reintegro del dinero</h3>
                    <p>Al recibir el producto te estaremos reintegrando el importe total de tu compra. El dinero devuelto se te estará acreditando en tu cuenta de Mercado Pago Argentina.</p>
                 </div>
                 <div>
                     <p>Cualquier duda podes escribirnos por <span><a href={WHATSAPP_LINK} style={{textDecoration: "underline"}}>Whatsapp</a></span> o enviarnos un mail a lengaswear@gmail.com</p>
                 </div>

            </main>
        </div>
        </>
    )
}

Terminos.nav = <Nav theme="scrolled" whiteFooter={true} />
Terminos.footer = <Footer theme="white" />

export default Terminos;