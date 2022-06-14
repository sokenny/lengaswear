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
        onClick={(e)=>active ? onClick() : e.preventDefault()}
        >
            {
            loading ?
            <>
                <div style={{opacity: 0}}>{children}</div>
                <div style={{position: "absolute"}}>
                    <Spinner color="white" /> 
                </div> 
            </>
            : 
            children
            }
        </button>
    )
}

export default Button;