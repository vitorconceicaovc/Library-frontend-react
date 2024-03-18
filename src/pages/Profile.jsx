import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBooks, getMyRequirements, logOut, verifyToken } from "../API";

export function Profile() {
    const navigate = useNavigate();
    const [showMyBooks, setShowMyBooks] = useState(false);
    const [showMyRequirements, setShowMyRequirements] = useState(false);
    const [myBooks, setMyBooks] = useState([]);
    const [myRequirements, setMyRequirements] = useState([]);
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const tokenValid = await verifyToken();
            if (!tokenValid) {
                logOut(navigate)
            }
        };

        fetchData();
    }, []);

    const fetchMyBooks = async () => {
        try {
            const booksData = await getMyBooks();
            setMyBooks(booksData);
            setShowMyBooks(true);
        } catch (error) {
            console.error('Fetch my books error:', error.message);
        }
    };  

    const fetchMyRequirements = async () => {
        try {
            const requirementsData = await getMyRequirements()
            setMyRequirements(requirementsData)
            setShowMyRequirements(true)

        } catch (error) {
            console.error('Fetch my books error:', error.message);
        }
    }

    return (
        <div>
            <div>
                <h1>Your Profile</h1>
                <br />
                <hr />
                <h1>My Books</h1>
                <button onClick={fetchMyBooks}>Show my books</button>
                {!showMyBooks ? (
                    <h1>Empty List</h1>
                ) : (
                    <ul>
                        {myBooks.map((instance) => (
                            <li key={instance.id}>
                                <h1>{instance.id}</h1>
                            </li>
                        ))}
                    </ul>
                )}
                <hr />
                 <h1>My Requirements</h1>
                <button onClick={fetchMyRequirements}>Show my Requirements</button>
                {!showMyRequirements ? (
                    <h1>Empty List</h1>
                ) : (
                    <ul>
                        {myRequirements.map((request) => (
                            <li key={request.id}>
                                <p>ID: {request.id}</p>
                                <p>Author: {request.book.author.first_name} {request.book.author.last_name}</p>
                                <p>Book: {request.book.title}</p>
                                <p>Status: {request.status}</p>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
