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
import Gallery from './pages/UI/gallery/index'
import Carousel from './pages/UI/carousel/index'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import Common from './common'
import OrderDetail from './pages/order/detail'
import Test from './pages/test/index'
import NoMatch from './pages/noMatch/index';

export default class IRouter extends React.Component {

  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login} />

            <Route path='/common' render={()=>
              <Common>
                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
              </Common>
            } />

            <Route path='/' render={()=>
              <Admin>
                <Switch>
                  <Route path='/admin/ui/buttons' component={Buttons} />
                  <Route path='/admin/ui/modals' component={Modals} />
                  <Route path='/admin/ui/loadings' component={Loadings} />
                  <Route path='/admin/ui/notification' component={Notice} />
                  <Route path='/admin/ui/tabs' component={Tabs} />
                  <Route path='/admin/ui/gallery' component={Gallery} />
                  <Route path='/admin/ui/carousel' component={Carousel} />
                  <Route path='/admin/form/login' component={FormLogin} />
                  <Route path='/admin/form/reg' component={FormRegister} />
                  <Route path='/admin/table/basic' component={BasicTable} />
                  <Route path='/admin/table/high' component={HighTable} />
                  <Route path='/admin/city' component={City} />
                  <Route path='/admin/order' component={Order} />
                  <Route path='/admin/test' component={Test} />
                  <Route path='/admin/ui/messages' component={Message} />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}