import Link from 'next/link';
import { ProductType } from 'types';
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
                        <h1>{title}</h1>
                        <h2>{description}</h2>
                    </div>
                    <section className={styles.products}>
                        {products.map((product)=>
                            <Link href={product.href} passHref>
                                <div>
                                    <ProductItem product={product} />
                                </div>
                            </Link>
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
        <div className={styles.ProductItem}>
            <div className={styles.ProductItem__image}>
                <img src={product.image} alt={product.name} />
            </div>
            <div>
                <h3>{product.name}</h3>
                <div>{product.price}</div>
            </div>
        </div>
    )
}

export default ProductCategory