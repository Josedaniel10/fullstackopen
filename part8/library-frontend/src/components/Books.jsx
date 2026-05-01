import { useQuery } from "@apollo/client/react"
import { GET_ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = ({ show, allGenres }) => {
  const [filterGenre, setFilterGenre] = useState(null)
  const result = useQuery(GET_ALL_BOOKS, { variables: { genres: filterGenre } })

  if (result.loading) {
    return <div>Cargando...</div>
  }
  const booksByGenre = [...result.data.allBooks]
  
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        <button
          style={{ background: `${filterGenre === null ? "#90EE90" : ""}` }}
          onClick={() => setFilterGenre(null)}
        >
          all
        </button>
        {allGenres.map((genre) => (
          <button
            style={{ background: `${filterGenre === genre ? "#90EE90" : ""}` }}
            key={genre}
            onClick={() => setFilterGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
