import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/authentication/Register';
import Dashboard from './components/Dashboard';
import Login from "./components/authentication/Login";
import Reset from "./components/authentication/Reset";
import Cart from "./components/Cart";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
