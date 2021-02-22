import React from 'react'

class LanProgress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render () {
    return (
      <div>
        <div className='lan-progress-container'>
          <div className='lan-progress-container__title'>twoje języki</div>
          <hr className='horizontal-line-thick'/>
          <div className='lan-progress-container__row'>
          <div className='lan-progress-container__row--col'>druga</div>
          <div className='lan-progress-container__row--col'>druga</div>
          <div className='lan-progress-container__row--col'>druga</div>
          </div>
        </div>
      </div>
    )
  }
}

export default LanProgress
