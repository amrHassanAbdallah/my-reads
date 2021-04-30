import React from 'react'
import {Link} from "react-router-dom";
import ListBook from "./ListBook";

class Search extends React.Component {
    state = {
        query:'',
        books:[]
    }
    updateQuery = (query)=>{
        this.setState(()=>({
            query:query.trim()
        }))
        this.props.searchBooks(query.trim()).then((books)=>this.setState({books}))
    }
    render() {
        const {query,books} = this.state
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
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e)=> this.updateQuery(e.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ListBook books={books}  shelfs={shelfs} shelfsMapping={shelfsMapping} searchBooks={this.props.searchBooks}/>
                </div>
            </div>
        )
    }
}

export default Search
