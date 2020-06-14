import React from 'react'
import {HashRouter } from 'react-router-dom'

export default class Main extends React.Component{

  render() {
    return (
      // HashRouter内部也必须是一个根元素包裹
        <div>
          this is Main page
        </div>
    );
  }
}