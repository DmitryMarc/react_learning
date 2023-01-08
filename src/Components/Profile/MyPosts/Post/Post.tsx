import { FC, useState } from 'react';
import styles from './Post.module.css';
import { Col, message, Row } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { AppDispatchType, AppStateType } from '../../../../Redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../Redux/profile-reducer';

type PostPropsType = {
    id: number,
    message: string,
    likesCount: number,
    isLiked: boolean,
    userPhoto: string | null | undefined
}

const Post: FC<PostPropsType> = ({id,message,likesCount, isLiked, userPhoto}) => {
    debugger;
    const dispatch: AppDispatchType = useDispatch();
    const onClickLikeHandler = () => {
        if (!isLiked) {
            dispatch(actions.clickLikeActionCreator(id, likesCount + 1, true));
        } else {
            dispatch(actions.clickLikeActionCreator(id, likesCount - 1, false));

        }
    }
    return (
        <div className={styles.item}>
            <Row gutter={[0, 6]}>
                <Col span={24}>
                    <img src={userPhoto as string | undefined} alt="avatar" />
                </Col>
                <Col span={1}>
                </Col>
                <Col span={23}>
                    {message}
                </Col>
                <Col span={1}>
                </Col>
                <Col span={23}>
                    <div className={styles.likesCounterWrapper}>
                        <LikeOutlined onClick={onClickLikeHandler} 
                        className={`${styles.likeIcon} ${isLiked && styles.likedPost}`} 
                        /> {likesCount}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Post;