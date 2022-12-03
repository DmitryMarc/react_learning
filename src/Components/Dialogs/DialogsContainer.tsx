import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../Redux/dialogs-reducer';
import { AppStateType } from '../../Redux/redux-store';
import Dialogs from './Dialogs';

let mapStateToProps = (state:AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessageCreator
        //...actions // Можно передавать callback и так,
        // но в actions будут сидеть все AC (в данном случае
        // только sendMessageCreator), следует это учитывать
        // при дальнейшем пробросе данных и определении типов
    }),
    withAuthRedirect
)(Dialogs);






