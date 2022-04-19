import { connect } from "react-redux";
import { followActionCreator, seUsersActionCreator, unfollowActionCreator } from "../../Redux/users-reducer";
import Users from "./Users";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users) => {
            dispatch(seUsersActionCreator(users))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);