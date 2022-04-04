import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs = [
  {id: 1, name: 'Dmitry'},
  {id: 2, name: 'Andrey'},
  {id: 3, name: 'Sveta'},
  {id: 4, name: 'Sasha'},
  {id: 5, name: 'Victor'},
  {id: 6, name: 'Valery'}
];

let messages = [
  {id: 1, message: 'Hi'},
  {id: 2, message: 'How is your learning?'},
  {id: 3, message: 'React is the best!'},
  {id: 4, message: 'Yo'},
  {id: 5, message: 'Yo'},
  {id: 6, message: 'Yo'}
];

let postsData = [
  {id: 1, message: 'Hi, how are you?', likesCount: 15},
  {id: 2, message: 'It\'s my first post', likesCount: 20},
  {id: 2, message: 'It\'s my second post', likesCount: 21},
  {id: 2, message: 'It\'s my coolest post', likesCount: 4}
];

ReactDOM.render(
  <React.StrictMode>
    <App toDialogs ={dialogs} toMessages = {messages} toPosts = {postsData}  />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
