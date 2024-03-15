import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyStatus, logOut, verifyToken } from "../API";

export function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken();
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
        } catch (error) {
            console.error('Login error:', error.message);
        }
        getMyStatus()
        navigate('/');
        window.location.reload(false);
    };

    return (
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
   )
}