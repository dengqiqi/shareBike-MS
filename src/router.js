import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/UI/buttons/index'
import Modals from './pages/UI/modals/index'
import Loadings from './pages/UI/loadings/index'
import Notice from './pages/UI/notice/index'
import Message from './pages/UI/messages/index'
import Tabs from './pages/UI/tabs/index'
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
                <Route path='/admin/ui/modals' component={Modals} />
                <Route path='/admin/ui/loadings' component={Loadings} />
                <Route path='/admin/ui/notification' component={Notice} />
                <Route path='/admin/ui/tabs' component={Tabs} />
                <Route path='/admin/ui/messages' component={Message} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          } />
        </App>
      </HashRouter>
    );
  }
}