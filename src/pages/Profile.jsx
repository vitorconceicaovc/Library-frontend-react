import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBooks, logOut, verifyToken } from "../API";

export function Profile() {
    const navigate = useNavigate();
    const [showMyBooks, setShowMyBooks] = useState(false);
    const [myBooks, setMyBooks] = useState([]);
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

    return (
        <div>
            <div>
                <h1>Your Profile</h1>
                <br />
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
            </div>
        </div>
    );
}
