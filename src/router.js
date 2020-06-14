import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/UI/Buttons/index'
import NoMatch from './pages/noMatch/index';

export default class IRouter extends React.Component {

  render () {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login} />
          <Route path='/' render={()=>
            <Admin>
              <Switch>
                <Route path='/admin/ui/buttons' component={Buttons} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          } />
        </App>
      </HashRouter>
    );
  }
}