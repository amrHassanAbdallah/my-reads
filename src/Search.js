import React from 'react'
import {Link} from "react-router-dom";
import ListBook from "./ListBook";

class Search extends React.Component {
    updateFromSearchListing = (book,shelf)=>{
        this.props.updateBookShelf(book,shelf)
    }

    render() {
        let books = this.props.searchedBooks
        const shelfs = ["currentlyReading", "wantToRead", "read", "none"]
        const shelfsMapping = {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want to Read",
            "read": "Read",
            "none": "None"
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close
                        </button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.props.query}
                               onChange={(e) => this.props.searchBooks(e.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">

                    <ListBook books={books} shelfs={shelfs} shelfsMapping={shelfsMapping}
                               updateBookShelf={this.updateFromSearchListing}/>
                </div>
            </div>
        )
    }
}

export default Search
