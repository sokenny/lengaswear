
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import { useAppContext } from "contexts/AppContext";
import ModalWaitingList from "@/components/modules/ModalWaitingList/ModalWaitingList";
import styles from './AddToCart.module.scss';

const AddToCart:React.FC<{onClick: ()=>boolean, product:string}> = ({onClick, product}) => {

    const AGREGAR = "Agregar al carrito";
    const AGREGADO = "Ir al carrito!";
    const router = useRouter();
    const [cta, setCta] = useState<string>(AGREGAR)
    const [animate, setAnimate] = useState<boolean>(false)
    const hasAdded = cta === AGREGADO 
    const { setModal } = useAppContext();

    function handleClick(){
        if(hasAdded){
            router.push('/carrito')
        }else{
            if(onClick()){
                setAnimate(true)
            }else{
                setModal(<ModalWaitingList product={product} />)
            }
        }
    }

    useEffect(()=>{
        if(animate){
            let timeout:any;
            timeout = setTimeout(()=>{
                setCta(AGREGADO)
                setTimeout(() => {
                    setAnimate(false)
                    setCta(AGREGAR)
                }, 3000);
            }, 250)
            return () => clearTimeout(timeout);
        }
    }, [animate])

    
    return (
        <motion.button
        className={`${styles.AddToCart} ${animate ? styles[`AddToCart-animate`] : ''} ${hasAdded ? styles[`AddToCart-agregado`] : ''}`}
        whileTap={{scale: .95}}
        onClick={handleClick}
        >
            <motion.div 
            className={styles.bg}
            initial={{width: "100%"}}
            animate={animate ? {width: "0%"} : {width: "100%"}}
            transition={{duration: animate ? .25 : 0, ease: "circIn"}}
            ></motion.div>
            <motion.div 
            key={cta}
            initial={{y: -5, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            className={styles.cta}
            >
                {cta}
            </motion.div>
            <span className={styles.placeholder}>
                {cta}
            </span>
            {hasAdded &&
                <motion.div
                className={styles.loader}
                initial={{width: "100%"}}
                animate={{width: "0%"}}
                transition={{duration: 3.5}}
                />
            }
        </motion.button>
    )
}

export default AddToCart;