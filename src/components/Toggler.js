import React from 'react'
import Gravatar from 'react-gravatar'

import logo from '../assets/logoDark.svg'
import AuthService from '../logic/AuthService'

class Toggler extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      toggle: false,
      email: this.props.email,
      username: this.props.username
    }
    this.Auth = new AuthService()
  }

  onClickLogOut = event => {
    event.preventDefault()

    this.Auth.fetch('http://localhost:3000/users/logout', {
      method: 'POST'
    })
      .then(this.Auth.logout())
      .then(window.location.reload())
      .then((window.location.href = '/logon'))
  }

  render () {
    return (
      <div className='toggler'>
        <div className='toggler--gravatar'>
          <Gravatar
            email={this.state.email}
            className='toggler--gravatar__img'
          />
        </div>

        <div className='toggler--profile'>
          <div className='toggler--profile__username'>
            {this.state.username}
          </div>
          <div>pokaż profil</div>
        </div>
        <hr className='toggler--line' />
        <button
          className='toggler--button button-accept'
          onClick={this.onClickLogOut}
        >
          wyloguj
        </button>
      </div>
    )
  }
}
export default Toggler
