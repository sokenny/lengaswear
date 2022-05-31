import { useMemo } from 'react';
import { OptionsType } from 'types';
import styles from './Select.module.scss';

const Select:React.FC<{value:string, onChange:(value:string | number)=>void, options:OptionsType, name?:string, disabled?:boolean, randomize?:boolean}> = ({value, options, onChange, name="", disabled=false, randomize=false}) => {
    
    const optionsList:OptionsType = useMemo(() => {
        if(randomize){
            const randomOptions = options.sort(() => 0.5 - Math.random())
            return randomOptions;
        }else{
            return options;
        }
    } , [options]);
    
    return (
        <select className={styles.Select} value={value} onChange={(e)=>onChange(e.target.value)} name={name} disabled={disabled}>
            <option value=""></option>
            {optionsList.map((option) => 
                <option value={option.value} key={option.value}>{option.label}</option>
            )}
        </select>
    )
}

export default Select;