import { arrow } from '@/utils/icons';
import styles from './ArrowCta.module.scss';

type ArrowCtaProps = {
    cta: string,
    color?: string,
}

const ArrowCta:React.FC<ArrowCtaProps> = ({cta, color="white"}) => {
    return (
        <div className={styles.ArrowCta}>
            <div>{cta}</div>
            <div>{arrow(25, color)}</div>
        </div>
    )
}

export default ArrowCta;