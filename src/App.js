import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Logon from './pages/Logon.js'
import Registration from './pages/Registration.js'
import Polygon from './pages/Polygon'
import Home from './pages/Home.js'
import CreateFolder from './pages/CreateFolder'
import './sass/main.scss'

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
            <Route path='/folder/create' component={CreateFolder} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
