import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from '../API'; 

export function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooks();
                setBooks(booksData.data);
                console.log('Data:', booksData); 
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <br /><br />
            <h1>Book list</h1><br />
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <Link to={book.book.url}>{book.book.title}</Link> by Author 
                        {book.book.author}
                    </li>
                ))}
            </ul>
        </>
    );
}
