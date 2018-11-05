import React from 'react';

import Record from './Record.jsx';

class Results extends React.Component {
  render() {
    return (
      <table>

        <tbody>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Image</th>
            <th>Repos</th>
          </tr>
          {
            this.props.data &&
            this.props.data.map(
              item => (<Record item={item} key={`user-${item.id}`}/>)
            )
          }
        </tbody>
      </table>
    )
  }
}

export default Results;
