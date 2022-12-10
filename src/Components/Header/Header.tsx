import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { Layout, Menu, Col, Row, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppStateType } from '../../Redux/redux-store';
import { selectCurrentUserLogin, selectIsAuth } from '../../Redux/auth-selectors';
import { logoutTC } from '../../Redux/auth-reducer';

type PropsType = {
}

const items1: MenuProps['items'] = ['1'].map((key) => ({
    key,
    label: <Link to='/developers'>Developers</Link>,
}));

export const Header: FC<PropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch: AppDispatchType = useDispatch();

    const logoutCallBack = () => {
        dispatch(logoutTC());
    }

    const { Header } = Layout;
    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
                </Col>

                {isAuth
                    ? <>
                    <Col span={1}>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Col>
                    <Col span={5}>
                        {login} <Button onClick={logoutCallBack}>Log out</Button>
                    </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>

        // <header className={classes.header}>
        //     <img width="300" src="https://ves-rf.ru/sites/default/files/article-img/20171214/6.jpg" />

        //     <div className={classes.loginBlock}>
        // {props.isAuth
        //     ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
        //     : <NavLink to={'/login'}>Login</NavLink>}
        //     </div>
        // </header>
    );
}

