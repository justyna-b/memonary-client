import React from 'react'

import Progressbar from './Progressbar'

function Language (props) {
  let accProg
  if (props.progress >= 100) {
    accProg = Math.floor(props.progress)
  } else {
    accProg = Math.round(props.progress)
  }
  return (
    <div className='language'>
      <div className='language__content'>{props.language}</div>
      <Progressbar progress={props.progress} />
      <div className='language__progress-num'>{accProg} %</div>
    </div>
  )
}

export default Language
