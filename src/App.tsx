import React, { ComponentType, FC } from 'react';
import store, { AppStateType } from './Redux/redux-store';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
// Добавили все стили из antd
import 'antd/dist/reset.css';
import Preloader from './Components/common/Preloader/Preloader';
import { LoginPage } from './Components/Login/Login';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import SideBar from './Components/Side-bar/Side-bar';
import { Users } from './Components/Users/Users';
import { initializeAppTC } from './Redux/app-reducer';
import { withSuspense } from './hoc/withSuspense';

// Добавили стили из antd
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Header } from './Components/Header/Header';

const { Content, Footer, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    // todo: Подправить тип (any)
    const arrayOfTitles: { [key: string]: Array<any> } = {
      'My Profile': [<Link to='/profile/23977'>Ptofile</Link>,
      <Link to='/dialogs'>Messages</Link>],
      'Developers': [<Link to='/developers'>Developers</Link>],
      'Other': [<Link to='/chat'>Chat</Link>,
      <Link to='/news'>News</Link>,
      <Link to='/music'>Music</Link>,
      <Link to='/settings'>Settings</Link>]
    };
    const arrayOfKey = Object.keys(arrayOfTitles);

    const key = index + 1;

    return {
      key,
      //icon: React.createElement(icon),
      label: arrayOfKey[index],

      children: new Array(arrayOfTitles[arrayOfKey[index]].length).fill(null).map((_, j) => {

        const subKey = index * (arrayOfTitles[arrayOfKey[index]].length + 1) + j;
        return {
          key: subKey,

          label: arrayOfTitles[arrayOfKey[index]][j],
        };
      }),
    };
  },
);

const Dialogs = React.lazy(() => import('./Components/Dialogs/Dialogs'));
const Profile = React.lazy(() => import('./Components/Profile/Profile'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
};

const SuspendedDialogs = withSuspense(Dialogs);
const SuspendedProfile = withSuspense(Profile);
const SuspendedChatPage = withSuspense(ChatPage);

const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  // const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
  //   alert("Some error occured");
  //   //console.error(promiseRejectionEvent);
  // }

  // useEffect(() => {
  props.initializeApp();
  // window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
  // }, []);

  // useEffect(() => {
  //   window.removeEventListener("unhandledrejection", catchAllUnhandledErrors); // глобальный отлов promise
  // }, [])

  // componentWillUnmount() {
  //   window.removeEventListener("unhandledrejection", catchAllUnhandledErrors); // глобальный отлов promise
  // }

  if (!props.initialized) {
    return <Preloader />
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              //defaultSelectedKeys={['0']}
              defaultOpenKeys={['1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {/* если пользователь залогинен, то нужно при инициализации приложения направлять на его профиль(его id)*/}
            {/* Временно закоментил, т.к. мешало работе с адресной строкой, потом исправить! */}
            {/* <Route path='/' render={() => <Redirect to="/profile" />} />         */}
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/developers' render={() => <Users pageTitle={"Пользователи"} />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='/chat' render={() => <SuspendedChatPage />} />
            {/* <Route path='*' render={() => <div>
              404 NOT FOUND
              <Button type='primary' >OK</Button>
            </div>} /> */}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Social Network ©2022 Created by Dmitry Marchenkov</Footer>
    </Layout>

    // <div className='app-wrapper'>
    //   <HeaderContainer />
    //   <SideBar />
    //   <div className='app-wrapper-content'>
    //     {/* если пользователь залогинен, то нужно при инициализации приложения направлять на его профиль(его id)*/}
    //     {/* Временно закоментил, т.к. мешало работе с адресной строкой, потом исправить! */}
    //     {/* <Route path='/' render={() => <Redirect to="/profile" />} />         */}
    //     <Route path='/dialogs' render={() => <SuspendedDialogs />} />
    //     <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
    //     <Route path='/users' render={() => <UsersPage pageTitle={"Пользователи"} />} />
    //     <Route path='/news' render={() => <News />} />
    //     <Route path='/music' render={() => <Music />} />
    //     <Route path='/settings' render={() => <Settings />} />
    //     <Route path='/login' render={() => <LoginPage />} />
    //     <Route path='*' render={() => <div>
    //       404 NOT FOUND
    //       {/* <Button type='primary' >OK</Button> */}
    //     </div>} />
    //   </div>
    // </div>

  );
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})
let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp: initializeAppTC }))
  (App);

const ReactJSApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default ReactJSApp;



