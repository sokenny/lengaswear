import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen, getMotionProps, scrollTo } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './HeroStripe.module.scss';

type HeroStripeProps= {
    title: string,
    description: JSX.Element,
    cta: string,
    image: string,
    extraText?:JSX.Element
}

const HeroStripe:React.FC<HeroStripeProps> = ({title, description, cta, image, extraText}) => {

    const [expand, setExpand] = useState<boolean>(false);
    const titleRef = useRef<HTMLDivElement>(null);
    const isIntersecting = useOnScreen(titleRef, ANIMATE_BREAKPOINT * .8);
    const hasIntersected = useRef(false)
    if(isIntersecting && !hasIntersected.current) hasIntersected.current = true;

    function handleCtaClick(){
        setExpand(true)
        scrollTo(titleRef, -150)
    }

    return (
        <section className={styles.HeroStripe} style={{backgroundImage: `url('${image}')`}}>
            <div>
                <motion.h3 
                className={styles.HeroStripe__title} 
                {...getMotionProps("slideVertical", hasIntersected.current)}
                ref={titleRef}
                >
                    {title}
                </motion.h3>
                <motion.p 
                className={styles.HeroStripe__description}
                {...getMotionProps("slideVertical", hasIntersected.current, {delay: .2})}
                >
                    {description}
                </motion.p>
                <motion.div
                className={styles.ctaContainer}
                {...getMotionProps("slideVertical", hasIntersected.current, {delay: .4})}
                >
                    {!expand &&
                        <div onClick={handleCtaClick}>
                            <ArrowCta cta={cta} />
                        </div>
                    }
                </motion.div>
                {extraText && 
                <motion.p
                className={styles.extraText}
                initial={{opacity: 0, height: 0}}
                animate={expand && {opacity: 1, height: "auto", transition: {duration: .5, stiffness: 0}}}
                >
                    {extraText}
                </motion.p>
                }
            </div>
        </section>
    )
}

export default HeroStripe;