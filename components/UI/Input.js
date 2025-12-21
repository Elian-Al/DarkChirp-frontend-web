import styles from '../../styles/UI/Input.module.css'

const Input = ({ ...props}) => {
    return (
        <input
            className={styles.input}
            {...props}
        />        
    )
}

export default Input;