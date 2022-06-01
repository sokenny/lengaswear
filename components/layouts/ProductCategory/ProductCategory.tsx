import { ProductType } from 'types';
import { motion } from 'framer-motion';
import { formatNumber, getMotionProps } from '@/utils/index';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCategory.module.scss';

type ProductCategoryProps = {
    title:string,
    description: string,
    products: ProductType[]
}

const ProductCategory:React.FC<ProductCategoryProps> = ({title, description, products}) => {
    return (
        <div className={styles.ProductCategory}>
            <div className={styles.container}>
                <main>
                    <div className={styles.header}>
                        <motion.h1 {...getMotionProps("slideUp")}>
                            {title}
                        </motion.h1>
                        <motion.h2 {...getMotionProps("slideUp", true, {duration: 1.2})}>
                            {description}
                        </motion.h2>
                    </div>
                    <section 
                    className={styles.products}
                    >
                        {products.map((product, i)=>
                            <motion.div 
                            key={product.name}
                            {...getMotionProps("slideUp", true, {duration: 1.2, delay: (i) * .1})}
                            >
                                <ProductItem product={product} />
                            </motion.div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

type ProductItemProps = {
    product: ProductType
}

const ProductItem:React.FC<ProductItemProps> = ({product}) => {
    return (
        <Link href={product.href}>
            <a>
                <div className={styles.ProductItem}>
                    <div className={styles.ProductItem__image}>
                        <Image src={product.image || ""} layout="fill" objectFit="cover" alt={product.name} />
                    </div>
                    <div>
                        <h3>{product.name}</h3>
                        <div>{formatNumber(product.price)}</div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProductCategory