import { useRef } from 'react';
import { motion } from 'framer-motion';
import { capitalize, useOnScreen } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Recommended.module.scss';

export type TRecommended = {
    name: string,
    image: string,
    href: string,
    price: number,
}

const Recommended:React.FC<{products: TRecommended[]}> = ({products}) => {

    const h2Ref = useRef<HTMLHeadingElement>(null);
    const isIntersecting = useOnScreen(h2Ref, ANIMATE_BREAKPOINT * 1.2);

    return (
        <section className={styles.Recommended}>
            <div>
                <h2 ref={h2Ref}>También te puede interesar</h2>
            </div>
            <div className={styles.recommendeds}>
                {products.map((product, i)=>
                <motion.div 
                initial={{opacity: 0, x: 30}}
                animate={isIntersecting && {opacity: 1, x: 0}}
                transition={{duration: 2, delay: (i+1) * .3, ease: "easeOut"}}
                className={styles.item}
                key={product.name} 
                >
                    <Link href={product.href}>
                        <div>
                            <div className={styles.image}>
                                <Image layout="fill" objectFit='contain' src={product.image} alt={product.name} />
                            </div>
                            <div className={styles.info}>
                                <h3>{capitalize(product.name)}</h3>
                                <div>{product.price}</div>
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