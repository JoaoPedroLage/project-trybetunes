import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.getUserName = this.getUserName.bind(this);

    this.state = {
      loading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    this.setState(
      { loading: true },
      async () => {
        const response = await getUser();
        this.setState({ userName: response.name, loading: false });
      },
    );
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header className="header-component" data-testid="header-component">
        { loading === true ? <Loading /> : (
          <>
            <h1 data-testid="header-user-name">
              {userName}
            </h1>
            <div className="links">
              <Link to="/search" data-testid="link-to-search">
                Search
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favorites Musics
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                Profile
              </Link>
            </div>
          </>
        )}
      </header>
    );
  }
}
