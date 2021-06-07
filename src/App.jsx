import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavMain from "./components/NavMain";
import FormSignup from './components/Forms/FormSignup';
import FormSignin from './components/Forms/FormSignin';

function App() {
  return (
    <div className="App">

      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={FormSignup} />
        <Route exact path="/signin" component={FormSignin} />
      </Switch>
    </div>
  );
}

export default App;
