import React from "react";
import Alert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../login/login.css";
import { useHistory } from "react-router-dom";
import AllQuestion from "./AllQuestion";
import Nav from "../nav/Nav";
function Question() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const token = localStorage.getItem("admToken");
  if (token == null) {
    history.push("/admin");
  }
  const [err, setErr] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(
        process.env.REACT_APP_API_URL+"/quest/",
        {
          quest: data.quest,
          answer: data.answer,
          false_choices: data.false_choices,
          points: data.points,
        },
        {
          headers: {
            "auth-token": ` ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/question");
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
          <div className="col-lg-12 login-title">Question</div>
          {err && <Alert severity="error">{err}</Alert>}
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-control-label">Question</label>
                  <input
                    type="text"
                    className="form-control"
                    name="quest"
                    ref={register({
                      required: "Question Required",
                    })}
                  />
                  {errors.quest && (
                    <Alert severity="error">{errors.quest.message}</Alert>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-control-label">Correct Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    name="answer"
                    ref={register({
                      required: "Answer Required",
                    })}
                  />
                  {errors.answer && (
                    <Alert severity="error">{errors.answer.message}</Alert>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-control-label">False Choice</label>
                  <input
                    type="text"
                    className="form-control"
                    name="false_choices"
                    ref={register({
                      required: "False choices Required",
                      number: true,
                    })}
                  />
                  {errors.false_choices && (
                    <Alert severity="error">
                      {errors.false_choices.message}
                    </Alert>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-control-label">Points</label>
                  <input
                    type="number"
                    className="form-control"
                    name="points"
                    ref={register({
                      required: "Points Required",
                    })}
                  />

                  {errors.points && (
                    <Alert severity="error">{errors.points.message}</Alert>
                  )}
                </div>

                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text"></div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
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
      <AllQuestion />
      <Nav />
    </div>
  );
}

export default Question;
