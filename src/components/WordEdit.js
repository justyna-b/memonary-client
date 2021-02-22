import React from 'react'

class WordEdit extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   id: this.props.number
    // }
  }

  render () {
    return (

          <div className='word-edit'>
            <div className=''>
              {this.props.definition}
            </div>
            <div className=''>
              {this.props.translation}
            </div>
          </div>
    )
  }
}
export default WordEdit
