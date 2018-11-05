import React from 'react';

class Record extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id}</td>
        <td>{this.props.item.login}</td>
        <td><img width='100' height='100' src={this.props.item.image} /></td>
        <td>Repos</td>
      </tr>
    )
  }
}

export default Record;
