import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './FeaturedCategories.module.scss';

const FeaturedCategories:React.FC = () => {
    return (
        <section className={styles.FeaturedCategories}>
            <div className={styles.watches} style={{backgroundImage: `url('/categoria-relojes.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER RELOJES" />
                </div>
            </div>
            <div className={styles.wallets} style={{backgroundImage: `url('/categoria-billeteras.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER BILLETERAS" />
                </div>
            </div>
        </section>
    )
}

export default FeaturedCategories;