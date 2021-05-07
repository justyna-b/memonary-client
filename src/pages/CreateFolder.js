import React from 'react'
import { Redirect } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import AuthService from '../logic/AuthService'
import NavbarHeader from '../layout/NavbarHeader'
import Word from '../components/Word'

class CreateFolder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      numOfWords: 3,
      goalWordsArray: [],
      folderTitle: '',
      enableSubmit: false,
      showInput: true,
      lan: [false, false, false],
      language: '',
      keyboard: [],
      redirect: null,
      dbId: null
    }
    this.Auth = new AuthService()
  }

  newWordHandler = () => {
    this.setState({
      numOfWords: this.state.numOfWords + 1
    })
  }

  //create object of pair of words (definition, translation and index)
  //if input is attached to definition save it to copy of goal array
  //if input contains translation look in array for index and save translation to appropriate definition
  //save copy of array to goal array
  onChange = event => {
    event.preventDefault()
    this.setState({ enableSubmit: false })
    let counter
    let emptyInfo = document.getElementById('emptyInfo')
    const wordPair = { num: '', definition: '', translation: '' }
    let wordsCopy = this.state.goalWordsArray
    let pairId = event.target.id.split('-')[0]
    if (event.target.name === 'definition') {
      if (this.state.folderTitle.length < 1 && emptyInfo.innerHTML != null) {
        emptyInfo.innerHTML = 'Tytuł folderu jest wymagany'
      }
      wordPair.definition = event.target.value
      wordPair.num = pairId
      wordsCopy[pairId] = wordPair
      counter = 1
    } else if (event.target.name === 'wordValue') {
      let temp = this.state.goalWordsArray.filter(word => {
        if (this.state.folderTitle.length < 1 && emptyInfo.innerHTML != null) {
          emptyInfo.innerHTML = 'Tytul folderu jest wymagany'
        }
        if (word.num === pairId) {
          word.translation = event.target.value
          counter = 2
          if (this.state.folderTitle.length > 0 && word.definition.length > 0) {
            this.setState({
              goalWordsArray: wordsCopy,
              enableSubmit: true
            })
          }
        }
      })
    }
  }

  submitHandler = async () => {
    let language = ''
    if (this.state.lan.indexOf(true) === 0) {
      language = 'angielski'
    } else if (this.state.lan.indexOf(true) === 1) {
      language = 'niemiecki'
    } else if (this.state.lan.indexOf(true) === 2) {
      language = 'hiszpański'
    } else {
      language = 'polski'
    }
    this.setState({ language: language })
    await this.Auth.fetch(`https://memonary-server-service.herokuapp.com/folder/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      },
      body: JSON.stringify({
        folder_name: this.state.folderTitle,
        words: this.state.goalWordsArray,
        language: language
      })
    })
      .then(res => this.setState({ dbId: res.folder._id }))
      .then(this.setState({ enableSubmit: false, showInput: false }))
      .then(
        setTimeout(
          () =>
            this.setState({
              redirect: `/${this.state.folderTitle}/${this.state.dbId}`
            }),
          2000
        )
      )
  }

  changeTitleHandler = event => {
    event.preventDefault()
    let emptyInfo = document.getElementById('emptyInfo')
    if (emptyInfo.innerHTML != null) {
      emptyInfo.innerHTML = ''
      if (this.state.goalWordsArray.length != 0) {
        this.setState({ enableSubmit: true })
      }
    }
    this.setState({ folderTitle: event.target.value })
  }

  render () {
    const words = []
    for (let i = 0; i < this.state.numOfWords; i += 1) {
      words.push(
        <Word
          key={i}
          number={i}
          onChange={this.onChange}
          defPlaceholder='pojęcie do nauki'
          transPlaceholder='tłumaczenie'
          language={this.state.keyboard}
        />
      )
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div>
        <body>
          {this.state.auth ? '' : <Redirect to='/logon' />}
          <NavbarHeader />
          <div>Create</div>
          <div className='folder-create__container'>
            <div className='folder-create__container--title'>
              <h1 className='folder-create__container--title--main'>
                Utwórz nowy folder
              </h1>
              <div id='language'>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='0'
                      className='language-checkbox'
                      color='primary'
                      checked={
                        JSON.stringify(this.state.lan) ===
                        JSON.stringify([true, false, false])
                      }
                      onChange={event => {
                        this.setState({
                          lan: [true, false, false],
                          language: 0,
                          keyboard: ['é','è','â','î','ô','ñ','ü','ï','ç']
                        })
                      }}
                    />
                  }
                  label={`🇬🇧 Angielski`}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name='1'
                      color='primary'
                      checked={
                        JSON.stringify(this.state.lan) ===
                        JSON.stringify([false, true, false])
                      }
                      onChange={event => {
                        this.setState({
                          lan: [false, true, false],
                          language: 1,
                          keyboard: ['Ä', 'ä', 'Ö', 'ö', 'Ü', 'ü', 'ß', 'ẞ']
                        })
                      }}
                    />
                  }
                  label='🇩🇪 Niemiecki'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name='2'
                      color='red'
                      checked={
                        JSON.stringify(this.state.lan) ===
                        JSON.stringify([false, false, true])
                      }
                      onChange={event => {
                        this.setState({
                          lan: [false, false, true],
                          keyboard: ['Ñ', 'ñ']
                        })
                      }}
                    />
                  }
                  label='🇪🇸 Hiszpański'
                />
              </div>
              <div>
                <div id='cancel'>
                  <a href='/tablica' className='blue-text'>anuluj</a>
                </div>
                <button
                  id='save'
                  className='orange button-submit'
                  onClick={this.submitHandler}
                  disabled={!this.state.enableSubmit}
                >
                  zapisz
                </button>
              </div>
              <input
                placeholder='Podaj tytuł Twojego folderu'
                className='word__input--input'
                id='user-title'
                required
                name='users-title'
                onChange={this.changeTitleHandler}
              />
            </div>
            <div id='emptyInfo' />
            <div className=' margin-top' id='words-inputs'>
             <div className='center ' >
              {this.state.showInput ? words : null}
              <button
                className='button button-submit button-reg'
                id='new'
                onClick={this.newWordHandler}
                disabled={!this.state.enableSubmit}
              >
                nowe słówko
              </button>
              <div>
                <button
                  className='orange button-submit'
                  id='bottom-save'
                  onClick={this.submitHandler}
                  disabled={!this.state.enableSubmit}
                >
                  zapisz
                </button>
              </div>
            </div>
          </div>
          </div>
        </body>
      </div>
    )
  }
}

export default CreateFolder
