import React from 'react'

class FolderCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render () {
    return (
      <div>
        <div className='folder-card-container'>
          <div className='folder-card-container__title'>{this.props.title}</div>
          <hr className='horizontal-line-thick' />
          <div className='folder-card-container--lan'>{this.props.lan}</div>
          <div className='folder-card-container--words'>
            Liczba pojęć: {this.props.len}
          </div>
        </div>
      </div>
    )
  }
}

export default FolderCard
