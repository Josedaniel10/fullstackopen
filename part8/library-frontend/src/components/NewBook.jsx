import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS } from "../queries"

const NewBook = ({ show, allGenres }) => {
  const keysGenres = allGenres.map(genre => {
    return { query: GET_ALL_BOOKS, variables: { genres: genre }}
  })

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: GET_ALL_BOOKS },
      { query: GET_ALL_AUTHORS },
      { query: GET_ALL_BOOKS, variables: { genres: null } },
      ...keysGenres
    ],
  })

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: Number(published), genres },
    })

    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
