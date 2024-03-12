import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthorById, getBookById, getBooks } from "../API";

export function AuthorDetail() {

    const [books, setBooks] = useState([]);
    const [author, setAuthor] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const authorData = await getAuthorById(id);
                setAuthor(authorData);
                console.log('Author Details:', authorData); 
            } catch (error) {
                console.error('Error fetching author details:', error);
            }
        };

        fetchAuthor();
    }, [id]);

    useEffect(() => {
        const fetchBooksByAuthor = async () => {
            try {
                const booksData = await getBooks();
                setBooks(booksData.data);
                console.log('Books:', booksData); 
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooksByAuthor();
    }, []);

    const filteredBooksByAuthorId = books.filter(
        book => book.author.id === parseInt(id)
    );

    if (!author) {
        return <div>Loading...</div>;
    }

    return(
        <>
            <h1>Name: {author.first_name} {author.last_name}</h1>
            <p><strong>First Name:</strong> {author.first_name}</p>
            <p><strong>Last Name:</strong> {author.last_name}</p>
            <p><strong>Date of Birth:</strong> {author.date_of_birth}</p>
            <p><strong>Date of Death:</strong> {author.date_of_death}</p>
            <h1>Books</h1>
            {filteredBooksByAuthorId.map((book) => (
                <ul key={book.id}>
                    Title: {book.title}<br />
                    Summary: {book.summary}<br />
                    ISBN: {book.isbn}
                    <hr />
                </ul>
            ))}
        </>
    );
}
