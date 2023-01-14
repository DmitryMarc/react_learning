import { ComponentType, FC } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../Redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType): MapPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
};

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

//HOC
export function withAuthRedirect<WrappedComponentType extends object>(
    WrappedComponent: ComponentType<WrappedComponentType>) {
    const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props;
        if (!isAuth)
            return <Redirect to='/login' />
        return <WrappedComponent {...restProps as WrappedComponentType} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType,
        WrappedComponentType, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}