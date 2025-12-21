import styles from '../../styles/UI/Button.module.css'

const Button = ({ children, onClick, ...props}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;