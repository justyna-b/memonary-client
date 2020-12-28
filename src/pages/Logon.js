import React from 'react'

import AuthService from '../logic/AuthService'
import globeII from '../assets/globeII.png'
import Popup from '../components/Popup'
import Registration from './Registration'

class Logon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      register: false
    }
    this.Auth = new AuthService()
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

  handleRegister = () => {
    this.setState({ register: true })
  }

  async componentWillMount () {
    if (await this.Auth.loggedIn()) this.props.history.replace('/home')
  }

  render () {
    return (
      <div className='logon-cmp'>
        <body>
          <header className='logon-cmp--container'>
            {this.state.register ? <Registration /> : null}
            <div className='grid-row--col-1-of-2 logon-cmp--container__logon'>
              <div>
                <div className='logon-cmp--container__logon__form'>
                  <h1 className='logon--title'> Memonary</h1>
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <div>
                        <input
                          placeholder='email'
                          name='email'
                          onChange={this.handleChange}
                          className='input logon--input'
                        />
                      </div>
                      <div className='logon--input'>
                        <input
                          placeholder='hasło'
                          name='password'
                          onChange={this.handleChange}
                          type='password'
                          className='input logon--input'
                        />
                      </div>
                      <button
                        type='submit'
                        className='button button-submit button-accept'
                      >
                        zaloguj
                      </button>
                    </form>
                    <div className='vertical-space-between'>
                      <a href='#!' className='text-link text-pwd'>
                        Nie pamiętasz hasła?
                      </a>
                    </div>
                    <hr className='horizontal-line' />
                    <div>
                      <button
                        className='button button-submit button-reg'
                        onClick={this.handleRegister}
                      >
                        Zarejestruj się
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid-row--col-1-of-2 logon-cmp--container__photo'></div>
          </header>
        </body>
      </div>
    )
  }
}

export default Logon
