import {useState} from 'react';
import './SearchBar.css';

function SearchBar() {
    const [searchTerms, setSearchTerms] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(searchTerms);
    }

    return (
        <form id="searchbar" onSubmit={handleSubmit}>
            <input 
                class="text-entry"
                type="text" 
                id="searchTerms"
                placeholder="Enter Name Here"
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)} />
            <input type="submit" value="Search" />
        </form>
    );
}

export default SearchBar;