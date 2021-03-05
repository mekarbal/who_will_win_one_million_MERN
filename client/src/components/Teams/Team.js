import React, { useEffect, Redirect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./team.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Team(props) {
  let group_code = parseInt(useQuery().get("group_code"));

  let token = localStorage.getItem("parToken");

  const [participants, setParticipants] = useState([]);

  if (token == null) {
    props.history.push("/");
  }

  useEffect(async () => {
    await axios
      .post(process.env.REACT_APP_API_URL+"/group/all", { group_code: group_code })
      .then((response) => {
        setParticipants(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (participants.length == 2) {
    props.history.push(`/gamestart?group_code=${group_code}`);
  }

  const styles = {
    image: {
      width: "170px",
      height: "170px",
      borderRadius: "50%",
    },
    divG: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "space-between",
      marginTop: "50px",
    },
    images: {
      width: "150px",
      height: "150px",
      margin: " 30px",
    },
  };

  return (
    <div>
      {" "}
      <div className="context mx-auto">
        <h1 className="text-center">Team Members</h1>
        <div className="row mt-5 mx-auto justify-content-center">
          <img
            className="text-center mt-5 "
            src="https://upload.wikimedia.org/wikipedia/vi/4/4e/WWTBAMUS2020Logo.png"
            style={styles.image}
          />
        </div>
        <h2>Waiting for other players.........</h2>
        <div style={styles.divG}>
          {" "}
          {participants.map((participant) => (
            <div key={participant._id} style={{ margin: "30px" }}>
              <img
                className="text-center mt-5 "
                src="https://upload.wikimedia.org/wikipedia/vi/4/4e/WWTBAMUS2020Logo.png"
                style={styles.images}
              />
              <h6 className="text-center ">
                {participant.participant[0].full_name}
              </h6>
            </div>
          ))}
        </div>
      </div>
      <div className="area">
        <ul></ul>

        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Team;
