const Person = (props) => (
  <div>
    {props.person.name} {props.person.number} <button type="button" onClick={props.deletePerson(props.person)}>delete</button>
  </div>
)

const Persons = (props) => (
  <div>
    {props.persons.map(person => <Person key={person.id} person={person} deletePerson={props.deletePerson} />)}
  </div>
)

export default Persons
