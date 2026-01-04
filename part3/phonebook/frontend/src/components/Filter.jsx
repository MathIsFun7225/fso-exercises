const Filter = (props) => (
    <div>filter shown with <input value={props.searchTerm} onChange={props.handleSearchTermChange} /></div>
)

export default Filter
