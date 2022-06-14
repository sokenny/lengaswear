import { useRef } from 'react';
import { motion } from 'framer-motion';
import { capitalize, useOnScreen } from '@/utils/index';
import { ProductType } from 'types';
import { useAppContext } from 'contexts/AppContext';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Recommended.module.scss';

const Recommended:React.FC<{products: string[]}> = ({products}) => {

    const { store } = useAppContext();
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const isIntersecting = useOnScreen(h2Ref, ANIMATE_BREAKPOINT * 1.2);
    const recommendedProducts:(ProductType | undefined)[] = products.map((prdName)=> store.products.find((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase()))

    return (
        <section className={styles.Recommended}>
            <div>
                <h2 ref={h2Ref}>También te puede interesar</h2>
            </div>
            <div className={styles.recommendeds}>
                {recommendedProducts.map((product, i)=>
                product &&
                <motion.div 
                initial={{opacity: 0, x: 30}}
                animate={isIntersecting && {opacity: 1, x: 0}}
                transition={{duration: 2, delay: (i+1) * .3, ease: "easeOut"}}
                className={styles.item}
                key={product.name} 
                >
                    <Link href={`/${product.category}/${product.name}`}>
                        <div>
                            <div className={styles.image}>
                                <Image layout="fill" objectFit={product.category === 'relojes' ? 'cover' : 'contain'} src={`/${product.category}/${product.name}/recommended.webp`} alt={product.name} />
                            </div>
                            <div className={styles.info}>
                                <h3>{capitalize(product.name)}</h3>
                                <div>${product.price}</div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
                )}
            </div>
        </section>
    )
}

export default Recommended;