import { useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './HeroBanner.module.scss';

type HeroBannerProps = {
    title: string,
    subtitle: string,   
    image: string,
    cta: string,
    onClick: () => void,
}

const HeroBanner:React.FC<HeroBannerProps> = ({title, subtitle, cta, image, onClick}) => {

    const [cursor, setCursor] = useState({x: 0, y: 0})

    return (
        <section 
        className={styles.HeroBanner}
        onMouseMove={(e)=>setCursor({x: e.clientX, y: e.clientY})}
        >
            <div className={styles.text}>
                <h2 className={styles.subtitle}>{subtitle}</h2>
                <h1 className={styles.title}>{title}</h1>
                <span onClick={onClick}><ArrowCta cta={cta} /></span>
            </div>
            <div className={styles.background}>
                <div>
                    <div className={styles.base}>
                        <Image src={'/stich-1.webp'} alt="craftman working" layout="fill" objectFit="cover" />
                    </div>
                    <motion.div 
                    className={styles.mask}
                    style={{y: -cursor.y / 150, x: -cursor.x / 150, scale: 1.15}}
                    >
                        <Image src={'/stich-2.webp'} alt="craftman working" layout="fill" objectFit="cover" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner;