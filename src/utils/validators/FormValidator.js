import styles from './FormValidator.module.css'

export const required = (value) => {
    if (value) return undefined
    return 'Field is required!'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (!value.postText)
        return 'Field can not be empty!';
    else if (value.postText.length > maxLength)
        return `Max length is ${maxLength}`;
}

export const Textarea = ({ input, label, type, meta: { touched, error, warning } }) => {
    const hasError = touched && error;
    return (
        <div >
            <textarea cols={1} rows={1} {...input} placeholder={label} className={hasError && styles.form}/>
            <br/>
            {hasError && <span className={styles.error}>{error}</span>}
        </div>
    )
}

export const Input = ({ input, label, type, meta: { touched, error, warning } }) => {
    const hasError = touched && error;
    return (
        <div >
            <input {...input} type={type} placeholder={label} className={hasError && styles.form} />
            <p>
            {touched && (error&& <span className={styles.error}>{error}</span>)}
            {(warning && <span className={styles.warning}>{warning}</span>)}
            </p>
        </div>
    )
}