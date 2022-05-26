import styles from './Button.module.scss';

type ButtonProps = {
    onClick: () => void,
    theme?: string,
    active?:boolean,
    children: string,
}

const Button:React.FC<ButtonProps> = ({onClick, theme, children, active=true}) => {
    return (
        <button className={`${styles.Button} ${styles[`Button-${theme ? theme : 'main'}`]} ${!active ? styles['Button-inActive'] : '' }`} onClick={active ? onClick : undefined}>
            {children}
        </button>
    )
}

export default Button;