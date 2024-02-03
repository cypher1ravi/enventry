import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, setLoginUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successful!');
                alert('Login successful!');
                login();
                setLoginUser(responseData.user);
                // console.log(responseData.user);
                navigate('/layout');
            } else {
                console.error('Failed to login. Server returned:', await response.text());
                setError('Failed to login.');
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container w-50 my-5 py-5">
                <div className="card shadow-sm  ">
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Login failed!</strong> {error}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    maxLength={8}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
