import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";

const Logout = () => {
  useEffect(() => {
    Cookie.remove("token");
    window.location.replace("/login");
  }, []);

  return null;
};

export default withRouter(Logout);
