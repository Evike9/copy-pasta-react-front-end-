import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavMain from "./components/NavMain";
import { FormSignup, FormSignin } from './components/Forms';
import Profile from './pages/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import AddSnippet from './pages/AddSnippet'
import UpdateSnippet from './snippets/UpdateSnippet';

class App extends React.Component {
  state = {
    displayForm: false,
  };

  toggleFormDisplay = () => {
    //  this.setState({ displayForm: !this.state.displayForm });
  };

  handleClose = () => {
    this.setState({ displayForm: false });
  };

  render() {
    return (
      <div className="App">
        <NavMain toggleFormDisplay={this.toggleFormDisplay} />

        <Switch>
          <Route
            exact
            path="/"
            render={(historyProps) => (
              <Home
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/profile"
            render={(historyProps) => (
              <Profile
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/add-snippet"
            render={(historyProps) => (
              <AddSnippet
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />

          {/*       <ProtectedRoute
            exact
            path="/profile/settings"
            component={FormProfile}
          /> */}

          <Route exact path="/" component={Home} />
          <Route exact path="/update-snippet" component={UpdateSnippet} />
          <Route exact path="/signup" component={FormSignup} />
          <Route exact path="/signin" component={FormSignin} />
        </Switch>
      </div>
    );
  };
}

export default App;
