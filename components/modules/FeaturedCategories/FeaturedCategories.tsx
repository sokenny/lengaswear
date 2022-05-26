import { useRef } from 'react';
import { motion } from 'framer-motion'
import { useOnScreen, useIsMobile } from '@/utils/index';
import { ANIMATE_BREAKPOINT } from '@/utils/constants';
import Link from 'next/link'
import Image from 'next/image'
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './FeaturedCategories.module.scss';

const FeaturedCategories:React.FC = () => {

    return (
        <section className={styles.FeaturedCategories}>
            <Link href="/relojes" passHref>
            <div>
                <CategoryPoster title="Inspirados en la Patagonia" image="/categoria-relojes.webp" cta="VER RELOJES" href="/relojes" />
            </div>
            </Link>
            <Link href="/billeteras">
            <div>
                <CategoryPoster title="Descubrí lo nuevo" image="/categoria-billeteras.webp" cta="VER BILLETERAS" href="/billeteras" />
            </div>
            </Link>
        </section>
    )
}

type CategoryPosterProps = {
    image: string,
    title: string,
    cta: string,
    href: string
}

const CategoryPoster:React.FC<CategoryPosterProps> = ({image, title, cta, href}) => {
    
    const isMobile = useIsMobile();
    const textRef = useRef(null);
    const isOnScreen = useOnScreen(textRef, ANIMATE_BREAKPOINT * (isMobile ? .8 : .5));
    const BASE_DELAY = 0;

    return (
        <div className={styles.CategoryPoster}>
            <div ref={textRef}>
                <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={isOnScreen && { opacity: 1, y: 0 }}
                transition={{duration: 1, delay: BASE_DELAY+.1}}
                >
                    {title}
                </motion.h3>
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isOnScreen && { opacity: 1, y: 0 }}
                transition={{duration: 1, delay: BASE_DELAY+.2}}
                >
                    <ArrowCta cta={cta} />
                </motion.div>
            </div>
            <motion.div 
            className={styles.CategoryPoster__image}
            initial={{scale: 1.2}}
            animate={isOnScreen && {scale: 1}}
            transition={{duration: 1, delay: BASE_DELAY}}
            >
                <div>
                    <Image src={image} layout="fill" objectFit="cover" />
                </div>
            </motion.div>
        </div>
    )
}

export default FeaturedCategories;