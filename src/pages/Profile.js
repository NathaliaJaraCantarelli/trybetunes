import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.retornaUsuario();
  }

  retornaUsuario = async () => {
    const teste = await getUser();
    if (teste) {
      this.setState({
        name: teste.name,
        email: teste.email,
        image: teste.image,
        description: teste.description,
      });
    }
  };

  render() {
    const { name, image, email, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
        { name.length !== 0 ? (
          <>
            <p>Nome:</p>
            <p>{ name }</p>
            <img src={ image } alt="foto usuario" data-testid="profile-image" />
            <p>E-mail:</p>
            <p>{ email }</p>
            <p>Descrição:</p>
            <p>{ description }</p>
          </>
        ) : <Loading /> }
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
