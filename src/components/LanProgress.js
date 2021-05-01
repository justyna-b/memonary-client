import React from 'react'

import AuthService from '../logic/AuthService'
import Language from './Language'

class LanProgress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      languages: [],
      auth: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://localhost:3000/languages')
        .then(res => {
          this.setState({
            languages: res
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

  render () {
    return (
      <div>
        <div className='lan-progress-container'>
          <div className='lan-progress-container__title'>twoje języki</div>
          <hr className='horizontal-line-thick' />
          <div className='lan-progress-container__row'>
            {this.state.languages.map(language => (
              <div className='lan-progress-container__row--col'>
                <Language language={language.language} progress={language.totalPerc}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default LanProgress
