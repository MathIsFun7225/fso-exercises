import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    const person = {...newPerson}
    person.name = event.target.value
    setNewPerson(person)
  }

  const handleNumberChange = (event) => {
    const person = {...newPerson}
    person.number = event.target.value
    setNewPerson(person)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(element => (element.name === newPerson.name)) !== undefined) {
      alert(`${newPerson.name} is already added to the phonebook`)
      return
    }

    const newPersons = [...persons]
    newPersons.push(newPerson)
    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
    </div>
  )
}

export default App
