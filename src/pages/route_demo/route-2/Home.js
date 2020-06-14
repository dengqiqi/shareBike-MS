import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component{
  state = {};

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Hom1e</Link>
          </li>
          <li>
            <Link to="/abort">About1</Link>
          </li>
          <li>
            <Link to="/topic">Topics1</Link>
          </li>
        </ul>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}