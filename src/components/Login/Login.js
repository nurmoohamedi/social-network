import styles from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Input} from "../../utils/validators/FormValidator";
import {Navigate} from 'react-router-dom'
import {login} from "../../redux/auth-reducer";

let LoginForm = (props) => {
    return (
        <div className={styles.login}>
            <form onSubmit={props.handleSubmit} className={styles.form}>
                <div>
                    <p>Login</p>
                    <Field component={Input} type={'text'} name={"email"} label={'Login'}/>
                </div>
                <div>
                    <p>Password</p>
                    <Field component={Input} type={'password'} name={"password"} label={'Password'}/>
                </div>
                <div>
                    <Field component={Input} type={'checkbox'} name={"rememberMe"} label={'Remember Me'}/>
                    Remember me
                </div>
                {
                    props.error &&
                    <div className={styles.error}>
                        <span>{props.error}</span>
                    </div>
                }

                {props.captchaUrl && <img src={props.captchaUrl} alt="captchaUrl"/>}
                {props.captchaUrl && <Field label={"Captcha text"} name={"captcha"} component={Input}/>}

                <button className={styles.login__btn}>Login</button>
            </form>
        </div>
    )
}

const validate = (values) => {
    const errors = []

    if (!values.email)
        errors.email = 'Required!'

    if (!values.password)
        errors.password = 'Must have!'
    else if (values.password.length < 15)
        errors.password = 'Your password too short!'

    return errors;
}
const warn = (values) => {
    const warning = []

    if (!values.rememberMe)
        warning.rememberMe = 'Do you really don\'t need to remember?!';

    return warning;
}

LoginForm = reduxForm({form: 'login', validate, warn})(LoginForm);

const Login = (props) => {

    let onSubmit = (formData) => {
        props.login(formData);
    }

    if (props.isAuth)
        return <Navigate to={'/profile'}/>

    return (
        <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>

    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login);