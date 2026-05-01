import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import { GET_ALL_BOOKS, ME, BOOK_ADDED } from "./queries"
import { useQuery, useSubscription } from "@apollo/client/react"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token") || null,
  )
  let result = useQuery(GET_ALL_BOOKS)
  const resultMe = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      if (data?.data?.bookAdded) {
        window.alert(`Nuevo libro agregado: ${data.data.bookAdded.title}`)
        result.refetch()
      }
    },
  })

  if (result.loading || resultMe.loading) {
    return <div>Cargando...</div>
  }

  const allBooks = result.data.allBooks

  const getGenres = () => {
    if (!allBooks) return []
    const genres = new Set()
    allBooks.forEach((book) => {
      book.genres.forEach((genre) => genres.add(genre))
    })

    return Array.from(genres)
  }
  const allGenres = getGenres()

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("recommend")}>recommend</button>
        ) : null}
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} allGenres={allGenres} />
      <NewBook show={page === "add"} allGenres={allGenres} />
      <Recommend show={page === "recommend"} me={resultMe.data.me} />
      <LoginForm
        show={page === "login"}
        setPage={setPage}
        token={token}
        setToken={setToken}
      />
    </div>
  )
}

export default App
