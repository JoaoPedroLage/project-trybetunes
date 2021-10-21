import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.getUserName = this.getUserName.bind(this);

    this.state = {
      loading: true,
      UserName: '',
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
        this.setState({ UserName: response.name, loading: false });
      },
    );
  }

  render() {
    const { loading, UserName } = this.state;
    return (
      <header data-testid="header-component">
        { loading === true ? <Loading /> : (
          <h1 data-testid="header-user-name">
            { UserName}
          </h1>
        )}
      </header>
    );
  }
}
