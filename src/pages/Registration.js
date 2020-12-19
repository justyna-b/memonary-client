import React from 'react'

import logo from '../assets/logo.svg'

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      repPassword: '',
      apiMsg: '',
      enableReg: false
    }
  }

  onChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    if (
      this.state.username.length > 1 &&
      this.state.email.length > 1 &&
      this.state.password.length > 1 &&
      this.state.repPassword.length > 1
    ) {
      this.setState({ enableReg: true })
    } else {
      this.setState({ apiMsg: 'wrong data' })
    }
  }

  onClickHandler = () => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ apiMsg: data.msg, enableReg: false })
        let usersDiv = document.getElementById('user')
        usersDiv.innerHTML = this.state.apiMsg + '</br>'
      })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='popup'>
            <div className='popup__content-reg '>
              {/* TO DO!!! not the best idea to reload, there must be better way */}
              <a href='/logon' className='popup__content-reg--close'>
                &times;
              </a>
              <img src={logo} alt='logo' className='popup__content-reg--logo' />
              <hr className='horizontal-line vertical-space-between' />
              <div id='user' />
              <div className='popup__content-reg--input'>
                <div>
                  <input
                    placeholder='email'
                    onChange={this.onChange}
                    name='email'
                    className='input logon--input'
                    required='required'
                  />
                </div>
                <div>
                  <input
                    placeholder='nazwa użytkownika'
                    onChange={this.onChange}
                    name='username'
                    className='input logon--input'
                    required='required'
                  />
                </div>
                <div>
                  <input
                    placeholder='hasło'
                    onChange={this.onChange}
                    name='password'
                    type='password'
                    className='input logon--input'
                    required='required'
                  />
                </div>
                <div>
                  <input
                    placeholder='powtórz hasło'
                    onChange={this.onChange}
                    name='repPassword'
                    type='password'
                    className='input logon--input'
                    required='required'
                  />
                </div>
              </div>
              <button
                id='reg-but'
                onClick={this.onClickHandler}
                className='button button-submit button-accept reg-button'
                disabled={!this.state.enableReg}
              >
                zarejestruj
              </button>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default Registration
