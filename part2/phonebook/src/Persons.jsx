const Person = (props) => (
  <div>{props.person.name} {props.person.number}</div>
)

const Persons = (props) => (
  <div>
    {props.persons.map(person => <Person key={person.name} person={person} />)}
  </div>
)

export default Persons
