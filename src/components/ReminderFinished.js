import React from 'react'

class ReminderFinished extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div className={`reminder-finished ${this.props.visibility}`}>
          <div className='writing-card__congrats--main'>
            <span className='writing-card__congrats--main--emoji'>
              &#127941;
            </span>
            <span className='writing-card__congrats--main--title'>
              Ukończono
            </span>
          </div>
          <div className='writing-card__congrats--subtitle'>
            Napewno chcesz zresetować swój wynik?
          </div>
          <div>
            <button
              className='reminder-finished--button button button-reg '
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
