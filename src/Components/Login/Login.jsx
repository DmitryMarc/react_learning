import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { loginTC } from "../../Redux/auth-reducer";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
    console.log('Rerender');
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} validate={[required]} name={"email"} component={Input} />
            </div>
            <div>
                <Field placeholder={"Password"} type={"password"} validate={[required]} name={"password"} component={Input} />
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
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if(props.isAuth){
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth

})

export default connect(mapStateToProps, {login:loginTC})(Login);   





