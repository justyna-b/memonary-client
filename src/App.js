import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Logon from './pages/Logon.js'
import Registration from './pages/Registration.js'
import Polygon from './pages/Polygon'
import Home from './pages/Home.js'

class App extends React.Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Logon} />
            <Route path='/logon' component={Logon} />
            <Route path='/register' component={Registration} />
            <Route path='/test' component={Polygon} />
            <Route path='/home' component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
