import React from 'react';

import SearchBar from '../components/SearchBar.jsx';
import Results from '../components/Results.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results:[],
    }
    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(searchString) {
    console.log(searchString);
    const url = `https://api.github.com/search/users?q=${searchString}`;
    const that = this;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        // console.log(response.status);
        return response.json();
      }).then((data) => {
        console.log(data);
        let results = [];
        data.items.forEach((item) => {
          const record = {id: item.id, login: item.login, image: item.avatar_url, repos: item.repos_url }
          results.push(record);
        });
        that.setState({results});
        return results;
      // }).then((data) => {
      //   console.log(data);
      //   let numRepoRequests = [];
      //   data.forEach((item) => {
      //     numRepoRequests.push(fetch(item.repos, {
      //       method: 'GET',
      //     }).then((response) => {
      //       return response.json();
      //     }))
      //   })
      //   return Promise.all(numRepoRequests);
      // }).then((data) => {
      //   console.log(data);
      })
      .catch(alert);
  }

  render () {
    return (
      <div>
        <SearchBar handler={this.searchHandler}/>
        <Results data={this.state.results} />
      </div>
    )
  }
}

export default Search
