import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loged, setLoged] = useState(false)
    const [refresh, setRefresh] = useState(true)

    const [showMyBooks, setShowMyBooks] = useState(false)
    const [myBooks, setMyBooks] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();

            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            console.log('Token:', data.access);
            await verifyToken();
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
    const verifyToken = async (refresh) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/verify/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Adiciona o token ao header de Authorization
                },
                body: JSON.stringify({ token }),
            });
            
            if (!response.ok) {
                if (refresh){
                    refreshToken()
                }
                else{
                    setRefresh(true)
                    handleLogOut()
                }
                throw new Error('Token verification failed');
            }
            
            const verificationData = await response.json();
            console.log('Token verification response:', verificationData);
        } catch (error) {
            console.error('Token verification error:', error.message);
        }
        setLoged(true)
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setLoged(false)
    }

    const refreshToken = async() => {
        const token = localStorage.getItem('refreshToken');

        if (!token) {
            handleLogOut();
            console.error('Refresh Token not found in localStorage');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: token }),
            });
            
            if (!response.ok) {
                handleLogOut()
                
                throw new Error('Refresh Token verification failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access);

            console.log('New Access Token:', data.access);
            setRefresh(false)
            verifyToken();
        } catch (error) {
            console.error('Refresh Token error:', error.message);
            handleLogOut();
        }
    };

    const fetchMyBooks = async () => {
        const token = localStorage.getItem('token');
      
        if (!token) {
            console.error('Token not found');
            return;
        }
      
        try {
            const response = await fetch('http://127.0.0.1:8000/catalog/rest_self_booksinstances/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            });
        
            if (!response.ok) {
            throw new Error('Failed to fetch books');
            }
        
            const responseData = await response.json();
            const booksData = responseData.data; 
        
            
            setMyBooks(booksData);
            setShowMyBooks(true);
        } catch (error) {
            console.error('Fetch my books error:', error.message);
        }
    };
    
    return (
        <div>

            {loged ? (
                <div>
                    <h1>Ola </h1>
                    Login com sucesso!

                    <button onClick={handleLogOut}>Log Out</button>

                    <br />

                    <h1>My Books</h1>

                    <button onClick={fetchMyBooks}>Show my books</button>

                    {!showMyBooks ? (
                        <h1>Empty List</h1>
                    ) : (
                        

                        <ul>
                            {myBooks.map((instance) => (
                            <li key={instance.id}>
                                {/* <Link to={`/book/${instance.id}`}>{instance.title}</Link> */}
                                <h1>{instance.id}</h1>
                            </li>
                            ))}
                        </ul>

                    )}

                </div>
            ) : ( 
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}