import React from 'react'

import AuthService from '../logic/AuthService'
import Progressbar from '../components/Progressbar'


class WritingCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      wordsToLearn: [],
      accurate: '',
      counter: 0,
      enableCheck: false,
      showCorrect: 'do-not-show',
      showDefinition: 'show',
      showIncorrect: 'do-not-show',
      round: 1,
      showEndOfRound: 'do-not-show',
      unknownWord: {},
      unknownWordA: [],
      showCongrats: 'do-not-show',
      progress: this.props.progress
      // progress: this.props.progress
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    this.getWords()
  }

  getWords = async () => {
    this.state.counter = 0
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch(`http://localhost:3000/folders/${this.props.folderId}`)
        .then(res => {
          this.setState({
            wordsToLearn: res.still_to_know_words,
            progress: res.progress,
            words: res.words
          })
          if (res.still_to_know_words.length === 0) {
            this.setState({
              wordsToLearn: res.words
            })
          }
          this.setState({
            accurate: this.state.wordsToLearn[this.state.counter]
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

  changeDefHandler = (event) => {
    event.preventDefault()
    this.setState({
      enableCheck: true,
      usersTrans: event.target.value
    })
  }

  unlockDefinitionMode = () => {
    this.setState({
      showDefinition: 'show',
      showEndOfRound: 'do-not-show'
    })
  }

  validateCorrectness = async (event, props) => {
    if ((await this.state.usersTrans) === this.state.accurate.translation) {
      let list = this.state.unknownWordA
      let id = this.state.accurate._id
      let index = list.findIndex(x => x._id === id)
      index === 0 ? list.shift() : list.splice(index, index)
      await this.setState({
        unknownWordA: list,
        showCorrect: 'show',
        showDefinition: 'do-not-show',
        progress: this.state.progress + (100 / this.state.wordsToLearn.length)
      })
      alert(this.state.wordsToLearn.length)
      alert(this.state.words.length)
      alert(Math.floor(100 / 3))
    } else {
      this.setState({
        showIncorrect: 'show',
        showDefinition: 'do-not-show',
        unknownWord: this.state.accurate
      })
      if (this.state.unknownWordA.includes(this.state.accurate)) {
        return 1
      } else {
        await this.addUnknownWord()
      }
    }
    setTimeout(async () => {
      await this.setState({
        showCorrect: 'do-not-show',
        showDefinition: 'show',
        showIncorrect: 'do-not-show',
        usersTrans: '',
        enableCheck: false
      })
      if (this.state.counter + 1 < this.state.wordsToLearn.length) {
        await this.setState({
          counter: this.state.counter + 1,
          accurate: this.state.wordsToLearn[this.state.counter + 1]
        })
      } else {
        if (!(this.state.unknownWordA.length > 0)) {
          await this.setState({
            showCongrats: 'show',
            showEndOfRound: 'do-not-show',
            showDefinition: 'do-not-show',
            unknownWordA: []
          })
          this.keepOn()
          alert(this.state.wordsToLearn.length)
        } else {
          await this.setState({
            showEndOfRound: 'show',
            showDefinition: 'do-not-show',
            round: this.state.round + 1
          })
        }
      }
    }, 1500)
  }

  addUnknownWord = () => {
    console.log(this.state.unknownWordA)
    let num = this.state.unknownWordA.findIndex(item => {
      return item._id == this.state.accurate._id
    })
    alert('numm')
    alert(num)
    if (num === -1) {
      this.setState(state => {
        const unknownWordA = state.unknownWordA.concat(state.unknownWord)
        return {
          unknownWordA
        }
      })
    }
  }

  // returns new array without item with no such id
  //TODO: should works but not, why?
  //   deleteKnownWord = id => {
  //     alert('delete')
  //     this.setState(state => {
  //       const list = state.unknownWordA.filter(item => item._id !== id)
  //       return {
  //         list
  //       }
  //     })
  //     console.log(this.state.unknownWordA)
  //   }

  keepOn = async () => {
    alert(this.state.unknownWordA)
    if (await this.Auth.loggedIn()) {
      await this.Auth.fetch(
        `http://localhost:3000/folder/to-know-words/${this.props.folderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
          },
          body: JSON.stringify({
            to_know_words: this.state.unknownWordA,
            progress: this.state.progress
          })
        }
      ).then(this.getWords())
      if (this.state.unknownWordA.length > 0) {
        this.unlockDefinitionMode()
      }
    }
  }

  countProgress = () => {
    let accProgress = 100 - (this.state.unknownWordA.length / this.state.words * 100)
    return accProgress
  }

  render () {
    return (
      <div>
      <div className={`writing-card ${this.props.visibility}`}>
        <div
          className={`correct writing-card__correctness ${this.state.showCorrect}`}
        >
          <span
            className='correct writing-card__correctness--icon'
            id='correct'
          >
            &#10004;
          </span>
          super!
        </div>
        <div
          className={`correct writing-card__end-of-round ${this.state.showEndOfRound}`}
        >
          <div>koniec rundy {this.state.round}</div>
          <div>twój wynik: </div>
          <button onClick={this.keepOn}>kontynuuj</button>
        </div>
        <div
          className={`correct writing-card__congrats ${this.state.showCongrats}`}
        >
          <div>
            <div className='writing-card__congrats--main'>
              <span className='writing-card__congrats--main--emoji'>
                &#127942;
              </span>
              <span className='writing-card__congrats--main--title'>
                Udało się!
              </span>
            </div>
            <div className='writing-card__congrats--subtitle'>
              Opanowałeś materiał w {this.state.round} rundach
            </div>
          </div>
        </div>
        <div
          className={`incorrect writing-card__correctness ${this.state.showIncorrect}`}
        >
          <span
            className='correct writing-card__correctness--icon'
            id='incorrect'
          >
            &#10008;
          </span>
          następnym razem!
        </div>
        <div className={`${this.state.showDefinition} definition-container`}>
          <div className={`writing-card--definition`}>
            {this.state.accurate.definition} {this.state.counter}
          </div>
          <input
            className='writing-card__input--field'
            onChange={this.changeDefHandler}
            defaultValue=''
            value={this.state.usersTrans}
          />
          <button
            className='writing-card--button button button-submit orange'
            disabled={!this.state.enableCheck}
            onClick={this.validateCorrectness}
          >
            Sprawdz
          </button>
          <a href='!#' className='writing-card__restart'>
            Zacznij od nowa
          </a>
        </div>
      </div>
          <Progressbar progress={this.state.progress} />
      </div>
    )
  }
}

export default WritingCard
