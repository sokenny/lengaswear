import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen, variants } from '@/utils/index';
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './HeroStripe.module.scss';

type HeroStripeProps= {
    title: string,
    description: string,
    cta: string,
    image: string,
}

const HeroStripe:React.FC<HeroStripeProps> = ({title, description, cta, image}) => {

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
        <section className={styles.HeroStripe} style={{backgroundImage: `url('${image}')`}}>
            <div>
                <motion.h3 
                className={styles.HeroStripe__title} 
                {...motionProps}
                transition={{...motionProps.transition, duration: .9}}
                ref={titleRef}
                >
                    {title}
                </motion.h3>
                <motion.p 
                className={styles.HeroStripe__description}
                {...motionProps}
                transition={{delay: BASE_DELAY + .2, duration: .7}}
                >
                    {description}
                </motion.p>
                <motion.div
                {...motionProps}
                transition={{delay: BASE_DELAY + .4, duration: .5}}
                >
                    <ArrowCta cta={cta} />
                </motion.div>
            </div>
        </section>
    )
}

export default HeroStripe;