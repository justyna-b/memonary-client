import React from 'react'

class ReminderFinished extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div className={`reminder-finished ${this.props.visibility}`}>
          <div className='reminder-finished--text'>ukończono w 100 %</div>
          <div className='reminder-finished--emoji '>&#127894;</div>
          <div>
            <button
              className='reminder-finished--button button button-submit '
              onClick={this.props.onClick}
            >
              {this.props.button}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ReminderFinished
