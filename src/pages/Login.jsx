import React from 'react';
import '../index.css';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const defautState = {
  loginName: '',
  isLoginButtonDisabled: true,
  logged: false,
  loading: false,
};

export default class Login extends React.Component {
  constructor() {
    super();

    this.onLoginInputChange = this.onLoginInputChange.bind(this);
    this.onSaveUser = this.onSaveUser.bind(this);

    this.state = {
      ...defautState,
    };
  }

  onLoginInputChange({ target }) {
    const { name, value } = target;

    this.setState(({ [name]: value }), () => {
      const { loginName } = this.state;
      const minChar = 3;

      if (loginName.length >= minChar) {
        this.setState({ isLoginButtonDisabled: false });
      } else { this.setState({ isLoginButtonDisabled: true }); }
    });
  }

  onSaveUser() {
    const { loginName } = this.state;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: loginName });
        this.setState({ loading: false, logged: true });
      },
    );
  }

  render() {
    const { isLoginButtonDisabled, loginName, logged, loading } = this.state;
    return (
      <div data-testid="page-login">
        { logged === true && <Redirect to="/search" /> }
        { loading === true ? <Loading /> : (
          <form>
            <h2>Login</h2>
            <label htmlFor="login-name-input">
              <input
                data-testid="login-name-input"
                type="textarea"
                placeholder="Seu nome"
                name="loginName"
                value={ loginName }
                onChange={ this.onLoginInputChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              name="loginButton"
              disabled={ isLoginButtonDisabled }
              onClick={ this.onSaveUser }
            >
              Entrar
            </button>
          </form>)}
      </div>
    );
  }
}
