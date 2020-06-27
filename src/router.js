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
import User from './pages/user/index'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar/index'
import Pie from './pages/echarts/pie/index'
import Line from './pages/echarts/line/index'
import RichText from './pages/rich/index'
import PermissionUser from './pages/permission/index'
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
                  <Route path='/ui/buttons' component={Buttons} />
                  <Route path='/ui/modals' component={Modals} />
                  <Route path='/ui/loadings' component={Loadings} />
                  <Route path='/ui/notification' component={Notice} />
                  <Route path='/ui/tabs' component={Tabs} />
                  <Route path='/ui/gallery' component={Gallery} />
                  <Route path='/ui/carousel' component={Carousel} />
                  <Route path='/form/login' component={FormLogin} />
                  <Route path='/form/reg' component={FormRegister} />
                  <Route path='/table/basic' component={BasicTable} />
                  <Route path='/table/high' component={HighTable} />
                  <Route path='/city' component={City} />
                  <Route path='/order' component={Order} />
                  <Route path='/user' component={User} />
                  <Route path='/bikeMap' component={BikeMap} />
                  <Route path='/charts/bar' component={Bar} />
                  <Route path='/charts/pie' component={Pie} />
                  <Route path='/charts/line' component={Line} />
                  <Route path='/rich' component={RichText} />
                  <Route path='/permission' component={PermissionUser} />
                  <Route path='/test' component={Test} />
                  <Route path='/ui/messages' component={Message} />
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