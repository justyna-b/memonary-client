import React from 'react'
import { Redirect } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import LanProgress from '../components/LanProgress'
import FolderCard from '../components/FolderCard'
import AuthService from '../logic/AuthService'
import NavbarHeader from '../layout/NavbarHeader'
import WordEdit from '../components/WordEdit'
import LeftNavbarElement from '../components/LeftNavbarElement'
import FolderEdition from '../components/FolderEdition'

class Folder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      auth: true,
      accurate: '',
      counter: 1,
      navElements: ['pisownia', 'tablica', 'fiszki'],
      editionMode: 'edition',
      language: '',
      keyboard: [],
      noEdit: null
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    this.setState({noEdit: 'no-edit'})
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        `${process.env.REACT_APP_BASE_URL}/folders/${this.props.match.params.folderId}`
      )
        .then(res => {
          this.setState({
            words: res.words,
            accurate: res.words[0],
            language: res.language
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
        counter: this.state.counter - 1
      })
      await this.setState({
        accurate: this.state.words[this.state.counter - 1]
      })
    } else {
      await this.setState({ prev: false })
    }
  }
  enterEditMode = () => {
    let keyboard = []
    switch (this.state.language) {
      case 'angielski':
        this.setState({
          keyboard: ['é', 'è', 'â', 'î', 'ô', 'ñ', 'ü', 'ï', 'ç']
        })
        break
      case 'niemeicki':
        this.setState({ keyboard: ['Ä', 'ä', 'Ö', 'ö', 'Ü', 'ü', 'ß', 'ẞ'] })
        break
      case 'hiszpański':
        this.setState({ keyboard: ['Ñ', 'ñ'] })
        break
      default:
        break
    }
    this.setState({ editionMode: 'hide-fish', noEdit: 'edition-mode' })
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
            <div className='nav-home'>
              {this.state.navElements.map(element => (
                <div key={element}>
                  <LeftNavbarElement
                    item={element}
                    folderId={this.props.match.params.folderId}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='cols-container__col cols-container__col--flow'>
            <div className={`${this.state.editionMode}`}>
              <div className='folder--title'>
                {this.props.match.params.folderName}
              </div>
              <div className='phone-stuff'>
                <a href={`/pisownia/${this.props.match.params.folderId}`}>
                  <button
                    id='phone-start-lern'
                    className='button-submit orange'
                  >
                    rozpocznij naukę
                  </button>
                </a>
              </div>
              <div className='folder--fish'>
                <div className='folder--fish__side folder--fish__side--front'>
                  {this.state.accurate.definition}
                </div>
                <div className='folder--fish__side folder--fish__side--back'>
                  {this.state.accurate.translation}
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
              <div className='center-icon' onClick={this.enterEditMode}>
                <Icon
                  name='edit outline'
                  className='center-icon--elem'
                  size='huge'
                />
              </div>
            </div>
            <div className={`${this.state.noEdit}`}>
              <FolderEdition
                words={this.state.words}
                language={this.state.language}
                keyboard={this.state.keyboard}
                folder_id={this.props.match.params.folderId}
                folderTitle={this.props.match.params.folderName}
              />
            </div>
          </div>
          <div className='cols-container__col cols-container__col--stuff'>
            {''}
          </div>
        </div>
      </div>
    )
  }
}

export default Folder
