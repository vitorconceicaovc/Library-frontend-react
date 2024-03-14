import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthors, logOut, verifyToken } from '../API'; 

export function Authors() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);

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
                       <Link 
                            to={`/author/${author.id}`}>
                                {author.first_name} {author.last_name}
                       </Link> 
                   </li>
                ))}
            </ul>
        </>
    );
}
