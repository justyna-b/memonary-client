import React from 'react'

class Word extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.number,
      language: this.props.language,
      keyboard: ''
    }
  }

  addLetter = event => {
    let customInput = document.getElementById(`${this.state.id}-b`)
    customInput.value += event.target.value
  }

  render () {
    return (
      <div className=' grid-row words-inputs'>
        <div className={`${this.props.class} word`}>
          <div className='word__keyboard'>
            {this.props.language.map(letter => (
              <button
                onClick={this.addLetter}
                value={letter}
                className='word__keyboard--button button-small'
              >
                {letter}
              </button>
            ))}
          </div>
          <div className='word__input'>
            <div className='grid-row--col-1-of-2 word__input--container'>
              <input
                className={`word__input--input`}
                placeholder={this.props.defPlaceholder}
                name='definition'
                id={`${this.state.id}-a`}
                onChange={this.props.onChange}
                defaultValue={this.props.defValDef}
              />
            </div>
            <div className='grid-row--col-1-of-2 word__input--container'>
              <input
                className={`word__input--input`}
                placeholder={this.props.transPlaceholder}
                name='wordValue'
                id={`${this.state.id}-b`}
                onChange={this.props.onChange}
                defaultValue={this.props.defValTrans}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Word
