import React from 'react'
import {Link} from "react-router-dom";
import ListBook from "./ListBook";


const DEBOUNCE_TIME = 500

class Search extends React.Component {
    state = {
        query: "",
    }
    debounceTimer = null;

    onChangeHandler = (event) => {
        // Clear the last registered timer for the function
        clearTimeout(this.debounceTimer);
        this.setState({
            query: event.target.value
        })
        // Set a new timer
        this.debounceTimer = setTimeout(
            // Bind the callback function to pass the current input value as arg
            this.search.bind(null, event.target.value),
            DEBOUNCE_TIME
        )
    }
    search = (query) => {
        this.props.searchBooks(query)

    }
    updateFromSearchListing = (book, shelf) => {
        this.props.updateBookShelf(book, shelf, false)
    }

    render() {
        let query = this.state.query ? this.state.query : this.props.query
        let books = this.props.searchResult;
        const shelfs = this.props.shelfs
        const shelfsMapping = this.props.shelfsMapping

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close
                        </button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                               onChange={this.onChangeHandler}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.err !== "" && (
                        <span>{this.props.err}</span>
                    )}
                    <ListBook books={books} shelfs={shelfs} shelfsMapping={shelfsMapping}
                              searchBooks={this.props.searchBooks} updateBookShelf={this.updateFromSearchListing}/>
                </div>
            </div>
        )
    }
}

export default Search
