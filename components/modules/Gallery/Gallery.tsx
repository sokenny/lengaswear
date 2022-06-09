import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen, getMotionProps } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import Image from 'next/image';
import styles from './Gallery.module.scss';

const Gallery:React.FC = () => {
    
    const titleRef = useRef<HTMLDivElement>(null);
    const isIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT);
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;

    return (
        <section 
        className={styles.Gallery}
        >
            <div>
                <div>
                    <motion.h3 
                    {...getMotionProps("slideVertical", hasIntersected.current)}
                    ref={titleRef}
                    >
                        Uno con la naturaleza
                    </motion.h3>
                </div>
                <motion.div 
                className={styles.image}
                {...getMotionProps("slideVertical", hasIntersected.current)}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-1.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
                <motion.div 
                className={styles.image}
                {...getMotionProps("slideVertical", hasIntersected.current, {delay: .8})}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-2.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
            </div>
            <div>
                <motion.div 
                className={styles.image}
                {...getMotionProps("slideVertical", hasIntersected.current, {delay: .5})}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-3.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
                <motion.div 
                className={styles.image}
                {...getMotionProps("slideVertical", hasIntersected.current, {delay: 1})}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-4.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
            </div>
        </section>
    )
}

export default Gallery;