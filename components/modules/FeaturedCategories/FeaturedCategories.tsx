import Link from 'next/link'
import ArrowCta from '@/components/elements/ArrowCta/ArrowCta';
import styles from './FeaturedCategories.module.scss';

const FeaturedCategories:React.FC = () => {
    return (
        <section className={styles.FeaturedCategories}>
            <Link href="/relojes" passHref>
            <div className={styles.watches} style={{backgroundImage: `url('/categoria-relojes.webp')`}}>
                <div>
                    <h3>Inspirados en la Patagonia</h3>
                    <ArrowCta cta="VER RELOJES" />
                </div>
            </div>
            </Link>
            <Link href="/billeteras">
            <div className={styles.wallets} style={{backgroundImage: `url('/categoria-billeteras.webp')`}}>
                <div>
                    <h3>Descubrí lo nuevo</h3>
                    <ArrowCta cta="VER BILLETERAS" />
                </div>
            </div>
            </Link>
        </section>
    )
}

export default FeaturedCategories;