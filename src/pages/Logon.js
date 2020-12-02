import '../App.css'
import React from 'react'

import AuthService from '../logic/AuthService'

class Logon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.Auth = new AuthService() //
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(`${this.state.email}, ${this.state.password}`)
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/home')
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async componentWillMount () {
    if (await this.Auth.loggedIn()) this.props.history.replace('/home')
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Memonary -productive learn words- logon</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder='email'
              name='email'
              onChange={this.handleChange}
            />
            <input
              placeholder='hasło'
              name='password'
              onChange={this.handleChange}
            />
            <button type='submit'>zaloguj</button>
          </form>
          <a className='App-link' href='/register'>
            Zarejestruj się
          </a>
          <a className='App-link' href='/test'>
            rxjs
          </a>
        </header>
      </div>
    )
  }
}

export default Logon
