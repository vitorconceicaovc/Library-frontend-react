import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks, logOut, verifyToken } from '../API'; 

export function Books() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const tokenValid = await verifyToken();
            if (!tokenValid) {
                logOut(navigate)
            }
        };

        fetchData();
    }, []);

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
                        <Link to={`/book/${book.id}`}>{book.title}</Link> 
                        by Author {book.author.first_name} {book.author.last_name}
                    </li>
                ))}
            </ul>
        </>
    );
}
