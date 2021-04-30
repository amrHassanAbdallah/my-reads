import React from 'react'
import PropTypes from 'prop-types'

class ListBook extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType: PropTypes.string,
        updateBookShelf: PropTypes.func,
        searchBooks: PropTypes.func,
        shelfs:PropTypes.array.isRequired,
        shelfsMapping:PropTypes.object.isRequired,
    }

    render() {
        let shelfsMapping = this.props.shelfsMapping
        let shelfs = this.props.shelfs
        const shelfType = this.props.shelfType
        return (
            <ol className="books-grid">
                {this.props.books.filter(book => book.shelf === shelfType||shelfType == null).map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                {book.imageLinks!= null && book.imageLinks.smallThumbnail !== "" &&(
                                    <div className="book-cover" style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                    }}></div>
                                )}

                                <div className="book-shelf-changer">
                                    <select onChange={(e) => this.props.updateBookShelf(book, e.target.value)}
                                            value={book.shelf}>
                                        <option value="move" disabled>Move to...</option>
                                        {shelfs.map((shelf) => (
                                            <option key={shelf} value={shelf}
                                                    disabled={ shelf === book.shelf}>{shelfsMapping[shelf]}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors!= null  &&(
                                <div className="book-authors">{
                                    book.authors.join(", ")
                                }</div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default ListBook
