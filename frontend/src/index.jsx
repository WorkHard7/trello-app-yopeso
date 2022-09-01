import './styles/index.scss';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Login} from "./pages/Login"
import {Private} from "./components/Router/Private"
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Login></Login>}></Route>
      <Route path="/" element={<Private><div>Protected piece</div></Private>}></Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
