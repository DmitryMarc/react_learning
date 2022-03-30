import classes from './Post.module.css';

const Post = () => {
    return (
        <div className={classes.item}>
            <img src="https://i.pinimg.com/736x/38/07/45/3807452de810352bca9c0587863ebece--avatar-film-nerd.jpg" alt="avatar" />
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    );
}

export default Post;