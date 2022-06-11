import { arrow } from '@/utils/icons';
import Spinner from '../Spinner/Spinner';
import Input from '../Input/Input';
import styles from './ArrowInput.module.scss';

const ArrowInput:React.FC<{
    value:string | number, 
    onChange:(value:string | number)=>void, 
    type?:string, placeholder?:string, 
    loading?:boolean, 
    inForm?: boolean,
    valid?:boolean
}> = ({value, onChange, type="text", placeholder="", loading=false, inForm=false, valid=true}) => {
    
    const Arrow = <div>{arrow(25, "gray")}</div> 
    
    return (
        <div className={styles.ArrowInput}>
            
            <Input type={type} value={value} placeholder={placeholder} onChange={onChange} />
            
            {loading ? 
            <div className={styles.loader}>
                <Spinner />
            </div>
            : 
            <div className={styles.arrowContainer}>
                {inForm ? 
                <button type="submit">
                    {Arrow}
                </button>
                :
                Arrow
                }
            </div>
            }
        </div>
    )
} 

export default ArrowInput;