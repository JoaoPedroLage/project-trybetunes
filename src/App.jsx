import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

export default class App extends React.Component {
  render() {
    return (
      <main>
        <header className="title-page">
          <h1>TrybeTunes</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (propsRouter) => <Login { ...propsRouter } /> }
            />
            <Route
              path="/search"
              render={ (propsRouter) => (
                <>
                  <Header />
                  <Search { ...propsRouter } />
                </>) }
            />
            <Route
              path="/album/:id"
              render={ (propsRouter) => (
                <>
                  <Header />
                  <Album { ...propsRouter } />
                </>) }
            />
            <Route
              path="/favorites"
              render={ (propsRouter) => (
                <>
                  <Header />
                  <Favorites { ...propsRouter } />
                </>) }
            />
            <Route
              exact
              path="/profile"
              render={ (propsRouter) => (
                <>
                  <Header />
                  <Profile { ...propsRouter } />
                </>) }
            />
            <Route
              path="/profile/edit"
              render={ (propsRouter) => (
                <>
                  <Header />
                  <ProfileEdit { ...propsRouter } />
                </>) }
            />
            <Route
              exact
              path="*"
              render={ (propsRouter) => (
                <>
                  <Header />
                  <NotFound { ...propsRouter } />
                </>) }
            />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}
