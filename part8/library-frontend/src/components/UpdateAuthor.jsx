import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { UPDATE_AUTHOR, GET_ALL_AUTHORS } from "../queries"
import Select from "react-select"

const UpdateAuthor = () => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState("")

  const result = useQuery(GET_ALL_AUTHORS)

  const options = result.data.allAuthors.map(a => {
    return { value: a.name, label: a.name }
  })

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
  })

  const submit = (ev) => {
    ev.preventDefault()

    updateAuthor({ variables: { name: name.value, born: Number(born) } })

    setName(null)
    setBorn("")
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
