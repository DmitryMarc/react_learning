import classes from './Users.module.css'

let Users = (props) => {

    if (props.users.length === 0) {

        props.setUsers([
            { id: 1, photoUrl: 'https://cdn.fishki.net/upload/post/201501/16/1389597/b81f8a601f73a27b369abd60a8f9b729.jpg', followed: false, fullName: 'Dmitry', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' } },
            { id: 2, photoUrl: 'https://cdn.fishki.net/upload/post/201501/16/1389597/b81f8a601f73a27b369abd60a8f9b729.jpg', followed: true, fullName: 'Sasha', status: 'I am a loser', location: { city: 'Moskow', country: 'Russia' } },
            { id: 3, photoUrl: 'https://cdn.fishki.net/upload/post/201501/16/1389597/b81f8a601f73a27b369abd60a8f9b729.jpg', followed: false, fullName: 'Andrew', status: 'I am a boss too', location: { city: 'Kiev', country: 'Ukraine' } }
        ])
    }

    return <div>
        {
            props.users.map(user => <div key={user.id}>
                <span>
                    <div>
                        <img src={user.photoUrl} className={classes.userPhoto} />
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => { props.unfollow(user.id) }}>Unfollow</button>
                            : <button onClick={() => { props.follow(user.id) }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.fullName}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{user.location.country}</div>
                        <div>{user.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;