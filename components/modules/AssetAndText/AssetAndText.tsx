import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen, variants } from '@/utils/index';
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
    const isIntersecting = useOnScreen(titleRef);
    const BASE_DELAY = .25;

    const motionProps = {
        variants: variants.slideUp,
        initial: 'hidden',
        animate: isIntersecting && 'visible',
        transition: {delay: BASE_DELAY, duration: .5}
    }

    return (
        <section className={`${styles.AssetAndText} ${styles[`AssetAndText-asset${assetLeft ? 'Left' : 'Rigth'}`]}`} data-component="AssetAndText">
            <div className={styles.asset}>
                {typeof asset === 'string' ? <img src={asset}/> : asset}
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
                transition={{delay: BASE_DELAY + .2, duration: .7}}
                >
                    {description}
                </motion.p>
                {ctaSection &&
                <motion.div 
                className={styles.ctaSection}
                {...motionProps}
                transition={{delay: BASE_DELAY + .4, duration: .9}}
                >
                    {ctaSection}
                </motion.div>
                }
            </div>
        </section>
    )
}

export default AssetAndText;