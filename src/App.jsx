import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavMain from "./components/NavMain";
import { FormSignup, FormSignin, FormProfile } from './components/Forms';
import Profile from './pages/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import AddSnippet from './pages/AddSnippet'
import UpdateSnippet from './snippets/UpdateSnippet';
import SnippetDetail from './snippets/SnippetDetail';


class App extends React.Component {
  state = {
    displayForm: false,
  };

  render() {
    return (
      <div className="App">
        <NavMain />

        <Switch>
          <Route
            exact
            path="/"
            render={(historyProps) => (
              <Home
                {...historyProps}
                displayForm={this.state.displayForm}
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
              />
            )}
          />

          <ProtectedRoute exact path="/profile/settings" component={FormProfile} />
          <ProtectedRoute exact path="/update-snippet/:id" component={UpdateSnippet} />

     
          <Route exact path="/snippet/:id" component={SnippetDetail} />
          <Route exact path="/signup" component={FormSignup} />
          <Route exact path="/signin" component={FormSignin} />
        </Switch>
      </div>
    );
  };
}

export default App;
