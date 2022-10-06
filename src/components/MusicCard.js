import React from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  render() {
    const { artista, index, addMusicaFavorita, checkedEstado } = this.props;
    return (
      <li
        key={ `music-${index}` }
      >
        { artista.trackName }
        <audio
          data-testid="audio-component"
          src={ artista.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor="checkbox"
        >
          Favorita
          <input
            type="checkbox"
            name={ artista.trackId }
            id={ `id${index}` }
            onChange={ addMusicaFavorita }
            checked={ checkedEstado }
            data-testid={ `checkbox-music-${artista.trackId}` }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  artista: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  addMusicaFavorita: PropTypes.func.isRequired,
  checkedEstado: PropTypes.bool.isRequired,
};

export default MusicCard;
