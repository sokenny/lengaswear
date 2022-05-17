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
        <section className={styles.HeroBanner} style={{backgroundImage: `url('${image}')`}}>
            <h2 className={styles.subtitle}>{subtitle}</h2>
            <h1 className={styles.title}>{title}</h1>
            <span onClick={onClick}><ArrowCta cta={cta} /></span>
        </section>
    )
}

export default HeroBanner;