import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
    };
  }

  componentDidMount() {
    this.pegaUsuario();
  }

  pegaUsuario = async () => {
    const user = await getUser();
    this.setState({ nameUser: user.name });
  };

  render() {
    const { nameUser } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { nameUser !== '' ? nameUser : <Loading /> }
        </p>
      </header>
    );
  }
}

export default Header;
