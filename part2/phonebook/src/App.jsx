import { useEffect, useState } from 'react'
import personService from './services/persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setNewSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find((person) => person.name === newName)
    if (personToUpdate) {
      if (
        confirm(
          `${personToUpdate.name} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        personService
          .updatePerson(personToUpdate.id, {
            ...personToUpdate,
            number: newNumber
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            )
            setNotification(`Updated ${personToUpdate.name}`)
          })
      } else {
        return
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${returnedPerson.name}`)
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    if (confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
      personService
        .deletePerson(id)
        .then((deletedPerson) =>
          setPersons(persons.filter((person) => deletedPerson.id !== person.id))
        )
    }
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Search value={search} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameOnChange={handleNameChange}
        numberOnChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} handleDelete={deletePerson} />
    </div>
  )
}

export default App
