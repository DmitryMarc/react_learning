import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions, ActionsTypes } from '../../Redux/dialogs-reducer';
import { AppStateType } from '../../Redux/redux-store';
import Dialogs from './Dialogs';

type MapStateToPropsType = {
    dialogsPage: any
}

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>):MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actions.sendMessageCreator(newMessageBody));
        } 
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    //@ts-ignore
)(Dialogs);






