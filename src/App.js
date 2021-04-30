import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Students } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
