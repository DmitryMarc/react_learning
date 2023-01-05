import { useDispatch, useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import {
    createField, GetStringKeysType, Input
} from "../common/FormsControls/FormsControls";
import { loginTC } from "../../Redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css";
import { FC } from "react";
import { AppDispatchType } from "../../Redux/redux-store";
import { selectCaptchaUrl, selectIsAuth }
    from "../../Redux/selectors/auth-selectors";
import { Button, Col, Row } from "antd";

type LoginFormOwnProps = {
    captchaUrl: string | null | undefined
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> &
    LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
        return (
            <form onSubmit={handleSubmit}>
                {/* <Row>
                    <Col span={24}>col</Col>
                </Row> */}
                <Row gutter={[0, 8]}>
                    <Col span={4}>
                        {createField<LoginFormValuesTypeKeys>
                            ("Email", "email", [required], Input)}
                    </Col>
                    <Col span={20}>
                    </Col>
                    <Col span={4}>
                        {createField<LoginFormValuesTypeKeys>
                            ("Password", "password", [required], Input, { type: "password" })}
                    </Col>
                    <Col span={20}>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: "inline-block" }}>
                            <span>rememder me: </span>
                            <span style={{ display: "inline-block" }}>{createField<LoginFormValuesTypeKeys>
                                (undefined, "rememberMe", [], Input, { type: "checkbox" }, "")}</span>
                        </div>
                    </Col>
                    <Col span={1}>
                        {/* <button>Sign in</button> */}
                        <Button htmlType="submit" style={{ float: "right" }}>Sign in</Button>
                    </Col>
                    <Col span={20}>
                    </Col>
                    <Col span={4}>
                        {captchaUrl && <img src={captchaUrl} />}
                    </Col>
                    <Col span={20}>
                    </Col>
                    <Col span={4}>
                        {captchaUrl && createField<LoginFormValuesTypeKeys>
                            ("Symbols from image", "captcha", [required], Input, {})}
                    </Col>
                    <Col span={20}>
                    </Col>
                    <Col span={4}>
                        {error && <div className={style.formSummaryError}>
                            {error}
                        </div>
                        }
                    </Col>
                    <Col span={20}>
                    </Col>
                </Row>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>(
    { form: 'login' })(LoginForm);

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeysType<LoginFormValuesType>;

export const LoginPage: FC = () => {
    const captchaUrl = useSelector(selectCaptchaUrl);
    const isAuth = useSelector(selectIsAuth);
    const dispatch: AppDispatchType = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(loginTC(formData.email, formData.password,
            formData.rememberMe, formData.captcha));
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}