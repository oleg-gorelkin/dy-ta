import React from 'react';


class SearchBar extends React.Component {
  constructor (props) {
    super (props);

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler (e) {
    let searchString = document.getElementById('search-text').value;
    this.props.handler(searchString);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <input type='text' id='search-text' />
        <button onClick={this.searchHandler} >Search</button>
      </div>
    )
  }
}

export default SearchBar;
