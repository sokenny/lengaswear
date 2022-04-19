import { NextPage } from "next"
import Head from "next/head"
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    return (
        <div className={styles.Home}>
            <HeroBanner title="artesanales" subtitle="Piezas de tiempo" cta="Ver productos" image="/home-banner.webp" />
            <FeaturedCategories />
            <StoreInfo />
        </div>
    )
}

type HeroBannerProps = {
    title: string,
    subtitle: string,   
    image: string,
    cta: string,
}

const HeroBanner: React.FC<HeroBannerProps> = ({title, subtitle, cta, image}) => {
    return (
        <section className={styles.HeroBanner} style={{backgroundImage: `url('${image}')`}}>
            <h2 className={styles.HeroBanner__subtitle}>{subtitle}</h2>
            <h1 className={styles.HeroBanner__title}>{title}</h1>
            <ArrowCta cta={cta} />
        </section>
    )
}

const FeaturedCategories: React.FC = () => {
    return (
        <section className={styles.FeaturedCategories}>
            <div className={styles.FeaturedCategories__watches} style={{backgroundImage: `url('/categoria-relojes.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER RELOJES" />
                </div>
            </div>
            <div className={styles.FeaturedCategories__wallets} style={{backgroundImage: `url('/categoria-billeteras.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER BILLETERAS" />
                </div>
            </div>
        </section>
    )
}

type ArrowCtaProps = {
    cta: string,
}

const ArrowCta: React.FC<ArrowCtaProps> = ({cta}) => {
    return (
        <div className={styles.ArrowCta}>
            <div>{cta}</div>
            <div>{`-->`}</div>
        </div>
    )
}

const StoreInfo: React.FC = () => {
    return (
        <section className={styles.StoreInfo}>
            
        </section>
    )
}

export default Home;