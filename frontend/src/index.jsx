import './styles/index.scss';

import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import {Login} from "./pages/Login/Login"
import {Private} from "./components/Router/Private"
import CreateNewBoard from "./components/board/CreateNewBoard";
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SignUpPage from "./pages/Sign Up /SignUpPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import Home from "./pages/Home/Home";
import Password from "./pages/Settings/Password/Password";
import Settings from "./pages/Settings/Settings";
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      {/*<Route path="/" element={<Private><div>Protected piece</div></Private>}></Route>*/}
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      <Route path="/signin" element={<Login></Login>}></Route>
      <Route path="/board/create" element={<CreateNewBoard/>}/>
      <Route path="*" element={<Private><Navigate replace to="/"/></Private>}/>
      <Route path="/board/:board_id" element={<BoardPage/>}/>
      <Route path="*" element={<Private><Navigate replace to="/board/:board_id"/></Private>}/>
      <Route path="/settings/password" element={<Password/>}/>
      <Route path="/settings/general" element={<Settings/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
