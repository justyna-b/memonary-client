import React from 'react'

class Word extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.number
    }
  }

  render () {
    return (
      <div className=' grid-row'>
        <div className='word'>
          <hr className='word__line' />
          <div className='word__input'>
            <div className='grid-row--col-1-of-2 word__input--container'>
              <input
                className='word__input--input'
                placeholder='definicja'
                name='definition'
                id={this.state.id}
                onChange={this.props.onChange}
              />
            </div>
            <div className='grid-row--col-1-of-2 word__input--container'>
              <input
                className='word__input--input'
                placeholder='wartość'
                name='wordValue'
                id={this.state.id}
                onChange={this.props.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Word
