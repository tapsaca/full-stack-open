import { useEffect, useState } from 'react'
import personService from './services/persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setNewSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    personService
      .createPerson(newPerson)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App
