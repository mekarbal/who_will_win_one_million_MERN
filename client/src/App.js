import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/Register";
import Participants from "./components/participants/Participants";
import AdminLog from "./components/admin/login/Login";
import AdminsDashboard from "./components/admin/admins/AdminsDashboard";
import { useEffect, useState } from "react";
import Question from "./components/admin/questions/Question";
import ValidateParticipation from "./components/admin/admins/ValidateParticipation";
import NotFound from "./components/NotFound/NotFound";
import Group from "./components/Groups/Group";
import Team from "./components/Teams/Team";
import Game from "./components/game/Game";
import FinalWinner from "./components/Teams/FinalWinner";
function App() {
  const [check, setCheck] = useState("");

  const getFromStrorage = () => {
    const checked = localStorage.getItem("parToken");
    return checked;
  };

  useEffect(async () => {
    const check = await getFromStrorage();
    setCheck(check);
  }, []);

  return (
    <div className="rootContainer">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>

          <Route exact path="/admin/" component={AdminLog}></Route>
          <Route exact path="/admin/admins" component={AdminsDashboard}></Route>
          <Route exact path="/admin/question" component={Question}></Route>
          <Route
            exact
            path="/admin/validate"
            component={ValidateParticipation}
          ></Route>
          <Route exact path="/lobby" component={Group}></Route>
          <Route exact path="/team" component={Team}></Route>
          <Route exact path="/gamestart" component={Game}></Route>
          <Route exact path="/final" component={FinalWinner}></Route>
          <Route exact path="/*" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
