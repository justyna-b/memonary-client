import React from 'react'

import LanProgress from '../components/LanProgress'
import FolderCard from '../components/FolderCard'
import AuthService from '../logic/AuthService'

class HPMainFlow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      folders: [],
      hide: false
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://localhost:3000/recent')
        .then(res => {
          this.setState({
            folders: res
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
      this.Auth.logout()
      window.location.reload()
      window.location.href = '/logon'
    }
  }

  loadMore = async () => {
    if (await this.Auth.loggedIn()) {
      this.Auth.fetch('http://localhost:3000/folders')
        .then(res => {
          this.setState({
            folders: res,
            hide: true
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
      this.Auth.logout()
      window.location.reload()
      window.location.href = '/logon'
    }
  }

  render () {
    return (
      <div>
        {this.state.hide ? '' : <LanProgress />}
        <div onClick={this.loadMore}  className='expand-folders'>
          Pokaż wszystkie <span className='expand-folders--icon'>&raquo;</span>
        </div>
        <div className='recent-folders-container'>
          {this.state.folders.map(item => (
            <a href={`/${item.folder_name}/${item._id}`} className='folder'>
              <div
                key={item.folder_name}
                className='recent-folders-container--folder'
              >
                <FolderCard
                  title={item.folder_name}
                  len={item.words.length}
                  lan={item.language}
                  progress={item.progress}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default HPMainFlow
