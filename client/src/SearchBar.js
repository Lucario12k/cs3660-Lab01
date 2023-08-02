import { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [searchTerms, setSearchTerms] = useState("");
    const [inactiveOnly, setInactiveOnly] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        props.onSearch(searchTerms, inactiveOnly);
    }

    return (
        <form id="searchbar" onSubmit={handleSubmit}>
            <label id="searchbar-label-active" htmlFor="searchbar-input-active">
                Inactive Only:
            </label>
            <input
                type="checkbox"
                id="searchbar-input-active"
                value={inactiveOnly}
                onChange={(e) => setInactiveOnly(e.target.value)} />
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