import React from 'react';
import MainApp from './pages/mainApp'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Notice from './pages/notice';
import Logout from './pages/Logout';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (<BrowserRouter>
    <ToastContainer />
    <Switch>
      <Route path="/" exact component={MainApp} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/notice/:id" component={Notice} />
    </Switch>
  </BrowserRouter>);
}

export default App;