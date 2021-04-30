import React, {Component} from 'react'
import ListBooks from "./ListBook";
import {Link} from "react-router-dom";
import ListBook from "./ListBook";
class Home extends React.Component {

    render() {
        const shelfs = ["currentlyReading", "wantToRead", "read", "none"]
        const shelfsMapping = {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want to Read",
            "read": "Read",
            "None": "none"
        }
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelfs.filter(shelf => shelf != "none").map((shelf) => (
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">{shelfsMapping[shelf]}</h2>
                                <div className="bookshelf-books">
                                    <ListBooks shelfType={shelf}  shelfs={shelfs} shelfsMapping={shelfsMapping}/>
                                </div>
                            </div>


                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>

                </div>
            </div>
        )
    }

}

export default Home
