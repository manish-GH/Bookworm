import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Switch, Route, useHistory } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  const history = useHistory();
  const { currentUser } = useAuth();
  useEffect(() => {
    history.push(!!currentUser ? "/" : "/login");
  }, [currentUser, history]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
