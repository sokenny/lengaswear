import { ReactNode, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useOnScreen } from "@/utils/index";
import { returns, shipping, safePurchase, safe } from "@/utils/icons";
import styles from './StoreInfo.module.scss';

const StoreInfo:React.FC = () => {

    const divRef = useRef(null)
    const isOnScreen = useOnScreen(divRef);
    const items:{icon:ReactNode, title: string, text:string}[] = [
        {icon: returns(25, "gold"), title: 'Devolución gratuita', text: 'hasta 7 dias despues de tu compra.'},
        {icon: shipping(25, "gold"), title: 'Envío gratis', text: 'a todo el país.'},
        {icon: safePurchase(25, "gold"), title: 'Compra segura', text: 'mediante Mercadopago, Paypal o GooglePay.'},
        {icon: safe(25, "gold"), title: 'Garantía', text: 'por 12 meses en caso de cualquier falla.'},
    ]
    const BASE_DELAY = .7;

    return (
        <section className={styles.StoreInfo}>
            <div className={styles.info} ref={divRef}>
                {items.map((item, i)=>
                    <motion.div 
                    className={styles.item} key={item.title}
                    initial={{opacity: 0, y: 30}}
                    animate={isOnScreen && {opacity: 1, y:0}}
                    transition={{delay: BASE_DELAY + ((i+1)*.1), duration: .5}}
                    >
                        <div className={styles.icon}>{item.icon}</div>
                        <div>
                            <div>{item.title}</div>
                            <div>{item.text}</div>
                        </div>
                    </motion.div>
                )
                }
            </div>
            <div className={styles.image}></div>            
        </section>
    )
}

export default StoreInfo;