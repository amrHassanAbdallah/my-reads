import React from 'react'
import PropTypes from 'prop-types'

class ListBook extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType: PropTypes.string,
        updateBookShelf: PropTypes.func,
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
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e) => this.props.updateBookShelf(book, e.target.value)}
                                            value={shelfType}>
                                        <option value="move" disabled>Move to...</option>
                                        {shelfs.filter((shelf) => shelf !== "none").map((shelf) => (
                                            <option key={shelf} value={shelf}
                                                    disabled={shelf == shelfType}>{shelfsMapping[shelf]}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{
                                book.authors.join(",")
                            }</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default ListBook
