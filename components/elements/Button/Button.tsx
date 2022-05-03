import styles from './Button.module.scss';

type ButtonProps = {
    onClick: () => void,
    theme?: string,
    children: string,
}

const Button:React.FC<ButtonProps> = ({onClick, theme, children}) => {
    return (
        <button className={`${styles.Button} ${styles[`Button-${theme ? theme : 'main'}`]}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;