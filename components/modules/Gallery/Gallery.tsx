import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen, variants } from '@/utils/index';
import Image from 'next/image';
import styles from './Gallery.module.scss';

const Gallery:React.FC = () => {
    
    const titleRef = useRef<HTMLDivElement>(null);
    const titleIntersecting = useOnScreen(titleRef);
    const BASE_DELAY = .2;

    const motionProps = {
        variants: variants.slideUp,
        initial: 'hidden',
        animate: titleIntersecting && 'visible',
        transition: {delay: BASE_DELAY, duration: .5}
    }

    return (
        <section 
        className={styles.Gallery}
        >
            <div>
                <div>
                    <motion.h3 
                    {...motionProps}
                    ref={titleRef}
                    >
                        Uno con la naturaleza
                    </motion.h3>
                </div>
                <motion.div 
                className={styles.image}
                {...motionProps}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-1.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
                <motion.div 
                className={styles.image}
                {...motionProps}
                transition={{...motionProps.transition, delay: BASE_DELAY + .8}}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-2.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
            </div>
            <div>
                <motion.div 
                className={styles.image}
                {...motionProps}
                transition={{...motionProps.transition, delay: BASE_DELAY + .5}}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-3.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
                <motion.div 
                className={styles.image}
                {...motionProps}
                transition={{...motionProps.transition, delay: BASE_DELAY + 1}}
                >
                    <Image src="/gallery/relojes-de-madera-artesanales-4.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                </motion.div>
            </div>
        </section>
    )
}

export default Gallery;