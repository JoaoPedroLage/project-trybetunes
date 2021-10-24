import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

export default class Album extends React.Component {
  constructor() {
    super();

    this.onGetMusics = this.onGetMusics.bind(this);

    this.state = {
      artistName: '',
      albumName: '',
      arrayArtist: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.onGetMusics();
  }

  onGetMusics() {
    const { match: { params: { id } } } = this.props;

    this.setState(
      { loading: true },
      async () => {
        const request = await getMusics(id);
        await request;
        this.setState({
          artistName: request[0].artistName,
          albumName: request[0].collectionName,
          arrayArtist: request,
          loading: false,
        });
      },
    );
  }

  renderMusicCards() {
    const { arrayArtist } = this.state;
    let result;

    return arrayArtist.map(
      (render, index) => {
        if (index >= 1) result = <MusicCard { ...render } key={ render.trackId } />;
        return result;
      },
    );
  }

  render() {
    const { loading, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <h2>Album</h2>
        { loading === true ? <Loading /> : (
          <>
            <div className="artist-album">
              <h3 data-testid="artist-name">{artistName}</h3>
              <h3>
                &nbsp;
                -
                &nbsp;
              </h3>
              <h3 data-testid="album-name">{albumName}</h3>
            </div>
            {this.renderMusicCards()}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
};
