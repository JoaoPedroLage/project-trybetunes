import React from 'react';

export default class Search extends React.Component {
  constructor() {
    super();

    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);

    this.state = {
      isSearchButtonDisabled: 'true',
      searchName: '',
    };
  }

  onSearchButtonClick({ target }) {
    const { name, value } = target;

    this.setState(({ [name]: value }), () => {
      const { searchName } = this.state;
      const minChar = 2;

      if (searchName.length >= minChar) {
        this.setState({ isSearchButtonDisabled: false });
      } else {
        this.setState({ isSearchButtonDisabled: true });
      }
    });
  }

  render() {
    const { searchName, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <form>
          <label htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              name="searchName"
              value={ searchName }
              onChange={ this.onSearchButtonClick }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
