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

    return (
        <section 
        className={styles.HeroBanner}
        >
            <div className={styles.text}>
                <h2 className={styles.subtitle}>{subtitle}</h2>
                <h1 className={styles.title}>{title}</h1>
                <div onClick={onClick}>
                    <ArrowCta cta={cta} />
                </div>
            </div>
            <div className={styles.background}>
                <div>
                    <div className={styles.overlay} />
                    <div className={styles.base}>
                        <Image src={image} alt="craftman working" layout="fill" objectFit="cover" placeholder="blur" blurDataURL={`blur-${image}`} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner;