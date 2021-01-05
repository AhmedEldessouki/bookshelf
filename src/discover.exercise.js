/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'

function DiscoverBooksScreen() {
  const [status, dispatch] = React.useReducer((status, {type}) => {
    switch (type) {
      case 'idle':
        return 'idle'
      case 'loading':
        return 'loading'
      case 'success':
        return 'success'

      default:
        throw new Error(`The Type: ${type} does not Exist.`)
    }
  }, 'idle')

  const [data, setData] = React.useState({})
  const [query, setQuery] = React.useState('')
  const [isQueried, setIsQueried] = React.useState(false)

  console.log(status)
  React.useEffect(() => {
    if (!isQueried) return null
    client(`books?query=${encodeURIComponent(query)}`).then(res => {
      setData(res)
      dispatch({type: 'success'})
    })
  }, [isQueried, query])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  function handleSearchSubmit(event) {
    event.preventDefault()
    dispatch({type: 'loading'})
    setQuery(event.target.elements.search.value)
    setIsQueried(true)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
