import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookById, getBooksInstances } from "../API";

export function BookDetail() {

    const [book, setBook] = useState(null);
    const [booksInstances, setBooksInstances] = useState([])
    const { id } = useParams(); 

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);
                console.log('Book Details:', bookData); 
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchBooksInstances = async () => {
            try {
                const booksInstancesData = await getBooksInstances()
                setBooksInstances(booksInstancesData.data)
                console.log('Books Instances: ', booksInstancesData)
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }
        fetchBooksInstances()
    }, [])

    const filteredInstancesById = booksInstances.filter(
        instance => instance.book.id === parseInt(id)
    );

    if (!book) {
        return <div>Loading...</div>;
    }

    return(
        <>
            <h1>Title: {book.title}</h1>
            <strong>
            Author: 
            <Link
                to={`/author/${book.author.id}`}>
                {book.author.first_name} {book.author.last_name}
            </Link> 
            </strong>
            <p><strong>Summary:</strong> {book.summary}</p>
            <p><strong>ISBN:</strong> { book.isbn }</p>
            <p><strong>Language:</strong> {book.language }</p>       
            <p><strong>Genre:</strong> {book.genre }</p>         
            <h1>Copies</h1>
            
            {filteredInstancesById.map((instance) => (
                <ul key={instance.id}>
                    Imprint: {instance.imprint}<br />
                    ID: {instance.id}<br />
                    <hr />
                </ul>
            ))}
            
        </>
    )
}