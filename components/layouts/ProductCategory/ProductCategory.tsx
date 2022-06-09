import { ProductType } from 'types';
import { motion } from 'framer-motion';
import { formatNumber, getMotionProps, capitalize, useIsMobile } from '@/utils/index';
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
                        <motion.h1 {...getMotionProps("slideVertical")}>
                            {title}
                        </motion.h1>
                        <motion.h2 {...getMotionProps("slideVertical", true, {duration: 1.2})}>
                            {description}
                        </motion.h2>
                    </div>
                    <section 
                    className={styles.products}
                    >
                        {products.map((product, i)=>
                            <motion.div 
                            key={product.name}
                            {...getMotionProps("slideVertical", true, {duration: 1.2, delay: (i) * .1})}
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

    const isMobile = useIsMobile();

    return (
        <Link href={`${product.category}/${product.name}`}>
            <a>
                <div className={styles.ProductItem}>
                    <div className={styles.ProductItem__image}>
                        <Image src={`/${product.category}/${product.name}/thumbnail.webp`} layout="fill" objectFit="cover" alt={product.name} />
                    </div>
                    <div>
                        <h3>{capitalize(product.name)}</h3>
                        {product.price === product.sellingPrice ? 
                        <div className={styles.price}>${formatNumber(product.price)}</div>
                        :
                        <div className={styles.wDiscount}>
                            <div className={styles.price}>
                                <div>
                                    ${formatNumber(product.price)}
                                </div>
                                <motion.div 
                                className={styles.lineThrough} 
                                initial={{width: 0}}
                                animate={{width: isMobile ? 50 : 60}}
                                transition={{duration: .5, delay: .35, ease: "circIn"}}
                                />
                            </div>
                            <motion.div 
                            className={styles.sellingPrice}
                            {...getMotionProps("slideVertical", true, {value:-10, delay: .7, duration: .5})}
                            >
                                ${formatNumber(product.sellingPrice)}
                            </motion.div>
                        </div>
                        }
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProductCategory