// import React, { useState, useEffect } from 'react'

// function Progressbar (props) {

//   return (
//       <div className={`progress-bar`}>
//       <div>{props.progress}</div>
//       </div>
//   )
// }
// export default Progressbar

import React, { Component } from 'react'
import { Button, Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


export default class Progressbar extends Component {
  // state = { percent: this.props.progress }

  // increment = () =>
  //   this.setState((prevState) => ({
  //     percent: prevState.percent >= 100 ? 0 : prevState.percent + 20,
  //   }))

  render() {
    return (
      <div>
        {/* <Progress percent={this.state.percent} indicating /> */}
             <Progress percent={this.props.progress} indicating />
        {/* <Button onClick={this.increment}>Increment</Button> */}
      </div>
    )
  }
}