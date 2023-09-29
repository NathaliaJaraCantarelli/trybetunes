import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      estadoBotao: true,
      loading: false,
      redirect: false,
    };
  }

  habilitaBotao = ({ target }) => {
    const numeroCaracters = 3;
    if (target.value.length >= numeroCaracters) {
      this.setState({ estadoBotao: false });
    }
    this.setState({ name: target.value });
  };

  chamaAPI = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    const criaUsuario = await createUser({ name });
    if (criaUsuario) {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  };

  render() {
    const { name, estadoBotao, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      loading ? <Loading /> : (
        <div id="pageLogin" data-testid="page-login">
          <p>Nome: </p>
          <input
            type="text"
            value={ name }
            data-testid="login-name-input"
            onChange={ this.habilitaBotao }
          />
          <button
            type="button"
            id="botao-habilitado"
            data-testid="login-submit-button"
            onClick={ this.chamaAPI }
            disabled={ estadoBotao }
          >
            Entrar
          </button>
        </div>
      )
    );
  }
}

export default Login;
