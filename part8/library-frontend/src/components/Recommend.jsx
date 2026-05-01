import { GET_ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client/react"

const Recommend = ({ show, me }) => {
  const result = useQuery(GET_ALL_BOOKS, {
    variables: { genres: me.favoriteGenre },
  })

  if (result.loading) {
    return <div>Cargando...</div>
  }

  const books = [...result.data.allBooks]

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        <p>
          books in your favorite genre <strong>{me.favoriteGenre}</strong>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommend
