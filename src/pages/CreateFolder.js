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
      lan: [false, false, false]
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
    const wordPair = { num: '', definition: '', translation: '' }
    let wordsCopy = this.state.goalWordsArray

    if (event.target.name === 'definition') {
      wordPair.definition = event.target.value
      wordPair.num = event.target.id
      wordsCopy[event.target.id] = wordPair
    } else if (event.target.name === 'wordValue') {
      let temp = this.state.goalWordsArray.filter(word => {
        if (word.num === event.target.id) {
          word.translation = event.target.value
        }
      })
    }
    this.setState({
      goalWordsArray: wordsCopy,
      enableSubmit: true
    })
  }

  submitHandler = async () => {
    let language = ""
    if(this.state.lan.indexOf(true) === 0) {
      language = "angielski"
    } else if(this.state.lan.indexOf(true) === 1) {
      language = 'niemiecki'
    } else {
      language = 'hiszpański'
    }
    await this.Auth.fetch('http://localhost:3000/folder/create', {
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
      .then(response => response.json())
      .then(this.setState({ enableSubmit: false, showInput: false }))
  }

  render () {
    const words = []
    for (let i = 0; i < this.state.numOfWords; i += 1) {
      words.push(<Word key={i} number={i} onChange={this.onChange} />)
    }

    return (
      <div>
        <body>
          {this.state.auth ? '' : <Redirect to='/logon' />}
          <NavbarHeader />
          <div>Create</div>
          <div className='folder-create__container'>
            <div className='folder-create__container--title'>
              <h1>Utwórz nowy folder</h1>
              <button
                id='save'
                className='orange button-submit'
                onClick={this.submitHandler}
                disabled={!this.state.enableSubmit}
              >
                zapisz
              </button>
              <input
                placeholder='Jaki jest tytuł Twojego folderu?'
                className='word__input--input'
                id='user-title'
                required
                name='users-title'
                onChange={event => {
                  this.setState({ folderTitle: event.target.value })
                }}
              />
              <div id='language'>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='0'
                      color='primary'
                      checked={
                        JSON.stringify(this.state.lan) ===
                        JSON.stringify([true, false, false])
                      }
                      onChange={event => {
                        this.setState({ lan: [true, false, false] })
                      }}
                    />
                  }
                  label='Angielski'
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
                        this.setState({ lan: [false, true, false] })
                      }}
                    />
                  }
                  label='Niemiecki'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name='2'
                      color='primary'
                      checked={
                        JSON.stringify(this.state.lan) ===
                        JSON.stringify([false, false, true])
                      }
                      onChange={event => {
                        this.setState({ lan: [false, false, true] })
                      }}
                    />
                  }
                  label='Hiszpański'
                />
              </div>
            </div>
            <div className='center margin-top'>
              {this.state.showInput ? words : null}
              <button
                className='button button-submit button-reg'
                id='new'
                onClick={this.newWordHandler}
                disabled={!this.state.enableSubmit}
              >
                nowe słówko
              </button>
            </div>
          </div>
        </body>
      </div>
    )
  }
}

export default CreateFolder
