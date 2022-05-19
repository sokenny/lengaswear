import { motion, AnimatePresence } from 'framer-motion';
import { ProductType } from 'types';
import Button from '@/components/elements/Button/Button';
import styles from './FixedProductCta.module.scss';

type FixedProductCtaProps = {
    product:ProductType, 
    show:boolean,
}

const FixedProductCta:React.FC<FixedProductCtaProps> = ({product, show}) => {
    return  (
        <AnimatePresence>
        {show &&
            <motion.div 
            className={styles.FixedProductCta}
            initial={{y: "100%", opacity: 1}}
            animate={{y: 0, opacity: 1}}
            exit={{y: "100%", opacity: 1, 
                transition:{duration: 0.3}
            }}
            transition={{
                stiffness: 0,
                ease: "easeOut"
            }}
            >
                <div>
                    <div className={styles.productInfo}>
                        <h1>{product.name}</h1><div>${product.price}</div>
                    </div>
                    <div className={styles.ctas}>
                            <Button onClick={()=>{}}>Agregar al carrito</Button>
                    </div>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}

export default FixedProductCta;