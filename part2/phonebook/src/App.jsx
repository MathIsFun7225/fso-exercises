import { useState } from 'react'

const Numbers = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const newPersons = [...persons]
    newPersons.push({ name: newName })
    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
