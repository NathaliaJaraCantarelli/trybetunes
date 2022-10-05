import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      arrayArtistas: [],
    };
  }

  pegaMUsicas = async () => {
    const { location: { pathname } } = this.props;
    const idCompleto = pathname;
    const localDeCorte = 7;
    const id = idCompleto.slice(localDeCorte);
    const musicas = await getMusics(id);
    if (musicas) {
      this.setState({ arrayArtistas: musicas });
    }
  };

  render() {
    this.pegaMUsicas();
    const { arrayArtistas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        { arrayArtistas.length === 0 ? <Loading /> : (
          <>
            <p data-testid="artist-name">{ arrayArtistas[0].artistName }</p>
            <p data-testid="album-name">{ arrayArtistas[0].collectionName }</p>
            <ul>
              { arrayArtistas
                .filter((musicaFilter) => musicaFilter.trackName)
                .map((artista, index) => (
                  <li
                    key={ `music-${index}` }
                  >
                    { artista.trackName }
                    <audio data-testid="audio-component" src="{previewUrl}" controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                    </audio>
                  </li>))}
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
