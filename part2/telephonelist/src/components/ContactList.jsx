const Contact = ({ contact, onClick }) => {
  return (
    <li>
      {contact.name} - {contact.number}
      <button onClick={()=> onClick(contact.id)}>Eliminar</button>
    </li>
  );
};

const ContactList = ({ contacts, handleDelete})=> {
  return (
    <>
      <h3>List contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} onClick={handleDelete}/>
        ))}
      </ul>
    </>
  )
}

export default ContactList;