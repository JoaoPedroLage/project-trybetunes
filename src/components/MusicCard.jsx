import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Card extends React.Component {
  constructor() {
    super();

    this.onAddSong = this.onAddSong.bind(this);
    this.onGetFavoriteSongs = this.onGetFavoriteSongs.bind(this);
    this.isFavoriteMusic = this.isFavoriteMusic.bind(this);

    this.state = {
      loading: false,
      isChecked: false,
      favoriteArtistList: [],
    };
  }

  componentDidMount() {
    this.onGetFavoriteSongs();
  }

  onGetFavoriteSongs() {
    this.setState(
      { loading: true },
      async () => {
        const response = await getFavoriteSongs();
        await response;
        this.setState({
          favoriteArtistList: response,
          loading: false });
        this.isFavoriteMusic();
      },
    );
  }

  onAddSong() {
    const { trackId } = this.props;
    const { isChecked } = this.state;

    this.setState(
      { loading: true },
      async () => {
        await addSong(trackId);
        this.setState(isChecked === true
          ? { isChecked: false }
          : { isChecked: true });
        this.setState({ loading: false });
      },
    );
  }

  isFavoriteMusic() {
    const { trackId } = this.props;
    const { favoriteArtistList } = this.state;

    favoriteArtistList
      .forEach((id) => (id === trackId && this.setState({ isChecked: true })));
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
