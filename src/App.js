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
        books:[]
    }
    updateBookShelf = (book, newShelf) => {
        BooksAPI.update(book,newShelf).then(()=>{
            this.setState((currentState) => ({
                    books: currentState.books.map((b) => {
                        console.log(newShelf, currentState);
                        if (book.id === b.id) {
                            b.shelf = newShelf
                        }
                        return b
                    })

                }
            ))
        }).catch((err)=>{
            console.log(err)
            this.setState({err})
        })

    }

    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({books})).catch(err => {
            console.log(err)
            this.setState({err})
        })
    }

    render() {
        return (
            <Router>
                <div className="app">

                    <Route exact path='/' component={() => <Home books={this.state.books}
                                                                 updateBookShelf={this.updateBookShelf}/>}></Route>
                    <Route exact path='/search' component={() => <Search books={this.state.books}/>}></Route>
                </div>

            </Router>
        )
    }
}

export default BooksApp
