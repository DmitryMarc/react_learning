import { FC, useState } from 'react';
import styles from './Post.module.css';
import { Col, Row } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

type PostPropsType = {
    message: string,
    likesCount: number,
    userPhoto: string | null | undefined
}

const Post: FC<PostPropsType> = (props) => {
    console.log('rerender')
    const [likesNumber, setLikesNumber] = useState(props.likesCount);
    const [isLiked, setIsLiked] = useState(false);
    return (
        <div className={styles.item}>
            <Row gutter={[0, 6]}>
                <Col span={24}>
                    <img src={props.userPhoto as string | undefined} alt="avatar" />
                </Col>
                <Col span={1}>
                </Col>
                <Col span={23}>
                    {props.message}
                </Col>
                <Col span={1}>
                </Col>
                <Col span={23}>
                    <div className={styles.likesCounterWrapper}>
                        <LikeOutlined onClick={() => {
                            if (!isLiked) {
                                setIsLiked(true);
                                setLikesNumber((prevLikes) => (prevLikes + 1));
                            } else {
                                setIsLiked(false);
                                setLikesNumber((prevLikes) => (prevLikes - 1));
                            }
                        }} className={`${styles.likeIcon} ${isLiked && styles.likedPost}`} /> {likesNumber}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Post;