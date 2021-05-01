import React from 'react'
import ListBooks from "./ListBook";
import {Link} from "react-router-dom";
class Home extends React.Component {

    render() {
        const shelfs = this.props.shelfs
        const shelfsMapping = this.props.shelfsMapping
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelfs.filter(shelf => shelf !== "none").map((shelf) => (
                            <div key={shelf} className="bookshelf">
                                <h2 className="bookshelf-title">{shelfsMapping[shelf]}</h2>
                                <div className="bookshelf-books">
                                    <ListBooks books={this.props.books} updateBookShelf={this.props.updateBookShelf} shelfType={shelf}  shelfs={shelfs} shelfsMapping={shelfsMapping}/>
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
