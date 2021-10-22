import React from 'react';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

export default class Search extends React.Component {
  constructor() {
    super();

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onSearchArtist = this.onSearchArtist.bind(this);
    this.renderAlbumsCards = this.renderAlbumsCards.bind(this);

    this.state = {
      searchName: '',
      isSearchButtonDisabled: true,
      loading: false,
      findArtist: false,
      artist: [],
      artistName: '',
    };
  }

  onSearchInputChange({ target }) {
    const { name, value } = target;

    this.setState(({ [name]: value }), () => {
      const { searchName } = this.state;
      const minChar = 2;

      if (searchName.length >= minChar) {
        this.setState({ isSearchButtonDisabled: false });
      } else { this.setState({ isSearchButtonDisabled: true }); }
    });
  }

  onSearchArtist() {
    const { searchName } = this.state;

    this.setState(
      { loading: true },
      async () => {
        const response = await searchAlbumsAPI(searchName);
        if (response.length > 0) this.setState({ findArtist: true });
        this.setState({ searchName: '',
          loading: false,
          artist: response,
          artistName: searchName,
        });
        this.renderAlbumsCards();
      },
    );
  }

  renderAlbumsCards() {
    const { artist } = this.state;
    return artist.map(
      (render) => (<Card { ...render } key={ render.collectionId } />),
    );
  }

  render() {
    const { searchName,
      isSearchButtonDisabled,
      findArtist,
      loading,
      artistName } = this.state;
    return (
      <div data-testid="page-search">
        { loading === true ? <Loading /> : (
          <form>
            <h2>Search</h2>
            <label htmlFor="search-artist-input">
              <input
                data-testid="search-artist-input"
                name="searchName"
                value={ searchName }
                onChange={ this.onSearchInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              name="searchButton"
              disabled={ isSearchButtonDisabled }
              onClick={ this.onSearchArtist }
            >
              Pesquisar
            </button>
            <br />
            <br />
            { findArtist === false ? (
              <span>
                Nenhum álbum foi encontrado
              </span>)
              : (
                <>
                  <span>
                    {`Resultado de álbuns de: ${artistName}`}
                  </span>
                  <section className="album-cards">
                    {this.renderAlbumsCards()}
                  </section>
                </>
              )}
          </form>)}
      </div>
    );
  }
}
