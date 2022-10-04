import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      botaoPesquisa: true,
    };
  }

  habilitaBotaoPesquisa = ({ target }) => {
    this.setState({ pesquisa: target.value }, () => {
      const { pesquisa } = this.state;
      if (pesquisa.length >= 2) {
        this.setState({ botaoPesquisa: false });
      }
    });
  };

  render() {
    const { pesquisa, botaoPesquisa } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ pesquisa }
            onChange={ this.habilitaBotaoPesquisa }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ botaoPesquisa }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
