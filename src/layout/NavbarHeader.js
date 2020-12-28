import React from 'react'
import Gravatar from 'react-gravatar'

import logo from '../assets/logoDark.svg'
import AuthService from '../logic/AuthService'
import Toggler from '../components/Toggler'

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
      this.Auth.fetch('http://localhost:3000/get/me')
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

  toggleHandler = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render () {
    return (
      <div className='header'>
        <img src={logo} alt='logo' className='header--logo' />

        <Gravatar
          email={this.state.email}
          className='header--gravatar'
          onClick={this.toggleHandler}
        />
        {this.state.toggle ? (
          <Toggler email={this.state.email} username={this.state.username} />
        ) : null}
        <div className='header--create'>
          <a href='/folder/create' className='header--create__link'>
            <span id='header--create__link__plus'>&#43;</span> Stwórz{' '}
          </a>
        </div>
      </div>
    )
  }
}
export default NavbarHeader
