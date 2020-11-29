import '../App.css'
import React from 'react'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const counter = new Subject()

class Polygon extends React.Component {
  componentDidMount () {
    counter.subscribe(val =>
      ajax('http://localhost:3000/get-all').subscribe(ajaxResponse => {
        let users = ajaxResponse.response
        console.log(users)
        console.log(users.length)
        let usersDiv = document.getElementById('out')
        {users.map((elem, idx) => (usersDiv.innerHTML += elem.name + '</br>'))}
      })
    )
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Memonary -polygon</h1>
          <div>
            <button id='showButton' onClick={() => counter.next()}>
              show
            </button>
          </div>
          <div id='out' />
        </header>
      </div>
    )
  }
}

export default Polygon
