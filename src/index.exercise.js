// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDom from 'react-dom'
import {Logo} from './components/logo'

function App() {
  const [clicked, setClicked] = React.useState('')
  return (
    <>
      <Logo />
      <button type="button" onClick={() => setClicked('No `-`')}>
        login
      </button>
      <button type="button" onClick={() => setClicked('Get Out Of Here! -_-')}>
        register
      </button>
      <h1 style={{color: 'red'}}>{clicked}</h1>
    </>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
