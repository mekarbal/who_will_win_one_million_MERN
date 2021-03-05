import axios from "axios";
import React, { Redirect, useState } from "react";
import Team from "../Teams/Team";
import "./group.css";
import { toast } from "react-toastify";

toast.configure();
function Group(props) {
  const [pin, setPin] = useState("");
  let token = localStorage.getItem("parToken");
  if (token == null) {
    <Redirect to="/"></Redirect>;
  }
  

  const createGroup = async (e) => {
    e.preventDefault();
    await axios
      .post(
        process.env.REACT_APP_API_URL+"/group/",
        {},
        { headers: { "auth-token": token } }
      )
      .then((response) => {
        if (response.data.message) {
          const notify = () => {
            toast.error(response.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          };
        } else {
          props.history.push("/team?group_code=" + response.data.group_code);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const joinGroup = async (e) => {
    e.preventDefault();
    await axios
      .post(
        process.env.REACT_APP_API_URL+"/group/join",
        { group_code: pin },
        { headers: { "auth-token": token } }
      )
      .then((response) => {
        if (response.data.message) {
          const notify = () => {
            toast.error(response.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          };
        } else {
          props.history.push("/team?group_code=" + pin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container h-100 mt-5">
        <div className="row h-100 justify-content-center align-items-center mt-5">
          <form className="col-md-12">
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6 mt-2">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Join Group
                    </h2>
                    <p>
                      <input
                        type="text"
                        className="form-control bg-white"
                        name="pin"
                        id="pin"
                        onChange={(e) => setPin(e.target.value)}
                      />
                    </p>
                    <p>
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={(e) => joinGroup(e)}
                      >
                        Join
                      </button>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Create Group
                    </h2>
                    <p>
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={(e) => createGroup(e)}
                      >
                        Create
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Group;
