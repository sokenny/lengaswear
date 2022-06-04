import { spinner } from '@/utils/icons';
import styles from './Spinner.module.scss';

const Spinner:React.FC<{size?:number, color?:string}> = ({size=15, color="gray"}) => {
    return (
        <div className={styles.Spinner}>
            {spinner(size, color)}
        </div> 
    )
}

export default Spinner;