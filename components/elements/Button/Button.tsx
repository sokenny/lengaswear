import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

type ButtonProps = {
    onClick: () => void,
    theme?: string,
    active?:boolean,
    loading?:boolean,
    children: string,
}

const Button:React.FC<ButtonProps> = ({onClick, theme, children, active=true, loading=false}) => {
    return (
        <button 
        className={`${styles.Button} ${styles[`Button-${theme ? theme : 'main'}`]} ${!active ? styles['Button-inActive'] : '' } ${loading ? styles['Button-loading'] : '' }`} 
        onClick={active ? onClick : undefined}
        >
            {
            loading ? 
            <Spinner color="white" /> 
            : 
            children
            }
        </button>
    )
}

export default Button;