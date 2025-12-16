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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searched, setSearched] = useState('')

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

  const handleSearchedChange = (event) => {
    setSearched(event.target.value)
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
      <div>filter shown with <input value={searched} onChange={handleSearchedChange} /></div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newPerson.name} onChange={handleNameChange} /> </div>
        <div> number: <input value={newPerson.number} onChange={handleNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(searched.toLowerCase()))} />
    </div>
  )
}

export default App
