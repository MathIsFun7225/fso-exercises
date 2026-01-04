const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div> name: <input value={props.newPerson.name} onChange={props.handleNameChange} /> </div>
    <div> number: <input value={props.newPerson.number} onChange={props.handleNumberChange} /> </div>
    <div> <button type="submit">add</button> </div>
  </form>
)

export default PersonForm
