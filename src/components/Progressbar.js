import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class Progressbar extends Component {
  render () {
    return (
      <div>
        <Progress percent={this.props.progress} indicating />
      </div>
    )
  }
}
