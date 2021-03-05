import React from "react";
import "./participants.css";
import loading from "../../assets/img/loading.gif";
import { toast } from "react-toastify";

toast.configure();

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    const notify = () => {
      toast.error("You Need to login first", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    };
    let token = localStorage.getItem("parToken");
    if (!token) {
      this.props.history.push("/");
      notify();
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
        <div className="allPar">
          {items.map((item) => (
            <div className="row mx-auto" key={item._id}>
              <div className="cardBody">
                <a className="card1" href="#">
                  <h3>{item.full_name}</h3>
                  <p className="small">{item.age}years Old</p>
                  <p className="small">{item.email}</p>
                  <p className="small">{item.phone}</p>
                  <div className="go-corner" href="#">
                    <div className="go-arrow">→</div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}
export default Participants;
