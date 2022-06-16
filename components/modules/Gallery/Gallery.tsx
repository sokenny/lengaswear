import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnScreen, getMotionProps, scrollTo } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import Image from 'next/image';
import styles from './Gallery.module.scss';

const Gallery:React.FC = () => {
    
    const titleRef = useRef<HTMLDivElement>(null);
    const verMasRef = useRef<HTMLDivElement>(null);
    const isIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT);
    const hasIntersected = useRef(false)
    const [showMore, setShowMore] = useState<boolean>(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;

    return (
        <section 
        className={styles.Gallery}
        >
            <div className={styles.content}>
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
                    className={`${styles.image} ${styles.image__one}`}
                    {...getMotionProps("slideVertical", hasIntersected.current)}
                    >
                        <Image src="/gallery/relojes-de-madera-artesanales-1.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                    </motion.div>
                    <motion.div 
                    className={`${styles.image} ${styles.image__two}`}
                    {...getMotionProps("slideVertical", hasIntersected.current, {delay: .8})}
                    >
                        <Image src="/gallery/relojes-de-madera-artesanales-2.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                    </motion.div>

                    <AnimatePresence>
                    {showMore &&
                        <>
                        <motion.div 
                        className={`${styles.image} ${styles.image__four}`}
                        {...getMotionProps("slideVertical", true)}
                        >
                            <Image src="/gallery/relojes-de-madera-artesanales-6.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                        </motion.div>
                        <motion.div 
                        className={`${styles.image} ${styles.image__three}`}
                        {...getMotionProps("slideVertical", true)}
                        >
                            <Image src="/gallery/relojes-de-madera-artesanales-5.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                        </motion.div>
                        </>
                    }
                    </AnimatePresence>    
                </div>
                <div>
                    <motion.div 
                    className={`${styles.image} ${styles.image__three}`}
                    {...getMotionProps("slideVertical", hasIntersected.current, {delay: .5})}
                    >
                        <Image src="/gallery/relojes-de-madera-artesanales-3.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                    </motion.div>
                    <motion.div 
                    className={`${styles.image} ${styles.image__four}`}
                    {...getMotionProps("slideVertical", hasIntersected.current, {delay: 1})}
                    >
                        <Image src="/gallery/relojes-de-madera-artesanales-4.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                    </motion.div>

                    <AnimatePresence>
                    {showMore &&
                        <>
                        <motion.div 
                        className={`${styles.image} ${styles.image__one}`}
                        {...getMotionProps("slideVertical", true)}
                        >
                            <Image src="/gallery/relojes-de-madera-artesanales-8.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                        </motion.div>
                        <motion.div 
                        className={`${styles.image} ${styles.image__two}`}
                        {...getMotionProps("slideVertical", true)}
                        >
                            <Image src="/gallery/relojes-de-madera-artesanales-7.webp" layout="fill" objectFit='cover' alt="Reloj de madera artesanal" />
                        </motion.div>
                        </>
                    }
                    </AnimatePresence>    
                </div>
            </div>
            {!showMore &&
            <div className={styles.verMas} ref={verMasRef}>
                <motion.div 
                {...getMotionProps("slideVertical", hasIntersected.current, {delay: 1.5})}
                onClick={()=>{setShowMore(true); scrollTo(verMasRef, -120)}}
                >
                    Ver mas
                </motion.div>
            </div>
            }
        </section>
    )
}

export default Gallery;