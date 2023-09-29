import React from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  render() {
    const { artista, index, addRemoveMusicaFavorita, checkedEstado } = this.props;
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
          htmlFor={ artista.trackId }
        >
          Favorita
          <input
            type="checkbox"
            name={ artista.trackId }
            id={ artista.trackId }
            artista={ artista }
            onChange={ addRemoveMusicaFavorita }
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
  addRemoveMusicaFavorita: PropTypes.func.isRequired,
  checkedEstado: PropTypes.bool.isRequired,
};

export default MusicCard;
