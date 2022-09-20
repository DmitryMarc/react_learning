import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
    console.log('Rerender');
    return (
        < form action="" >
            <div>
                <Field onSubmit={props.handleSubmit} placeholder={"Login"} name={"login"} component={"input"} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={"input"} />
            </div>
            <div>
                <Field type={"checkbox"} name={"rememderMe"} component={"input"} /> rememder me
            </div>
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

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





