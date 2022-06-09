import { ReactNode, useRef } from "react";
import { motion } from 'framer-motion';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import { useOnScreen, getMotionProps } from "@/utils/index";
import { returns, shipping, safePurchase, safe } from "@/utils/icons";
import styles from './StoreInfo.module.scss';

export const perkItems:{icon:ReactNode, title: string, text:string}[] = [
    {icon: returns(25, "gold"), title: 'Devolución gratuita', text: 'hasta 7 dias despues de tu compra.'},
    {icon: shipping(25, "gold"), title: 'Envío gratis', text: 'a todo el país.'},
    {icon: safePurchase(25, "gold"), title: 'Compra segura', text: 'mediante Mercadopago, Paypal o GooglePay.'},
    {icon: safe(25, "gold"), title: 'Garantía', text: 'por 12 meses en caso de cualquier falla.'},
]

const StoreInfo:React.FC = () => {

    const divRef = useRef(null)
    const isIntersecting = useOnScreen(divRef, ANIMATE_BREAKPOINT);
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;

    return (
        <section className={styles.StoreInfo}>
            <div className={styles.info} ref={divRef}>
                {perkItems.map((item, i)=>
                    <motion.div 
                    className={styles.item} key={item.title}
                    {...getMotionProps("slideVertical", hasIntersected.current, {delay: (i+1)*.15})}
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