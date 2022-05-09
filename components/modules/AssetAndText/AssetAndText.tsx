import { ReactNode } from 'react';
import styles from './AssetAndText.module.scss';

type AssetAndTextProps = {
    title: string,
    description: string,
    asset: string | ReactNode,
    ctaSection?:ReactNode,
    assetLeft?: boolean,
}

const AssetAndText:React.FC<AssetAndTextProps> = ({title, description, asset, ctaSection=false, assetLeft=true}) => {
    return (
        <section className={`${styles.AssetAndText} ${styles[`AssetAndText-asset${assetLeft ? 'Left' : 'Rigth'}`]}`}>
            <div className={styles.asset}>
                {typeof asset === 'string' ? <img src={asset}/> : asset}
            </div>
            <div className={styles.text}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.ctaSection}>
                    {ctaSection}
                </div>
            </div>
        </section>
    )
}

export default AssetAndText;