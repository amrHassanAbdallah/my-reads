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
        query: {value:"",last_modified_date:null},
        err:""
    }
    updateBookShelf = (book, newShelf, updateStateBool) => {
        BooksAPI.update(book, newShelf).then(() => {
            let updatedHomeBooks = this.state.books.filter(b => b.id !== book.id)
            book.shelf = newShelf
            updatedHomeBooks.push(book)
            this.setState((currentState) => ({
                    books: updatedHomeBooks,
                    searchedBooks: currentState.searchedBooks.map((b) => {
                        if (b.id === book.id){
                            b.shelf = newShelf
                        }
                        return b

                    }),

                }
            ))

        }).catch((err) => {
            console.log(err)
            this.setState({err})
        })

    }
    search = (query) => {
        let timeNow = new Date()
        this.setState({query:{value:query.value,last_modified_date:timeNow}})
        if (query.value === ""){
            this.setState({err:"",searchedBooks:[]})
            return
        }
        return BooksAPI.search(query.value).then((res) => {
            console.log("got response", res)
            if (res === undefined || res.error) {
                console.log("inside the error handler")
                this.setState({err: "no data found!",searchedBooks:[]})
                return res
            }
            if (res.length > 0) {
                console.log("here",res.length)
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
                    err:"",
                })
                return res
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
                    <Route exact path='/'
                           render={() =>
                               <Home books={this.state.books}
                                     updateBookShelf={this.updateBookShelf} shelfs={shelfs}
                                     shelfsMapping={shelfsMapping}/>}>
                    </Route>
                    <Route exact path='/search'
                           render={() =>
                               <Search searchBooks={this.search}
                                       updateBookShelf={this.updateBookShelf}
                                       shelfs={shelfs} shelfsMapping={shelfsMapping}
                                       searchResult={this.state.searchedBooks}
                                       query={this.state.query}
                                       err={this.state.err}
                               />}>
                    </Route>
                </div>

            </Router>
        )
    }
}

export default BooksApp
