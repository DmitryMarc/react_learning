import { FC } from 'react';
import classes from './Post.module.css';

type PostPropsType = {
    message: string,
    likesCount: number
}

const Post: FC<PostPropsType> = (props) => {
    return (
        <div className={classes.item}>
            <img src="https://i.pinimg.com/736x/38/07/45/3807452de810352bca9c0587863ebece--avatar-film-nerd.jpg" alt="avatar" />
            { props.message }
            <div>
                <span>like</span> { props.likesCount }
            </div>
        </div>
    );
}

export default Post;