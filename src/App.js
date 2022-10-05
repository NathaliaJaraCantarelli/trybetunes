import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Login data-testid="page-login" /></Route>
          <Route path="/search"><Search data-testid="page-search" /></Route>
          <Route path="/album/:id" render={ (props) => (<Album { ...props } data-testid="page-album" />)} />
          <Route path="/favorites"><Favorites data-testid="page-favorites" /></Route>
          <Route path="/profile/edit">
            <ProfileEdit data-testid="page-profile-edit" />
          </Route>
          <Route path="/profile"><Profile data-testid="page-profile" /></Route>
          <Route path="*"><NotFound data-testid="page-not-found" /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
