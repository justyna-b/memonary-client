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

  onChange = async event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })

    //being in another field than email check if email is valid
    //conditions :
    // 1: it is not empty
    // 2: it is valid in regex
    const validEmailConstruct = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
    let wrongEmail = document.getElementById('user')
    if (event.target.name !== 'email') {
      if (
        !validEmailConstruct.test(this.state.email) &&
        wrongEmail.innerHTML === '' &&
        this.state.email.length > 1
      ) {
        wrongEmail.innerHTML += 'Wpisz poprawny adres email'
      } // validate pwds
      //pwd are valid
      else if (
        event.target.name == 'repPassword' &&
        event.target.value === this.state.password &&
        this.state.email.length > 1 &&
        this.state.username.length > 1
      ) {
        this.setState({ enableReg: true })
      } //pwds are valid
      else if (
        event.target.name === 'username' &&
        this.state.password.length > 1 &&
        this.state.repPassword.length > 1 &&
        this.state.password === this.state.repPassword
      ) {
        this.setState({ enableReg: true })
      }
    } //if it is email field validate currently given data
    else if (event.target.name === 'email') {
      if (validEmailConstruct.test(event.target.value)) {
        wrongEmail.innerHTML = ''
      }
    } else if (
      (event.target.name === 'email' || event.target.name === 'username') &&
      this.state.password.length > 1 &&
      this.state.repPassword.length > 1
    ) {
      this.setState({ enableReg: true })
    }
  }

  onClickHandler = () => {
    const validEmailConstruct = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
    let validationInfo = document.getElementById('user')
    if (!validEmailConstruct.test(this.state.email)){
      validationInfo.innerHTML += "Błędny adres email"
    } else if ( this.state.username.length < 1) {
      validationInfo.innerHTML += "Uzupełnij swoją nazwę użytkownika"
    } else if (this.state.password !== this.state.repPassword) {
      validationInfo.innerHTML += "Podane hasła muszą być takie same"
    } else {
        fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
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
          let usersDiv = document.getElementById('msg')
          usersDiv.innerHTML = this.state.apiMsg + '</br>'
        })
    }
  }
  validatePwd = () => {}

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
              <div id='msg' />
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
