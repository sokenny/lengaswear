import { arrow } from '@/utils/icons';
import Spinner from '../Spinner/Spinner';
import Input from '../Input/Input';
import styles from './ArrowInput.module.scss';

const ArrowInput:React.FC<{value:string | number, onChange:(value:string | number)=>void, type?:string, placeholder?:string, loading?:boolean}> = ({value, onChange, type="text", placeholder="", loading=false}) => {
    return (
        <div className={styles.ArrowInput}>
            <Input type={type} value={value} placeholder={placeholder} onChange={onChange} />
            
            {loading ? 
            <div className={styles.loader}>
                <Spinner />
            </div>
            : 
            <div>{arrow(25, "gray")}</div> 
            }
        </div>
    )
} 

export default ArrowInput;