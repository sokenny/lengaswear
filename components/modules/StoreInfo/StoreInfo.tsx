import { ReactNode } from "react";
import { returns, shipping, safePurchase, safe } from "@/utils/icons";
import styles from './StoreInfo.module.scss';

const StoreInfo:React.FC = () => {

    const items:{icon:ReactNode, title: string, text:string}[] = [
        {icon: returns(25, "gold"), title: 'Devolución gratuita', text: 'hasta 7 dias despues de tu compra.'},
        {icon: shipping(25, "gold"), title: 'Envío gratis', text: 'a todo el país.'},
        {icon: safePurchase(25, "gold"), title: 'Compra segura', text: 'mediante Mercadopago, Paypal o GooglePay.'},
        {icon: safe(25, "gold"), title: 'Garantía', text: 'por 12 meses en caso de cualquier falla.'},
    ]

    return (
        <section className={styles.StoreInfo}>
            <div className={styles.StoreInfo__info}>
                {items.map((item)=>
                    <div className={styles.StoreInfo__item} key={item.title}>
                        <div className={styles.StoreInfo__icon}>{item.icon}</div>
                        <div>
                            <div>{item.title}</div>
                            <div>{item.text}</div>
                        </div>
                    </div>
                )
                }
            </div>
            <div className={styles.StoreInfo__image}></div>            
        </section>
    )
}

export default StoreInfo;