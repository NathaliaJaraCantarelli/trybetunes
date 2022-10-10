import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      estadoBotao: true,
    };
  }

  componentDidMount() {
    this.retornaUsuario();
  }

  habilitaBotao = () => {
    const { name, image, email, description } = this.state;
    if ((name.length > 0) && (image.length > 0) && (
      email.length > 0) && (description.length > 0)) {
      this.setState({ estadoBotao: false });
    }
  };

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

  novoValorUsuario = ({ target }) => {
    this.habilitaBotao();
    this.setState({ [target.name]: [target.value] });
  };

  salvarUsuario = async () => {
    const { name, image, email, description } = this.state;
    const { history } = this.props;
    const dadosUsuario = {
      name: name[0],
      image: image[0],
      email: email[0],
      description: description[0],
    };
    const salvo = await updateUser(dadosUsuario);
    if (salvo) {
      history.push('/profile');
    }
  };

  render() {
    const { name, image, email, description, estadoBotao } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Editar perfil</p>
        { name.length !== 0 ? (
          <>
            <p>Nome:</p>
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              value={ name }
              onChange={ this.novoValorUsuario }
            />
            <p>{ name }</p>
            <img
              src={ image }
              alt="foto usuario"
            />
            <input
              type="text"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.novoValorUsuario }
            />
            <p>E-mail:</p>
            <input
              type="text"
              name="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ this.novoValorUsuario }
            />
            <p>Descrição:</p>
            <input
              type="text"
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.novoValorUsuario }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ this.salvarUsuario }
              disabled={ estadoBotao }
            >
              Salvar
            </button>
          </>
        ) : <Loading /> }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ProfileEdit;
