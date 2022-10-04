import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      nomeProcurado: '',
      botaoPesquisa: true,
      estadoPosBotao: 0,
      artistasDaPesquisa: [],
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

  aposPressionarBotao = async () => {
    const { pesquisa } = this.state;
    const dadosPesquisados = await searchAlbumsAPI(pesquisa);
    this.setState({ estadoPosBotao: 1 });
    const artistasPesquisados = dadosPesquisados
      .filter((dado) => dado.artistName.includes(pesquisa));
    if (dadosPesquisados) {
      this.setState({
        nomeProcurado: pesquisa,
        pesquisa: '',
        artistasDaPesquisa: artistasPesquisados,
        estadoPosBotao: 2,
      });
    }
  };

  render() {
    const { pesquisa, botaoPesquisa, artistasDaPesquisa, estadoPosBotao,
      nomeProcurado } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>
          <input
            className="barraPesquisa"
            type="text"
            data-testid="search-artist-input"
            value={ pesquisa }
            onChange={ this.habilitaBotaoPesquisa }
          />
          <button
            className="barraPesquisa"
            type="button"
            data-testid="search-artist-button"
            onClick={ this.aposPressionarBotao }
            disabled={ botaoPesquisa }
          >
            Pesquisar
          </button>
          { estadoPosBotao === 1 && (
            <Loading />
          )}
          { estadoPosBotao === 2 && (
            <>
              <p>
                Resultado de álbuns de:
                {' '}
                { nomeProcurado }
              </p>
              <ul>
                { artistasDaPesquisa.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
                  artistasDaPesquisa.map((artista, index) => (
                    <li key={ index }>
                      {/* <p>{ artista.collectionName }</p> */}
                      <p>
                        <Link
                          data-testid={ `link-to-album-${artista.collectionId}` }
                          to={ `/album/${artista.collectionId}` }
                        >
                          { artista.collectionName }
                        </Link>
                      </p>
                    </li>
                  )))}
              </ul>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Search;
