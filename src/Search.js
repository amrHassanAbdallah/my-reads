import React from 'react'
import {Link} from "react-router-dom";
import ListBook from "./ListBook";

class Search extends React.Component {
    state = {
        query: '',
        books: [],
        err:"",
    }
    updateQuery = (query) => {
        this.setState(() => ({
            query: query,
            err:""
        }))
        console.log(query,"inside the update query")
        this.props.searchBooks(query).then((res) => {
            console.log(res)
            if (res.error){
                this.setState(()=>({
                    err:res.error,
                    books:[]
                }))
            }else{
                this.setState({books:res})
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    updateFromSearchListing = (book,shelf)=>{
        let books = this.state.books
        this.props.updateBookShelf(book,shelf,false)
        this.setState({books: books.filter(b=>book.id !== b.id)})
    }

    render() {
        const {query} = this.state
        let books = this.state.books
        if (query === "") {
            books = []
        }
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
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={(e) => this.updateQuery(e.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.err!==""&&(
                        <span>{this.state.err}</span>
                    )}
                    <ListBook books={books} shelfs={shelfs} shelfsMapping={shelfsMapping}
                              searchBooks={this.props.searchBooks} updateBookShelf={this.updateFromSearchListing}/>
                </div>
            </div>
        )
    }
}

export default Search
