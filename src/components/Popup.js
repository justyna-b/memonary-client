import React, { useState } from 'react'

function Popup (props) {
  const [close, setClose] = useState('Rozpoczynasz moduł nauki. Zaraz zobaczysz swoje słowa, czy znasz ich tłumaczenie? POWODZENIA')

  return (
    <div className={`popup ${close}`}>
      <div className='popup__content-reg '>
        <div
          className={`popup__content-reg--close `}
          id='popup-closure'
          onClick={() => setClose('close')}
        >
          &times;
        </div>
        <div id='user' />
        <div className='popup__content-reg--input'>
        {(props.eventName !== null)? <div id='info'>{close}</div>: ""}
        </div>
      </div>
    </div>
  )
}

export default Popup
