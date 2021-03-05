import React, { useState } from "react";
import "./admins.css";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../login/login.css";
import AllAdmins from "./AllAdmins";
import Nav from "../nav/Nav";
function Admins(props) {
  const { register, handleSubmit, errors } = useForm();
  const [err, setErr] = useState("");
  let token = localStorage.getItem("admToken");
  console.log("helll where is the fucking token " + token);

  if (token == null) {
    props.history.push("/admin");
  }

  const onSubmit = async (data) => {
    console.log(token);
    await axios
      .post(
        process.env.REACT_APP_API_URL+"/admin/",
        {
          full_name: data.full_name,
          phone: data.phone,
          password: data.password,
        },
        {
          headers: {
            "auth-token": ` ${token}`,
          },
        }
      )
      .then(function (response) {
        // history.push("/admin/admins");
        props.history.push("/admin/admins");
        console.log(response);
      })
      .catch(function (error) {
        setErr(error.response.data);
      });
  };

  const styles = {
    containerAD: {
      width: "150%",
      height: "auto",
      color: "white",
      margin: "0px 0 0 -270px",
    },
  };

  return (
    <div>
      <div className="container">
        <div className="" style={styles.containerAD}>
          <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div className="col-lg-12 login-title">Add Admin</div>
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
                        <Alert severity="error">
                          {errors.full_name.message}
                        </Alert>
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
                        <Alert severity="error">
                          {errors.password.message}
                        </Alert>
                      )}
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="col-lg-6 login-btm login-text"></div>
                      <div className="col-lg-6 login-btm login-button">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-2"></div>
            </div>
          </div>

          <AllAdmins />
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Admins;
