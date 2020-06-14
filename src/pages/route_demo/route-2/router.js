import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home'
import Main from './../route-1/main'
import Abort from './../route-1/abort'
import Topic from './../route-1/topic'

export default class IRoute extends React.Component {

  render () {
    return (
      <Router>
        <Home>
          <Route exact path='/' component={Main}></Route>
          <Route path='/abort' component={Abort}></Route>
          <Route path='/topic' component={Topic}></Route>
        </Home>
      </Router>
    );
  }
}