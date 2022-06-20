import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useOnScreen, getMotionProps } from '@/utils/index';
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
    
    const hasComplexAsset = typeof asset !== 'string';    
    const titleRef = useRef<HTMLDivElement>(null);
    const titleIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT);
    const titleIntersected = useRef(false)
    if(titleIntersecting && !titleIntersected.current) titleIntersected.current = true;
    const assetRef = useRef<HTMLDivElement>(null);
    const assetIntersecting = useOnScreen(assetRef, ANIMATE_BREAKPOINT);
    const assetIntersected = useRef(false)
    if(assetIntersecting && !assetIntersected.current) assetIntersected.current = true;


    return (
        <section 
        className={`${styles.AssetAndText} ${styles[`AssetAndText-asset${assetLeft ? 'Left' : 'Rigth'}`]} ${hasComplexAsset ? styles[`AssetAndText-complexAsset`] : ''}`} 
        data-component="AssetAndText">
            <div className={styles.asset} ref={assetRef}>
                {typeof asset === 'string' ? 
                <motion.div 
                initial={{scale: 1.2}}
                animate={assetIntersecting && {scale: 1}}
                transition={{duration: 1.5}}
                className={styles.imgContainer}
                >
                    <Image src={asset} layout="fill" objectFit='cover' alt={title} /> 
                </motion.div>
                : 
                asset}
            </div>
            <div className={styles.text}>
                <motion.h3
                {...getMotionProps("slideVertical", titleIntersected.current)}
                ref={titleRef}
                >
                    {title}
                </motion.h3>
                <motion.p
                {...getMotionProps("slideVertical", titleIntersected.current, {delay: .2})}
                >
                    {description}
                </motion.p>
                {ctaSection &&
                <motion.div 
                className={styles.ctaSection}
                {...getMotionProps("slideVertical", titleIntersected.current, {delay: .4})}
                >
                    {ctaSection}
                </motion.div>
                }
            </div>
        </section>
    )
}

export default AssetAndText;