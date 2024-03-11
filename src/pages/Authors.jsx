import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from '../API'; 

export function Authors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorsData = await getAuthors();
                setAuthors(authorsData.data);
                console.log('Data:', authorsData);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <>
            <br /><br />
            <h1>Author List</h1><br />
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        <Link to={author.url}>{author.first_name} {author.last_name}</Link> 
                    </li>
                ))}
            </ul>
        </>
    );
}
