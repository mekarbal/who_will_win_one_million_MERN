import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./team.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Team(props) {
  let group_code = parseInt(useQuery().get("group_code"));

  let token = localStorage.getItem("parToken");

  const [winner, setWinner] = useState([]);

  if (token == null) {
    props.history.push("/");
  }
  

  console.log(group_code);
  useEffect(async () => {
    await axios
      .post(process.env.REACT_APP_API_URL+"/group/final", { group_code: group_code })
      .then((response) => {
        setWinner(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const styles = {
    divG: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "space-between",
      marginTop: "50px",
    },
    images: {
      width: "180px",
      height: "180px",
      margin: " 30px",
    },
  };

  return (
    <div>
      {" "}
      <div className="context mx-auto">
        <h1 className="text-center">Winner</h1>

        <div style={styles.divG}>
          <div style={{ margin: "30px" }}>
            <img
              className="text-center mt-5 "
              src="https://upload.wikimedia.org/wikipedia/vi/4/4e/WWTBAMUS2020Logo.png"
              style={styles.images}
            />
            <h3 className="text-center ">{winner.full_name}</h3>
          </div>
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
