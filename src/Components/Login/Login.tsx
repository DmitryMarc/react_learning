import { useDispatch, useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, GetStringKeysType, Input } from "../common/FormsControls/FormsControls";
import { loginTC } from "../../Redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { FC } from "react";
import { AppDispatchType, AppStateType } from "../../Redux/redux-store";

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

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeysType<LoginFormValuesType>;

export const LoginPage:FC = () => {
    // const captchaUrl = useSelector<AppStateType>((state) => state.auth.captchaUrl)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch:AppDispatchType = useDispatch();

    const onSubmit = (formData:LoginFormValuesType) => {
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}





