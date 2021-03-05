import React from "react";
import Alert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../login/login.css";
import { Link } from "react-router-dom";
function Register({ history }) {
  const { register, handleSubmit, errors } = useForm();
  const [err, setErr] = useState("");
  const onSubmit = async (data) => {
    await axios
      .post(process.env.REACT_APP_API_URL+"/participant/", {
        full_name: data.full_name,
        age: data.age,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })
      .then(function (response) {
        history.push("/");
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
          <div className="col-lg-12 login-title">Register</div>
          {err && <Alert severity="error">{err}</Alert>}
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-control-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    ref={register({
                      required: "Full Name Required",
                    })}
                  />
                  {errors.full_name && (
                    <Alert severity="error">{errors.full_name.message}</Alert>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-control-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    ref={register({
                      required: "Age Required",
                    })}
                  />
                  {errors.full_name && (
                    <Alert severity="error">{errors.full_name.message}</Alert>
                  )}
                </div>
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
                  <label className="form-control-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={register({
                      required: "Phone Required",
                    })}
                  />
                  {errors.email && (
                    <Alert severity="error">{errors.email.message}</Alert>
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
                      Register
                    </button>
                    <button
                      type="submit"
                      className="btn btn-outline-primary ml-2"
                    >
                      <Link to="/">Login</Link>
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

export default Register;
