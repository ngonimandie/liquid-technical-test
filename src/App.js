import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/authentication/Register';
import Login from "./components/authentication/Login";
import Reset from "./components/authentication/Reset";
import Cart from "./components/Cart";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/cart" component={Cart} />
          <Route component={PageNotFound} />
        </Switch >
        <Footer />
      </Router>
    </div>
  );
}

export default App;
