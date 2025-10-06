import { useEffect, useState } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(false)

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const showNotification = (notification, isError = false) => {
    setIsErrorNotification(isError)
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find((person) => person.name === newName)
    if (personToUpdate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            )
            showNotification(`Number changed for ${returnedPerson.name}`)
          })
          .catch(() => {
            showNotification(
              `Information of ${personToUpdate.name} has already been removed from server`,
              true
            )
            setPersons(
              persons.filter((person) => person.id !== personToUpdate.id)
            )
          })
      } else {
        return
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${returnedPerson.name}`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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
      <Notification message={notification} isError={isErrorNotification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        handleSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={persons} filter={filter} handleDelete={deletePerson} />
    </div>
  )
}

export default App
