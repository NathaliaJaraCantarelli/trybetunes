import React, { Component } from 'react';
import Header from './components/Header';
import Loading from './pages/Loading';
import { getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';
import MusicCard from './components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      estadoRequisicao: true,
      favorites: [],
    };
  }

  async componentDidMount() {
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

  addRemoveMusicaFavorita = async ({ target }) => {
    this.setState({ estadoRequisicao: false });
    const { favorites } = this.state;
    const artista = favorites
      .find((arrayArtista) => arrayArtista.trackId === parseInt(target.id, 10));
    await removeSong(artista);
    await this.retornaMusicasFavoritas();
    this.setState({ estadoRequisicao: true });
  };

  render() {
    const { estadoRequisicao, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Album</p>
        { ((!estadoRequisicao)) ? <Loading /> : (
          <ul>
            { favorites
              .map((artista, index) => (
                <MusicCard
                  key={ `music-${index}` }
                  artista={ artista }
                  addRemoveMusicaFavorita={ this.addRemoveMusicaFavorita }
                  index={ index }
                  checkedEstado={ 0 }
                />))}
          </ul>
        ) }
      </div>
    );
  }
}

export default Favorites;
