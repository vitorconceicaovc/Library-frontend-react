import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks, getMyStatus, logOut, verifyToken } from '../API'; 

export function Books() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [userStatus, setUserStatus] = useState({})

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

    const fetchMyStatus = async () => {
        try {
          const myStatusData = await getMyStatus()
          setUserStatus(myStatusData)
        } catch (error) {
          
        }
      }

    const handleRequest = async (bookId) => {
        try {

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            fetchMyStatus()
            // console.log("User data:", userStatus.data)

            const response = await fetch('http://127.0.0.1:8000/catalog/requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ book: bookId }), // Enviar o ID do livro
            });

        } catch (error) {
            console.error('Error requesting book:', error);
        }
    }

    return (
        <>
            <br /><br />
            <h1>Book list</h1><br />
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <Link to={`/book/${book.id}`}>{book.title}</Link> 
                        by Author {book.author.first_name} {book.author.last_name}
                        <button onClick={() => handleRequest(book.id)}>Request</button>
                    </li>
                ))}
            </ul>
        </>
    );
}
