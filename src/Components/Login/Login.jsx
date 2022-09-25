import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";

const LoginForm = (props) => {
    console.log('Rerender');
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} validate={[required]} name={"login"} component={Input} />
            </div>
            <div>
                <Field placeholder={"Password"} validate={[required]} name={"password"} component={Input} />
            </div>
            <div>
                <Field type={"checkbox"} name={"rememderMe"} component={Input} /> rememder me
            </div>
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default Login;   





