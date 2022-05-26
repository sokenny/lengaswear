import styles from './Input.module.scss';

const Input:React.FC<{value:string | number, onChange:(value:string | number)=>void, type?:string, placeholder?:string, name?:string, disabled?:boolean}> = ({value, onChange, type="text", placeholder="", name="", disabled=false}) => {
    return (
        <input className={styles.Input} type={type} value={value} placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} name={name} disabled={disabled} />
    )
}

export default Input;