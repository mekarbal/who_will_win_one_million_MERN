import React, { Redirect } from "react";
import "../../participants/participants.css";
import loading from "../../../assets/img/loading.gif";
import Nav from "../nav/Nav";
import { toast } from "react-toastify";
import axios from "axios";

toast.configure();
class ValidateParticipation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
  notify = () => {
    toast.success("Participant Validated", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  notifyError = () => {
    toast.danger("Participant not Validated", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  componentDidMount() {
    let token = localStorage.getItem("admToken");
    if (!token) {
      <Redirect to="/admin"></Redirect>;
    } else {
      fetch(process.env.REACT_APP_API_URL+"/participant", {
        headers: new Headers({
          "auth-token": token,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        });
    }
  }

  valid = (_id) => {
    let token = localStorage.getItem("admToken");
    console.log(token);

    axios
      .patch(
        process.env.REACT_APP_API_URL+"/participant/valid/" + _id,
        {
          isValid: true,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((result) => {
        this.notify();
      })
      .catch((error) => {
        this.notifyError();
      });
    console.log(this.state);
  };

  render() {
    const { items } = this.state;
    if (!this.state.isLoaded) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <img src={loading} alt="loading" />
        </div>
      );
    } else {
      return (
        <div
          className="allPar"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "55%",

            margin: "35px auto",
          }}
        >
          <div className="container mt-5">
            <table
              className="table table-bordered"
              style={{ backgroundColor: "#1A2226", color: "white" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.phone}</td>
                    <td>
                      {item.isValid == false ? (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => this.valid(item._id)}
                        >
                          Not Valid
                        </button>
                      ) : (
                        <button
                          disabled={true}
                          className="btn btn-outline-success"
                        >
                          Valiiid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Nav />
        </div>
      );
    }
  }
}
export default ValidateParticipation;
