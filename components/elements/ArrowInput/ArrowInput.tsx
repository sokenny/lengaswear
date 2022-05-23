import { arrow } from '@/utils/icons';
import styles from './ArrowInput.module.scss';

const ArrowInput:React.FC<{value:string, onChange:(val:string)=>void, type?:string, placeholder?:string}> = ({value, onChange, type="text", placeholder=""}) => {
    return (
        <div className={styles.ArrowInput}>
            <input type={type} value={value} placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} />
            <div>{arrow(25, "gray")}</div>
        </div>
    )
} 

export default ArrowInput;