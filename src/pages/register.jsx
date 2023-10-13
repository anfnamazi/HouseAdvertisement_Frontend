import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../services/userService";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { isValidToken } from "../utils/comparison";

const Register = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const fullname = event.target.fullname.value;
    const email = event.target.email.value;
    const user = { username, password, fullname, email };
    try {
      const resultRegister = await registerUser(user);
      if (resultRegister.status === 201 || resultRegister.status === 200) {
        Cookie.set("token", resultRegister.data.accessToken);
        window.location.replace("/");
      }
    } catch (error) {
      toast.error(error.response.data.massage);
    }
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
              <Link className="nav-link" to="/login">
                ورود{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <div class="row mt-3 p-3 boxShadow">
          <div class="col-md-6 pt-2">
            <div class="ineer-sign">
              <h3 class="text-center"> ثبت نام</h3>
              <form onSubmit={handleRegister}>
                <div class="form-group">
                  <label for="exampleInputEmail1">ایمیل</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="ایمیل خودرا واردکنید ...."
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">نام کاربری</label>
                  <input
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="...نام کاربری"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">نام کامل</label>
                  <input
                    type="text"
                    class="form-control"
                    name="fullname"
                    placeholder="لطفا نام خود را وارد کنید ..."
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">پسورد</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="پسورد"
                  />
                </div>

                <button type="submit" class="btn btn-block btn-primary">
                  ثبت نام
                </button>
              </form>
            </div>
          </div>
          <div class="col-md-6 pt-2">
            <img class="sign-img" src="image/310.jpg" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
