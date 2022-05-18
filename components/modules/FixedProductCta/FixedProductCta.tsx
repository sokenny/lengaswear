import { ProductType } from 'types';
import Button from '@/components/elements/Button/Button';
import styles from './FixedProductCta.module.scss';

const FixedProductCta:React.FC<{product:ProductType}> = ({product}) => {
    return  (
        <div className={styles.FixedProductCta}>
            <div>
                <div className={styles.productInfo}>
                    <h1>{product.name}</h1><div>${product.price}</div>
                </div>
                <div className={styles.ctas}>
                    <Button onClick={()=>{}} theme="light">Elegir color</Button>
                    <Button onClick={()=>{}}>Agregar al carrito</Button>
                </div>
            </div>
        </div>
    )
}

export default FixedProductCta;