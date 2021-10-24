import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class Card extends React.Component {
  constructor() {
    super();

    this.onAddSong = this.onAddSong.bind(this);

    this.state = { loading: false, isChecked: false };
  }

  onAddSong() {
    const { trackId } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await addSong(trackId);
        this.setState({ loading: false, isChecked: true });
      },
    );
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const { loading, isChecked } = this.state;

    return (
      <div>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        { loading === true ? <Loading /> : (
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.onAddSong }
              checked={ isChecked }
            />
          </label>)}
      </div>
    );
  }
}

Card.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
