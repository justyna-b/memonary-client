import React from 'react'
import { Redirect } from 'react-router-dom'

import LanProgress from '../components/LanProgress'
import FolderCard from '../components/FolderCard'
import AuthService from '../logic/AuthService'
import NavbarHeader from '../layout/NavbarHeader'
import WordEdit from '../components/WordEdit'
import LeftNavbarElement from '../components/LeftNavbarElement'
import Reminder from '../components/Reminder'
import ReminderFinished from '../components/ReminderFinished'
import WritingCard from '../components/WritingCard'
import Progressbar from '../components/Progressbar'

class Writing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      wordsToLearn: [],
      auth: true,
      accurate: '',
      counter: 1,
      navElements: ['pisownia', 'strona glowna', 'fiszki'],
      hidden: false,
      progress: null,
      showFinished: false,
      showReminder: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    this.getData()
  }

  getData = async () => {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        `http://localhost:3000/folders/${this.props.match.params.folderId}`
      )
        .then(res => {
          this.setState({
            words: res.words,
            wordsToLearn: res.still_to_know_words,
            accurate: res.words[0],
            progress: res.progress,
            //do not show only if progress is finished
            // jezeli progress jest mniejszy lub rowny 0 a tablica nie umianych slow pusta
            showFinished:
              res.progress >= 100 && res.still_to_know_words.length === 0
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

  hideReminder = () => {
    // hide both
    this.setState({
      hidden: true,
      showReminder: false,
      showFinished: false
    })
  }

  handleReset = async () => {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(
        `http://localhost:3000/folder/to-know-words/${this.props.match.params.folderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
          },
          body: JSON.stringify({
            to_know_words: [],
            progress: 0
          })
        }
      )
        .then(this.getData())
        .then(this.hideReminder())
        //TODO: find way without reloading the whole page
        .then(window.location.reload())
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
    const reminderTitle = `Hej, zaczekaj chwilę!`
    const reminderContent = ` Pamiętaj, Twoje wyniki aktualizowane są po ukończeniu rundy.`
    const reminderGreets = `Powodzenia!`

    const reminderFullKnownTitle = `Cześć!`
    const reminderFullKnownSubtitle = `Chcesz zacząć od nowa?`
    const reminderFullKnownGreet = `Cześć ponownie!`

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
                <LeftNavbarElement item={element} />
              </div>
            ))}
          </div>
          {this.state.showReminder}
          <div className='cols-container__col cols-container__col--flow'>
            <Reminder
              content={reminderContent}
              title={reminderTitle}
              greets={reminderGreets}
              visibility={
                !this.state.showFinished && this.state.showReminder
                  ? 'visible'
                  : 'hidden'
              }
              button='Zaczynamy'
              onClick={this.hideReminder}
            />
            <ReminderFinished
              content={reminderFullKnownSubtitle}
              title={reminderFullKnownTitle}
              greets={reminderFullKnownGreet}
              visibility={this.state.showFinished ? 'visible' : 'hidden'}
              button='Zresetuj'
              onClick={this.handleReset}
            />
            {/* here hidden mode works opposite to reminder. (target: show if reminder is hidden) */}
            <WritingCard
              visibility={this.state.hidden ? 'visible' : 'hidden'}
              folderId={this.props.match.params.folderId}
              onProgressChange={this.getData}
            />
          </div>

          <div className='cols-container__col cols-container__col--stuff'>
            trzecia
          </div>
        </div>
      </div>
    )
  }
}

export default Writing
