import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useOnScreen, variants } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import styles from './AssetAndText.module.scss';

type AssetAndTextProps = {
    title: string,
    description: string,
    asset: string | ReactNode,
    ctaSection?:ReactNode,
    assetLeft?: boolean,
}

const AssetAndText:React.FC<AssetAndTextProps> = ({title, description, asset, ctaSection=false, assetLeft=true}) => {
    
    const titleRef = useRef<HTMLDivElement>(null);
    const isIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT);
    const BASE_DELAY = 0;
    const hasComplexAsset = typeof asset !== 'string';

    
    const motionProps = {
        variants: variants.slideUp,
        initial: 'hidden',
        animate: isIntersecting && 'visible',
        transition: {delay: BASE_DELAY, duration: 1, ease: "easeOut"}
    }

    return (
        <section className={`${styles.AssetAndText} ${styles[`AssetAndText-asset${assetLeft ? 'Left' : 'Rigth'}`]} ${hasComplexAsset ? styles[`AssetAndText-complexAsset`] : ''}`} data-component="AssetAndText">
            <div className={styles.asset}>
                {typeof asset === 'string' ? 
                <motion.div 
                initial={{scale: 1.2}}
                animate={isIntersecting && {scale: 1}}
                transition={{duration: 1.5}}
                className={styles.imgContainer}
                >
                    <Image src={asset} layout="fill" objectFit='cover' /> 
                </motion.div>
                : 
                asset}
            </div>
            <div className={styles.text}>
                <motion.h3
                {...motionProps}
                ref={titleRef}
                >
                    {title}
                </motion.h3>
                <motion.p
                {...motionProps}
                transition={{delay: BASE_DELAY + .2, duration: 1, ease: "easeOut"}}
                >
                    {description}
                </motion.p>
                {ctaSection &&
                <motion.div 
                className={styles.ctaSection}
                {...motionProps}
                initial={{opacity: 0, y: -15}}
                transition={{delay: BASE_DELAY + .4, duration: 1, ease: "easeOut"}}
                >
                    {ctaSection}
                </motion.div>
                }
            </div>
        </section>
    )
}

export default AssetAndText;