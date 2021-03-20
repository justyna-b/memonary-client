import React from 'react'
import { Redirect } from 'react-router-dom'

import LanProgress from '../components/LanProgress'
import FolderCard from '../components/FolderCard'
import AuthService from '../logic/AuthService'
import NavbarHeader from '../layout/NavbarHeader'
import WordEdit from '../components/WordEdit'
import LeftNavbarElement from '../components/LeftNavbarElement'

class Folder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      auth: true,
      accurate: '',
      counter: 1,
      navElements: ['pisownia', 'strona glowna', 'fiszki']
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        `http://localhost:3000/folders/${this.props.match.params.folderId}`
      )
        .then(res => {
          this.setState({
            words: res.words,
            accurate: res.words[0]
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

  setNextWord = async () => {
    await this.setState({
      counter: this.state.counter + 1,
      accurate: this.state.words[this.state.counter]
    })
    if (this.state.counter === this.state.words.length) {
      await this.setState({
        next: false
      })
    }
  }

  setPrevWord = async () => {
    if (this.state.counter !== 1) {
      await this.setState({
        counter: this.state.counter - 1,
        accurate: this.state.words[this.state.counter]
      })
    } else {
      await this.setState({ prev: false })
    }
  }

  render () {
    return (
      <div>
        {this.state.auth ? '' : <Redirect to='/logon' />}
        <div>
          <NavbarHeader />
        </div>
        <div className='cols-container'>
          <div className='cols-container__col cols-container__col--nav'>
            {this.state.navElements.map(element => (
              <div key={element}>
                <LeftNavbarElement item={element} folderId={this.props.match.params.folderId} />
              </div>
            ))}
          </div>
          <div className='cols-container__col cols-container__col--flow'>
            <div className='folder--title'>
              {this.props.match.params.folderName}
            </div>
            <div className='folder--fish'>
              <div className='folder--fish__side folder--fish__side--front'>
                {this.state.accurate.definition} {this.state.counter}
              </div>
              <div className='folder--fish__side folder--fish__side--back'>
                {this.state.accurate.translation} {this.state.counter}
              </div>
            </div>
            <div className='prev-next'>
              <button
                className='prev-next--click'
                disabled={this.state.counter === 1}
                onClick={this.setPrevWord}
              >
                &laquo;
              </button>
              <div className='prev-next--counter'>
                {this.state.counter}/{this.state.words.length}
              </div>
              <button
                className='prev-next--click'
                onClick={this.setNextWord}
                disabled={!(this.state.counter < this.state.words.length)}
              >
                &raquo;
              </button>
            </div>
            {this.state.words.map(word => (
              <div key={word._id}>
                <WordEdit
                  definition={word.definition}
                  translation={word.translation}
                />
              </div>
            ))}
          </div>

          <div className='cols-container__col cols-container__col--stuff'>
            trzecia
          </div>
        </div>
      </div>
    )
  }
}

export default Folder
