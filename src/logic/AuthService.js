import decode from 'jwt-decode'

export default class AuthService {
  constructor (domain) {
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  login (username, password) {
    return this.fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password: password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.setToken(res.token)
        return Promise.resolve(res)
      })
      .catch(error => {
        let badCred = document.getElementById('badCred')
        badCred.innerHTML = 'Niepoprawne dane: błędny login bądź hasło'
      })
  }

  async loggedIn () {
    const token = this.getToken()
    if (!!token && token !== 'undefined' && !this.isTokenExpired(token)) {
      return true
    }
    return false
  }

  isTokenExpired (token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) {
        return true
      } else return false
    } catch (err) {
      return false
    }
  }

  setToken (idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    return localStorage.getItem('id_token')
  }

  //remove token from local storage, user then he is logged out
  async logout () {
    await localStorage.removeItem('id_token')
  }

  getProfile () {
    return decode(this.getToken())
  }

  //set headers for all fetches
  async fetch (url, options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    if (await this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }
  //check if user is authorized
  _checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
