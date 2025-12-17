import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'

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

    const existingPerson = persons.find(element => (element.name === newPerson.name));
    if (existingPerson !== undefined) {
      if (confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newPerson.number })
          .then(updatedPerson => setPersons(persons.map(person => (person.id === existingPerson.id) ? updatedPerson : person)))
          .catch(error => console.log(error))
      }
    } else {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewPerson({ name: '', number: '' })
        })
        .catch(error => console.log(error))
    }
  }

  const deletePerson = (person) => () => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .del(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))} deletePerson={deletePerson} />
    </div>
  )
}

export default App
