import { useState } from 'react'

const Persons = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456 '}]) 
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

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
      <form onSubmit={addPerson}>
        <div> name: <input value={newPerson.name} onChange={handleNameChange} /> </div>
        <div> number: <input value={newPerson.number} onChange={handleNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <Persons persons={persons} />
    </div>
  )
}

export default App
