import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
