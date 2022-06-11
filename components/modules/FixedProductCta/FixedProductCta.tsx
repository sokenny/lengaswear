import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from 'contexts/AppContext';
import { formatNumber } from '@/utils/index';
import { ProductType } from 'types';
import AddToCart from '@/components/elements/AddToCart/AddToCart';
import styles from './FixedProductCta.module.scss';

type FixedProductCtaProps = {
    product:ProductType, 
    show:boolean,
    addToCart: () => boolean,
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
                duration: 1.2
            }}
            >
                <div>
                    <div className={styles.productInfo}>
                        <h1>{product.name}</h1><div>${formatNumber(product.price)}</div>
                    </div>
                    <div className={styles.ctas}>
                        <AddToCart onClick={addToCart} product={product.name} />
                    </div>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}

export default FixedProductCta;