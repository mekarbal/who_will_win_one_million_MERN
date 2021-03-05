import React, { useEffect, useState } from "react";
import axios from "axios";
import "./game.css";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

toast.configure();
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Game(props) {
  const [question, setQuestion] = useState([]);
  const [flaseChoices, setFalseChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);

  const { register, handleSubmit } = useForm();
  let token = localStorage.getItem("parToken");
  let group_code = parseInt(useQuery().get("group_code"));

  const getQuestionRandom = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL+"/quest/random", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        setQuestion(response.data[0]);
        setFalseChoices(response.data[0].false_choices);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const notify = () => {
    toast.error("Too Late", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onSubmit = async (data) => {
    getQuestionRandom();
    setCount(count + 1);
    await axios
      .post(
        process.env.REACT_APP_API_URL+"/qtoken/add",
        {
          id_question: question._id,
          participant_answer: answer,
          group_code: group_code,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => notify());

    if (count == 1) {
      props.history.push("/final?group_code=" + group_code);
    }
  };
  useEffect(() => {
    getQuestionRandom();
  }, []);

  return (
    <div className="quizz-container">
      <form onSubmit={handleSubmit(onSubmit)} className="quizz-form">
        <div id="quiz">
          <h1>Question {count + 1}/15</h1>
          <hr />
          <h2 id="question">{question.quest}</h2>

          <div className="button">
            <input
              type="button"
              name=""
              className="btn btn-primary"
              value={question.answer}
              ref={register}
              onClick={(e) => setAnswer(e.target.value)}
            />

            {flaseChoices.map((quest) => {
              return (
                <div key={quest._id}>
                  <input
                    type="button"
                    name=""
                    className="btn btn-primary"
                    value={quest}
                    onClick={(e) => setAnswer(e.target.value)}
                  />
                </div>
              );
            })}
            <input
              type="submit"
              className="btn btn-outeline-success mt-5"
              value="submit"
            />
          </div>
          {answer}
          <hr style={{ marginTop: "20px" }} />
        </div>
      </form>
    </div>
  );
}

export default Game;
