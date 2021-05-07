import React from 'react'

import logo from '../assets/logoDark.svg'
import AuthService from '../logic/AuthService'

class NavbarHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      toggle: false,
      email: '',
      username: ''
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(`${process.env.REACT_APP_BASE_URL}/get/me`)
        .then(res => {
          this.setState({
            username: res.username,
            email: res.email
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

    this.Auth.fetch(`${process.env.REACT_APP_BASE_URL}/users/logout-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    })
      .then(this.Auth.logout())
      .then(window.location.reload())
      .then((window.location.href = '/logon'))
  }

  render () {
    return (
      <div className='header'>
        <div className='header__elems-container'>
          <div className='phone-nav'>
            <a href='/tworzenie' className='phone-nav--el' id='separator'>
              tworzenie
            </a>
            <div onClick={this.onClickLogOut} className='phone-nav--el' id='phone-logout'>wyloguj</div>
          </div>
          <div
            className='header__elems-container--icon'
            onClick={this.onClickLogOut}
          >
            Witaj {this.state.username}: wyloguj
          </div>
          <div id='logo'>
            <a href='/tablica'>
              <img src={logo} alt='logo' className='header-logo' />
            </a>
          </div>
        </div>
      </div>
    )
  }
}
export default NavbarHeader
