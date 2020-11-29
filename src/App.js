import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Logon from './pages/Logon.js'
import Registration from './pages/Registration.js'

class App extends React.Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Logon} />
            <Route path='/logon' component={Logon} />
            <Route path='/register' component={Registration} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
