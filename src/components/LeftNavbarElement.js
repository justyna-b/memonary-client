import React from 'react'

class LeftNavbarElement extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='nav-element'>
        <a
          href={`/${this.props.item}/${this.props.folderId}`}
          className='nav-element--link'
        >
          {this.props.item}
        </a>
      </div>
    )
  }
}
export default LeftNavbarElement
