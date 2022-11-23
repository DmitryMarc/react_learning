import { connect } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { loginTC } from "../../Redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { FC } from "react";
import { AppStateType } from "../../Redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null | undefined
}

const LoginForm:FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
                {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
                {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "rememder me")}

                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null | undefined,
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const Login:FC<LoginPropsType> = (props) => {

    const onSubmit = (formData:LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, { login: loginTC })(Login);





