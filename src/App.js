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
        books: []
    }
    updateBookShelf = (book, newShelf, updateStateBool) => {
        BooksAPI.update(book, newShelf).then(() => {
            console.log("checking status update",updateStateBool)
            if (updateStateBool !== false){
                this.setState((currentState) => ({
                        books: currentState.books.map((b) => {
                            if (book.id === b.id) {
                                b.shelf = newShelf
                            }
                            return b
                        })

                    }
                ))
            }
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
                return res.map((b) => {
                    if (mapOfBooks[b.id]){
                        b.shelf = mapOfBooks[b.id]
                    }else{
                        b.shelf = "none"
                    }
                    return b
                })
            }
        })
    }
    getBooks = ()=>{
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
                                                                 updateBookShelf={this.updateBookShelf} getBooks={this.getBooks} shelfs={shelfs} shelfsMapping={shelfsMapping}/>}></Route>
                    <Route exact path='/search' component={() => <Search searchBooks={this.search}
                                                                         updateBookShelf={this.updateBookShelf} shelfs={shelfs} shelfsMapping={shelfsMapping} />}></Route>
                </div>

            </Router>
        )
    }
}

export default BooksApp
