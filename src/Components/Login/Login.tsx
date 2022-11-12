import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { loginTC } from "../../Redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { FC } from "react";
import { AppStateType } from "../../Redux/redux-store";

type LoginFormPropsType = {
    handleSubmit: any, 
    error: any, 
    captchaUrl: string
}

const LoginForm:FC<LoginFormPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField("Email", "email", [required], Input)}
                {createField("Password", "password", [required], Input, {type: "password"})}
                {createField(null, "rememderMe", [], Input, {type: "checkbox"}, "rememder me")}

                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

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

//@ts-ignore
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null,
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

const Login:FC<LoginPropsType> = (props) => {
    //@ts-ignore
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    debugger;
    return <div>
        <h1>Login</h1>
        {/* @ts-ignore */}
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, { login: loginTC })(Login);





