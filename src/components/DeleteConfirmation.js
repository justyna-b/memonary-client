import React from 'react'

class DeleteConfirmation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      close: null,
      hideQuestion: null
    }
  }

  closeConfirmation = () => {
    this.props.closeConfirm()
    this.setState({ close: 'close' })
  }

  deleteConfirmation = () => {
    this.props.deleteConfirm()
    this.setState({ hideQuestion: 'hide' })
  }

  render () {
    return (
      <div className={`popup ${this.state.close}`}>
        <div className='popup__content-reg confirm-delete '>
          <div
            className={`popup__content-reg--close `}
            id='popup-closure'
            onClick={this.closeConfirmation}
          >
            &times;
          </div>
          <div className={`confirm-delete__text`}>
            {this.props.deleteSuccess}
          </div>
          <div className={`confirm-delete__text ${this.state.hideQuestion}`}>
            Napewno chcesz usunąć folder {this.props.title}?
          </div>
          <button
            className={`confirm-delete__button button button-submit ${this.state.hideQuestion}`}
            onClick={this.deleteConfirmation}
          >
            usuń
          </button>
          <div id='user' />
          <div className='popup__content-reg--input'>
            {this.props.eventName !== null ? (
              <div id='info'>{this.state.close}</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteConfirmation
