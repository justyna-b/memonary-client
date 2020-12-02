import '../App.css'
import React from 'react'

class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      repPassword: ''
    }
  }

  onChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onClickHandler = () => {
    console.log('hej')
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        let usersDiv = document.getElementById('user')
        usersDiv.innerHTML += data.msg + '</br>'
      })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Memonary -rejestracja!!!!!</h1>
          <div id='user' />
          <input placeholder='imię' onChange={this.onChange} name='name' />
          <input
            placeholder='nazwisko'
            onChange={this.onChange}
            name='surname'
          />
          <input placeholder='email' onChange={this.onChange} name='email' />
          <input
            placeholder='nazwa uzytkownika'
            onChange={this.onChange}
            name='username'
          />
          <input placeholder='haslo' onChange={this.onChange} name='password' />
          <input
            placeholder='powtorz haslo'
            onChange={this.onChange}
            name='repPassword'
          />
          <button onClick={this.onClickHandler}>zarejestruj mnie</button>
          <div>
            <a className='App-link' href='/logon'>logowanie</a>
          </div>
        </header>
      </div>
    )
  }
}

export default Registration
