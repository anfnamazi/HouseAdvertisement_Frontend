import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { loginUser } from "../services/userService";
import Cookie from "js-cookie";
import { isValidToken } from "../utils/comparison";

const Login = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const user = { username, password };
    try {
      const resultLogin = await loginUser(user);
      if (resultLogin.status === 200) {
        Cookie.set("token", resultLogin.data.accessToken);
        window.location.replace("/");
      }
    } catch (error) {}
  };
  if (isValidToken()) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a className="navbar-brand" href="#">
          فروش و رهن و اجاره خانه
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/register">
                ثبت نام
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row mt-3 p-3 boxShadow">
          <div className="col-md-6 pt-2">
            <div className="ineer-sign">
              <h3 className="text-center"> ورود</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label for="exampleInputEmail1">نام کاربری</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    aria-describedby="emailHelp"
                    placeholder="نام کاربری خودرا واردکنید ...."
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">پسورد</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="پسورد"
                  />
                </div>

                <button type="submit" className="btn btn-block btn-primary">
                  {" "}
                  ورود{" "}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 pt-2">
            <img className="sign-img" src="image/310.jpg" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
