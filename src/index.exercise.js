// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDom from 'react-dom'
import {Logo} from './components/logo'

import '@reach/dialog/styles.css'
import Dialog from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'

function App() {
  const [show, setShow] = React.useState('none')

  const open = value => setShow(value)
  const close = () => setShow('none')
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Logo height="100" width="100" />
      <h1>Bookshelf</h1>
      <div>
        <button type="button" onClick={() => open('login')}>
          login
        </button>
        <button type="button" onClick={() => open('registration')}>
          register
        </button>
      </div>
      <Dialog
        isOpen={show !== 'none'}
        onDismiss={close}
        aria-label="login or registration Form"
      >
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <h1>{show}</h1>
        <form
          style={{display: 'flex'}}
          onSubmit={e => {
            e.preventDefault()
            console.log(
              e.currentTarget.username.value,
              e.currentTarget.password.value,
            )
          }}
        >
          <input type="text" name="username" placeholder="Enter Username" />
          <input name="password" type="password" placeholder="Enter Password" />
          <button type="submit">Submit</button>
        </form>
      </Dialog>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
