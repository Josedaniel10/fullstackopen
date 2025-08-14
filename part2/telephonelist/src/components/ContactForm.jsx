const ContactForm = ({ handleSubmit, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <>
      <h3>Add contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input
            value={newName}
            onChange={(ev) => setNewName(ev.target.value)}
          />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(ev) => setNewNumber(ev.target.value)}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  )
}

export default ContactForm