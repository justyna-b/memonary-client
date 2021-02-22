import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import AuthService from '../logic/AuthService'
import NavbarHeader from '../layout/NavbarHeader'
import HPMainFlow from '../layout/HPMainFlow'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      token: localStorage.getItem('id_token')
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://localhost:3000/get/me')
        .then(res => {
          this.setState({
            name: res.name
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
      this.Auth.logout()
      window.location.reload()
      window.location.href = '/logon'
    }
  }

  onClickLogOut = event => {
    event.preventDefault()

    this.Auth.fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + this.state.token }
    })
      .then(this.Auth.logout())
      .then(window.location.reload())
      .then((window.location.href = '/logon'))
  }
  render () {
    return (
      <div>
        {this.state.auth ? '' : <Redirect to='/logon' />}
        <div>
          <NavbarHeader />
        </div>
        <div className='cols-container'>
          <div className='cols-container__col cols-container__col--nav'>
            pierwsza
          </div>
          <div className='cols-container__col cols-container__col--flow'>
            <HPMainFlow />
          </div>
          <div className='cols-container__col cols-container__col--stuff'>
            trzecia
          </div>
        </div>
      </div>
    )
  }
}

export default Home
