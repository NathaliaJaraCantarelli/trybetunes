import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      arrayArtistas: [],
      estadoRequisicao: true,
      favorites: [],
    };
  }

  async componentDidMount() {
    await this.pegaMusicas();
    await this.retornaMusicasFavoritas();
  }

  retornaMusicasFavoritas = async () => {
    this.setState({ estadoRequisicao: false });
    const favoritas = await getFavoriteSongs();
    if (favoritas) {
      this.setState({
        estadoRequisicao: true,
        favorites: [...favoritas],
      });
    }
  };

  pegaMusicas = async () => {
    const { location: { pathname } } = this.props;
    const idCompleto = pathname;
    const localDeCorte = 7;
    const id = idCompleto.slice(localDeCorte);
    const musicas = await getMusics(id);
    if (musicas) {
      this.setState({ arrayArtistas: musicas });
      return true;
    }
  };

  addMusicaFavorita = async ({ target }) => {
    this.setState({ estadoRequisicao: false });
    const { arrayArtistas, favorites } = this.state;
    const artista = arrayArtistas
      .find((arrayArtista) => arrayArtista.trackId === parseInt(target.id, 10));
    console.log(favorites);
    if (target.checked === true) {
      this.setState({ favorites: [...favorites, artista] });
    }
    await addSong(artista);
    this.setState({ estadoRequisicao: true });
  };

  render() {
    const { arrayArtistas, estadoRequisicao, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        { ((arrayArtistas.length === 0) || (!estadoRequisicao)) ? <Loading /> : (
          <>
            <p data-testid="artist-name">{ arrayArtistas[0].artistName }</p>
            <p data-testid="album-name">{ arrayArtistas[0].collectionName }</p>
            <ul>
              { arrayArtistas
                .filter((musicaFilter) => musicaFilter.trackName)
                .map((artista, index) => (
                  <MusicCard
                    key={ `music-${index}` }
                    artista={ artista }
                    addMusicaFavorita={ this.addMusicaFavorita }
                    index={ index }
                    checkedEstado={ favorites
                      .some((favorite) => artista.trackId === favorite.trackId) }
                  />))}
            </ul>
          </>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Album;
