import './styles/index.scss';

import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import {Login} from "./pages/Login/Login"
import {Private} from "./components/Router/Private"
import CreateBoardButton from "./components/board/CreateBoardButton";
import DataFetching from "./components/dataFetching/DataFetching";
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SignUpPage from "./pages/Sign Up /SignUpPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Private><div>Protected piece</div></Private>}></Route>
      <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      <Route path="/signin" element={<Login></Login>}></Route>
      <Route path="/board/create" element={<CreateBoardButton/>}/>
      <Route path="/board/id" element={<DataFetching/>}/>
      <Route path="*" element={<Private><Navigate replace to="/"/></Private>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
