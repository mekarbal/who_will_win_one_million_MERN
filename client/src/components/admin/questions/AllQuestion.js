import React, { Redirect } from "react";
import "../../participants/participants.css";
import loading from "../../../assets/img/loading.gif";

class AllQuestion extends React.Component {
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
      //   this.props.history.push("/");
      <Redirect to="/admin"></Redirect>;
    } else {
      fetch(process.env.REACT_APP_API_URL+"/quest", {
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
                  <th scope="col">Question</th>
                  <th scope="col">Answer</th>
                  <th scope="col">False Choices</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.quest}</td>
                    <td>{item.answer}</td>
                    <td>{item.false_choices}</td>
                    <td>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
export default AllQuestion;
