import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import AuthService from '../logic/AuthService'
import NavbarHeader from '../layout/NavbarHeader'
import HPMainFlow from '../layout/HPMainFlow'
import LeftNavbarElement from '../components/LeftNavbarElement'


class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      token: localStorage.getItem('id_token'),
      navElements: ['tablica', 'tworzenie']
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(`${process.env.REACT_APP_BASE_URL}/get/me`)
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

    this.Auth.fetch(`${process.env.REACT_APP_BASE_URL}/users/logout`, {
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
          <div className='cols-container__col cols-container__col--nav '>
          <div className='nav-home'>
            {this.state.navElements.map(element => (
              <div key={element} >
                <LeftNavbarElement item={element} />
              </div>
            ))}
            </div>
          </div>
          <div className='cols-container__col cols-container__col--flow'>
            <HPMainFlow />
          </div>
          <div className='cols-container__col cols-container__col--stuff'>
            {`${' '}`}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
