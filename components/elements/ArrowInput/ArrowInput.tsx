import { arrow } from '@/utils/icons';
import Input from '../Input/Input';
import styles from './ArrowInput.module.scss';

const ArrowInput:React.FC<{value:string | number, onChange:(value:string | number)=>void, type?:string, placeholder?:string}> = ({value, onChange, type="text", placeholder=""}) => {
    return (
        <div className={styles.ArrowInput}>
            <Input type={type} value={value} placeholder={placeholder} onChange={onChange} />
            <div>{arrow(25, "gray")}</div>
        </div>
    )
} 

export default ArrowInput;