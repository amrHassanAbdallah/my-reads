import React from 'react';

// import * as BooksAPI from './BooksAPI'
import './App.css'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Search from "./Search";
import Home from "./Home";
import * as BooksAPI from "./BooksAPI";


class BooksApp extends React.Component {
    state = {
        books: [],
        searchedBooks: [],
        query: ''
    }
    updateBookShelf = (book, newShelf, updateStateBool) => {
        BooksAPI.update(book, newShelf).then(() => {
            let isFound = false
            let updatedHomeBooks = this.state.books.filter(b=>b.id!==book.id)
            book.shelf= newShelf
            updatedHomeBooks.push(book)
            this.setState((currentState) => ({
                    books:updatedHomeBooks,
                    searchedBooks: currentState.searchedBooks.filter(b=>b.id!==book.id),

                }
            ))

        }).catch((err) => {
            console.log(err)
            this.setState({err})
        })

    }
    search = (query) => {
        return BooksAPI.search(query).then((res) => {
            if (res.error ){
                return {err :res.error}
            }
            if (res.length > 0) {
                let mapOfBooks = {}
                for (let i = 0; i < this.state.books.length; i++) {
                    mapOfBooks[this.state.books[i].id] = this.state.books[i].shelf
                }
                this.setState({
                    searchedBooks: res.map((b) => {
                        if (mapOfBooks[b.id]) {
                            b.shelf = mapOfBooks[b.id]
                        } else {
                            b.shelf = "none"
                        }
                        return b
                    }),
                    query
                })
            }
        })
    }
    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({books})).catch(err => {
            console.log(err)
            this.setState({err})
        })
    }



    render() {
        const shelfs = ["currentlyReading", "wantToRead", "read", "none"]
        const shelfsMapping = {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want to Read",
            "read": "Read",
            "none": "None"
        }
        return (
            <Router>
                <div className="app">

                    <Route exact path='/' component={() => <Home books={this.state.books}
                                                                 updateBookShelf={this.updateBookShelf} shelfs={shelfs} shelfsMapping={shelfsMapping}/>}></Route>
                    <Route exact path='/search' component={() => <Search searchBooks={this.search}
                                                                         updateBookShelf={this.updateBookShelf} shelfs={shelfs} shelfsMapping={shelfsMapping} searchResult={this.state.searchedBooks}  query={this.state.query} />}></Route>
                </div>

            </Router>
        )
    }
}

export default BooksApp
