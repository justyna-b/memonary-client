import '../App.css'
import React, { useState } from 'react'

import TextInput from '../components/TextInput'

function Logon () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Memonary -productive learn words</h1>
        <TextInput placeholder='email' />
        <TextInput placeholder='hasło' />
        <a className='App-link' href='/register'>
          Zarejestruj się
        </a>
      </header>
    </div>
  )
}

export default Logon
