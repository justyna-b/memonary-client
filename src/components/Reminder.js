import React from 'react'

import Popup from './Popup'

class Reminder extends React.Component {
  constructor (props) {
     super(props)
    this.state = {
      explication : false
     }
  }

  onClickHandler = () => {
    this.setState({
      explication: true
    })
  }

  render () {

    return (
      <div>
        <div className={`reminder-container ${this.props.visibility}`}>
          <div>
            <span className={`reminder-container--title`}>
              {this.props.title}
            </span>
          </div>
          <div className={`reminder-container--content`}>
            {this.props.content}
          </div>
          <div className={`reminder-container--greets`}>
            {this.props.greets}
          </div>
          <div>
            <button
              className='reminder-container--button button button-submit '
              onClick={this.props.onClick}
            >
              {this.props.button}
            </button>
          </div>
          <div id='explication' onClick={this.onClickHandler}>{this.props.explication}</div>
          {this.state.explication ? <Popup className='sth'/> : ''}
        </div>
      </div>
    )
  }
}

export default Reminder
