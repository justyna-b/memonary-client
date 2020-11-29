import '../App.css'
import React, { useState } from 'react'

import TextInput from '../components/TextInput'

function Registration () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Memonary -rejestracja</h1>
        <TextInput placeholder='imię' />
        <TextInput placeholder='nazwisko' />
        <TextInput placeholder='email' />
        <TextInput placeholder='nazwa uzytkownika' />
        <TextInput placeholder='haslo' />
        <TextInput placeholder='powtorz haslo' />
        <button>zarejestruj mnie</button>
      </header>
    </div>
  )
}

export default Registration
