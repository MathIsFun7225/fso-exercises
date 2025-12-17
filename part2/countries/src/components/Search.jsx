const Search = ({ query, handleQueryChange }) => (
    <div>
        find countries <input value={query} onChange={handleQueryChange} />
    </div>
)

export default Search
