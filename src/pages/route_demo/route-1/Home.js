import React from 'react'
import {HashRouter, Route, Link } from 'react-router-dom'
import Main from './main'
import Abort from './abort'
import Topic from './topic'

export default class Home extends React.Component{
  state = {};

  render() {
    return (
      // HashRouter内部也必须是一个根元素包裹
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/abort">About</Link>
            </li>
            <li>
              <Link to="/topic">Topics</Link>
            </li>
          </ul>
          <hr/>
          <Route exact path='/' component={Main}></Route>
          <Route path='/abort' component={Abort}></Route>
          <Route path='/topic' component={Topic}></Route>
        </div>
      </HashRouter>
    );
  }
}