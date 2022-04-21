import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './HeroStripe.module.scss';

type HeroStripeProps= {
    title: string,
    description: string,
    cta: string,
    image: string,
}

const HeroStripe:React.FC<HeroStripeProps> = ({title, description, cta, image}) => {
    return (
        <section className={styles.HeroStripe} style={{backgroundImage: `url('${image}')`}}>
            <div>
                <h3 className={styles.HeroStripe__title}>{title}</h3>
                <p className={styles.HeroStripe__description}>{description}</p>
                <ArrowCta cta={cta} />
            </div>
        </section>
    )
}

export default HeroStripe;