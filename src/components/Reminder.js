import React from 'react'

class Reminder extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div className={`reminder-container ${this.props.visibility}`}>
          {/* <div> &#10071;</div> */}
          <div>
            <span className={`reminder-container--emoji`}>&#10071;</span>
            <span className={`reminder-container--title`}>
              {this.props.title}
            </span>
          </div>
          <div className={`reminder-container--content`}>{this.props.content}</div>
          <div className={`reminder-container--greets`}>{this.props.greets}</div>
          <div>
            <button
              className='reminder-container--button button button-reg'
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

export default Reminder
