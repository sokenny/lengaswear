import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from 'contexts/AppContext';
import { ProductType } from 'types';
import AddToCart from '@/components/elements/AddToCart/AddToCart';
import Button from '@/components/elements/Button/Button';
import styles from './FixedProductCta.module.scss';

type FixedProductCtaProps = {
    product:ProductType, 
    show:boolean,
    addToCart: () => void,
}

const FixedProductCta:React.FC<FixedProductCtaProps> = ({product, show, addToCart}) => {

    const {scrolledBottom} = useAppContext();

    return  (
        <AnimatePresence>
        {(show && !scrolledBottom) &&
            <motion.div 
            className={styles.FixedProductCta}
            initial={{y: "100%", opacity: 1}}
            animate={{y: 0, opacity: 1}}
            exit={{y: "100%", opacity: 1, 
                transition:{duration: 0.5}
            }}
            transition={{
                stiffness: 0,
                ease: "easeOut",
                duration: .7
            }}
            >
                <div>
                    <div className={styles.productInfo}>
                        <h1>{product.name}</h1><div>${product.price}</div>
                    </div>
                    <div className={styles.ctas}>
                        <AddToCart onClick={addToCart} />
                    </div>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}

export default FixedProductCta;