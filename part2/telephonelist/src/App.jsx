import { useState, useEffect } from "react";
import personService from './services/persons.js';
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredValue, setFilteredValue] = useState('');
  const [ntfMessage, setNtfMessage] = useState(null);
  const [ntfSuccess, setNtfSuccess] = useState(true);

  useEffect(()=> {
    personService
      .getAllPersons()
      .then(res => setContacts(res))
      .catch(err => console.error(err))
  }, [])

  let contactsToShow = filteredValue === ''
    ? contacts
    : contacts.filter(c => c.name.toLowerCase().includes(filteredValue.toLowerCase().trim()));

  function handleAddContact(ev) {
    ev.preventDefault();

    const changeContact = {
      name: newName,
      number: newNumber,
      // id: contacts.length + 1,
    };

    if(changeContact.name === '' || changeContact.number === '') {
      setNtfSuccess(false);
      setNtfMessage('All fields are required');
      setTimeout(()=> setNtfMessage(null), 2000)
      return;
    }

    const existingContact = contacts.find((c) => c.name === changeContact.name);

    if (existingContact) {
      const confirmReplacement = window.confirm(`${existingContact.name} already exists in your contact list, do you want to replace him?`);

      if(confirmReplacement) {
        const contact = {...changeContact, id: existingContact.id};
        return replaceContact(contact)
      }
    }

    personService
      .postPerson(changeContact)
      .then(res => {
        console.log(res)
        setContacts([...contacts, res]);
        setNewName('');
        setNewNumber('');
        setNtfMessage(
          `${res.name} was added`
        )
        setNtfSuccess(true);
        setTimeout(()=> setNtfMessage(null), 2000)
      })
      .catch(err => console.error(err))
  }

  function handleDeleteContact(id) {
    const confirmDeletion = window.confirm('Are you sure you want to delete this contact?');

    if(confirmDeletion) {
      let getContants = [...contacts];
      let changeContacts = getContants.filter(c => c.id !== id);
      personService
        .deletePerson(id)
        .then(()=> {
          setContacts(changeContacts);
          setNtfSuccess(true);
          setNtfMessage('Contact deleted');
          setTimeout(()=> setNtfMessage(null), 2000)
        })
        .catch(err => console.error(err))
    }
  }

  function replaceContact(changeContact) {
    const { id } = changeContact;
    personService
      .updatePerson(id, changeContact)
      .then(res => {
        setContacts(contacts.map(contact => contact.id !== id ? contact : res));
        setNewName('');
        setNewNumber('');
        setNtfSuccess(true);
        setNtfMessage(
          `${res.name} was updated`
        );
        setTimeout(()=> setNtfMessage(null), 2000)
      })
      .catch(err => {
        setNtfSuccess(false);
        setNtfMessage(
          `The contact "${changeContact.name}" was removed from the server`
        )
        setTimeout(()=> setNtfMessage(null), 2000)
      })
  }

  return (
    <>
      <h2>Contacts</h2>
      <Notification message={ntfMessage} success={ntfSuccess}/>
      <Filter value={filteredValue} onChange={ev => setFilteredValue(ev.target.value)}/>
      <ContactForm 
        handleSubmit={handleAddContact}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <ContactList contacts={contactsToShow} handleDelete={handleDeleteContact}/>
    </>
  );
};

export default App;
