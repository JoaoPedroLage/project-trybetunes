import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionId,
      artworkUrl100,
    } = this.props;

    return (
      <div className="album-card">
        <Link
          className="album-card-center"
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <h1 data-testid="name-card">{ artistName }</h1>
          <img data-testid="image-card" src={ artworkUrl100 } alt={ artistName } />
          <br />
          <span data-testid="description-card">{ collectionName }</span>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
