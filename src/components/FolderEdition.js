import React from 'react'
import { Redirect } from 'react-router-dom'

import AuthService from '../logic/AuthService'
import Word from '../components/Word'

class FolderEdition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      words: [],
      auth: true,
      keyboard: [],
      numOfWords: 0,
      addedWords: [],
      editedWords: [],
      enableSubmit: false,
      redirect: null,
      dbId: ''
    }
    this.Auth = new AuthService()
  }

  newWordHandler = () => {
    this.setState({
      numOfWords: this.state.numOfWords + 1
    })
  }

  onChangeEdit = event => {
    let editionModeWords = this.state.editedWords
    if (editionModeWords.length < 1) {
      editionModeWords = this.props.words
    }
    let editedWord = {
      _id: event.target.id.split('-')[0],
      definition: null,
      translation: null
    }
    let word = editionModeWords.find(
      ({ _id }) => _id === event.target.id.split('-')[0]
    )
    if (event.target.id.substr(-1) === 'a') {
      editedWord.definition = event.target.value
      editedWord.translation = word.translation
    } else {
      editedWord.definition = word.definition
      editedWord.translation = event.target.value
    }
    editionModeWords = editionModeWords.filter(
      ({ _id }) => _id !== event.target.id.split('-')[0]
    )
    editionModeWords.push(editedWord)
    this.setState({ editedWords: editionModeWords , enableSubmit: true})
  }

  onChangeAdd = event => {
    event.preventDefault()
    this.setState({ enableSubmit: false })
    let counter
    const wordPair = { num: '', definition: '', translation: '' }
    let wordsCopy = this.state.addedWords
    let pairId = event.target.id.split('-')[0]
    if (event.target.name === 'definition') {
      wordPair.definition = event.target.value
      wordPair.num = pairId
      wordsCopy[pairId] = wordPair
      counter = 1
    } else if (event.target.name === 'wordValue') {
      let temp = this.state.addedWords.filter(word => {
        if (word.num === pairId) {
          word.translation = event.target.value
          counter = 2
          if (word.definition.length > 0) {
            console.log(wordsCopy)
            this.setState({
              addedWords: wordsCopy,
              enableSubmit: true
            })
          }
        }
      })
    }
  }

  onSubmitEdit = async () => {
    if (this.state.editedWords.length < 1) {
      this.setState({ editedWords: this.props.words })
    }
    let goalWords = await this.state.editedWords
    console.log(this.state.editedWords)
    goalWords = goalWords.concat(this.state.addedWords)
    // delete function is not efficient TODO: find a better way of deleting property of object
    goalWords.forEach(function (edited) {
      delete edited._id
      delete edited.num
    })
    await this.Auth.fetch(
      `http://localhost:3000/folder/edit/${this.props.folder_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
        body: JSON.stringify({
          words: goalWords
        })
      }
    )
      .then(res => this.setState({ dbId: res._id }))
      .then(this.setState({ enableSubmit: false }))
      .then(
        setTimeout(
          () =>
            this.setState({
              //TODO: which one is better? how to do it reactive?
              // redirect: `/${this.props.folderTitle}/${this.state.dbId}`
              redirect: `/tablica`
            }),
          1500
        )
      )
  }

  render () {
    const words = []
    for (let i = 0; i < this.state.numOfWords; i += 1) {
      words.push(
        <Word
          key={i}
          number={i}
          onChange={this.onChangeAdd}
          defPlaceholder='pojęcie do nauki'
          transPlaceholder='tłumaczenie'
          language={this.props.keyboard}
          key={i}
          className='edition-mode'
        />
      )
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className='edition-mode__container' id='edition-mode'>
        <a
          href={`/${this.props.folderTitle}/${this.props.folder_id}`}
          className='center  blue-text return'
        >
          anuluj
        </a>
        <div id='inputs-container'>
          {this.props.words.map(word => (
            <Word
              key={word._id}
              number={word._id}
              language={this.props.keyboard}
              key={word._id}
              className='edition-mode'
              defPlaceholder={word.definition}
              transPlaceholder={word.translation}
              defValTrans={word.translation}
              defValDef={word.definition}
              onChange={this.onChangeEdit}
            />
          ))}
          {words}
        </div>
        <div className='center'>
          <button
            className='button button-submit button-reg'
            id='new'
            onClick={this.newWordHandler}
            disabled={!this.state.enableSubmit}
          >
            nowe słówko
          </button>
        </div>
        <div className='center'>
          <button
            className='orange button-submit'
            id='bottom-save'
            onClick={this.onSubmitEdit}
            disabled={!this.state.enableSubmit}
          >
            zapisz
          </button>
        </div>
      </div>
    )
  }
}

export default FolderEdition
