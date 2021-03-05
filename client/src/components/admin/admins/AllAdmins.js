import React from "react";
import "../../participants/participants.css";
import loading from "../../../assets/img/loading.gif";
import Nav from "../nav/Nav";
class AllAdmins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("admToken");
    if (!token) {
      // this.props.history.push("/");
    } else {
      fetch(process.env.REACT_APP_API_URL+"/admin", {
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
          console.log(this.state.items);
        });
    }
  }

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
            height: "auto",
            margin: "35px auto",
          }}
        >
          <div className="container">
            <table
              className="table table-bordered"
              style={{ backgroundColor: "#1A2226", color: "white" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.phone}</td>
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
export default AllAdmins;
