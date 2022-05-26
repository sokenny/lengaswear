import { capitalize } from '@/utils/index';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Recommended.module.scss';

export type TRecommended = {
    name: string,
    image: string,
    href: string,
    price: number,
}

const Recommended:React.FC<{products: TRecommended[]}> = ({products}) => {
    return (
        <section className={styles.Recommended}>
            <div>
                <h2>También te puede interesar</h2>
            </div>
            <div>
                {products.map((product)=>
                <Link href={product.href} key={product.name} >
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <Image layout="fill" objectFit='contain' src={product.image} />
                        </div>
                        <div className={styles.info}>
                            <h3>{capitalize(product.name)}</h3>
                            <div>{product.price}</div>
                        </div>
                    </div>
                </Link>
                )}
            </div>
        </section>
    )
}

export default Recommended;