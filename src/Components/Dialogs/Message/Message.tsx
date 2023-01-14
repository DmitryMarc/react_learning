import { FC } from 'react';
import { DialogType } from '../../../Redux/dialogs-reducer';
import styles from './../Dialogs.module.css';
import userPhoto from '../../../../src/assets/images/user.png'
import { useSelector } from 'react-redux';
import { selectProfilePhoto } from '../../../Redux/selectors/profile-selectors'

type MessageType = {
    message: {
        body: string,
        senderId?: number,
        senderName?: string,
        recipientId?: number,
    }
}
type RecipientPhotoType = {
    dialogPhoto?: DialogType['photos'];
};
type AuthorizedUserIdType = {
    authorizedUserId: number | null
}

type MessagePropsType = MessageType & RecipientPhotoType & AuthorizedUserIdType;

const Message: FC<MessagePropsType> = ({authorizedUserId, message, dialogPhoto}) => { 
    const profilePhoto = useSelector(selectProfilePhoto);

    return (
        <div className={styles.message}> 
        <div className={`${authorizedUserId === message.senderId && styles.messageInformation}`}>
            { dialogPhoto?.small && authorizedUserId !== message.senderId
                ? <img style={{width:'30px', borderRadius: '50%'}} src={dialogPhoto?.small} alt='userPhoto' />
                : authorizedUserId === message.senderId
                ? <img style={{width:'30px', borderRadius: '50%'}} src={profilePhoto as string | undefined} alt='userPhoto' />
                : <img style={{width:'30px', borderRadius: '50%'}} src={userPhoto} alt='userPhoto' />
            } 
            <span className={styles.sanderName}>{message.senderName}</span>
            </div>
            <div className={`${authorizedUserId === message.senderId 
                ? styles.messageBodyOfSender 
                : styles.messageBody}`}>{message.body}</div>
            
        </div>
    );
}

export default Message;