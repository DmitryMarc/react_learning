
import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';

const Profile = () => {
    return (
        <div>
            <div>
                <img src='https://www.anypics.ru/download.php?file=201211/1280x800/anypics.ru-34518.jpg' />
            </div>
            <div>
                ava + description
            </div>
            <MyPosts />
        </div>
    );
}

export default Profile;