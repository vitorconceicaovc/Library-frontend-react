// Register.js
import { useState } from "react";

export function Register(){

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [registered, setRegistered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password1 !== password2) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password: password1 }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            setRegistered(true);
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {registered ? (
                <p>Registration successful! You can now login.</p>
            ) : (
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
                        <label htmlFor="password1">Password:</label>
                        <input
                            type="password"
                            id="password1"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm Password:</label>
                        <input
                            type="password"
                            id="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            )}
        </div>
    );
}
