import React from 'react';
import PropTypes from 'prop-types';
import addSong from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class Card extends React.Component {
  constructor() {
    super();

    this.onAddSong = this.onAddSong.bind(this);

    this.state = { loading: false };
  }

  onAddSong() {
    this.setState(
      { loading: true },
      async () => {
        const { match: { params: { id } } } = this.props;

        await addSong(id);
        this.setState({ loading: false });
      },
    );
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const { loading } = this.state;

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
              onClick={ this.onAddSong }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
};
