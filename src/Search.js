import React from 'react'
import {Link} from "react-router-dom";
import ListBook from "./ListBook";

class Search extends React.Component {
    state = {
        query:''
    }
    updateQuery = (query)=>{
        this.setState(()=>({
            query:query.trim()
        }))
    }
    render() {
        const {query} = this.state
        const {books} = this.props
        const showingBooks = query === ""?[]:books.filter((b)=>{
            console.log(b.title.toLowerCase().includes(query.toLowerCase())|| b.authors[0].toLowerCase().includes(query.toLowerCase()))
            return b.title.toLowerCase().includes(query.toLowerCase())|| b.authors[0].toLowerCase().includes(query.toLowerCase())
        });
        console.info(showingBooks)
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
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e)=> this.updateQuery(e.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ListBook books={showingBooks}  shelfs={shelfs} shelfsMapping={shelfsMapping}/>
                </div>
            </div>
        )
    }
}

export default Search
