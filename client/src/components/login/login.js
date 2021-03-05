import React, { useState,Redirect } from "react";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ history }) {
  const { register, handleSubmit, errors } = useForm();
  const [err, setErr] = useState("");
  const token =localStorage.getItem('parToken')
  if (token) {
     history.push('/lobby')
  }
  const onSubmit = async (data) => {
    await axios
      .post(process.env.REACT_APP_API_URL+"/participant/login", {
        phone: data.phone,
        password: data.password,
      })
      .then(function (response) {
        localStorage.setItem("parToken", response.data);
        history.push(`/lobby`);
      })
      .catch(function (error) {
        setErr(error.response.data);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">Login</div>
          {err && <Alert severity="error">{err}</Alert>}
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-control-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    ref={register({
                      required: "Phone Required",
                      minLength: {
                        value: 10,
                        message: "Too Short 10 chars at least",
                      },
                      maxLength: {
                        value: 14,
                        message: "Too long 14 chars please",
                      },
                      number: true,
                    })}
                  />
                  {errors.phone && (
                    <Alert severity="error">{errors.phone.message}</Alert>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    ref={register({
                      required: "Password Required",
                      minLength: {
                        value: 7,
                        message: "Too Short 7 chars at least",
                      },
                    })}
                  />
                  {errors.password && (
                    <Alert severity="error">{errors.password.message}</Alert>
                  )}
                </div>

                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text"></div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
                      LOGIN
                    </button>
                    <button
                      type="submit"
                      className="btn btn-outline-primary ml-2"
                    >
                      <Link to="/register">Register</Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
