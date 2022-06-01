import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen, getMotionProps } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
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
    const isIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT * .8);
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;

    return (
        <section className={styles.HeroStripe} style={{backgroundImage: `url('${image}')`}}>
            <div>
                <motion.h3 
                className={styles.HeroStripe__title} 
                {...getMotionProps("slideUp", hasIntersected.current)}
                ref={titleRef}
                >
                    {title}
                </motion.h3>
                <motion.p 
                className={styles.HeroStripe__description}
                {...getMotionProps("slideUp", hasIntersected.current, {delay: .2})}
                >
                    {description}
                </motion.p>
                <motion.div
                {...getMotionProps("slideUp", hasIntersected.current, {delay: .4})}
                >
                    <ArrowCta cta={cta} />
                </motion.div>
            </div>
        </section>
    )
}

export default HeroStripe;