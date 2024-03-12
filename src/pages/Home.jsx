import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, getAuthors, getBooksInstances } from '../API'; 

export function Home() {

    const [books, setBooks] = useState([])
    const [booksInstances, setBooksInstances] = useState([])
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooks()
                setBooks(booksData.data)
                console.log('Books:', booksData)
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }
        fetchBooks()
    }, [])

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

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorsData = await getAuthors()
                setAuthors(authorsData.data)
                console.log('Authors:', authorsData)
            } catch (error) {
                console.error('Error fetching authors:', error)
            }
        }
        fetchAuthors()
    }, [])

    const countAvailableCopies = () => {
        return booksInstances.filter(booksInstances => booksInstances.status === 'a').length
    };

    return(
        <>
         <br /><br />
           <h1>Local Library Home</h1>
           <p>Welcome to LocalLibrary, a website developed by react and django!</p>
           <br />
           <h1>Dynamic content</h1>
           <p>The library has the following record counts:</p>
           <br />
           <ul>
            <li>Books: {books.length}</li>
            <li>Copies: {booksInstances.length}</li>
            <li>Copies available: {countAvailableCopies()}</li>
            <li>Authors: {authors.length}</li>
           </ul>
        </>
    )
}