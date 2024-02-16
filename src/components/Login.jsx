import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import loginImg from "../imges/login.svg"

export default function Login() {
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
                console.log(responseData.user);
                navigate('/layout');
            } else {
                const errorMessage = await response.text();
                console.error('Failed to login. Server returned:', errorMessage);
                console.log(errorMessage.message);
                setError(errorMessage);
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            setError('An error occurred while logging in.');
        }
    };

    return (
        <>
            <Navbar />
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src={loginImg}
                                className="img-fluid" alt="loginimg" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 card">
                            <h2 className='text-center my-4'>Login</h2>
                            <form onSubmit={handleLogin}>
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="username"
                                        required
                                        maxLength={8}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label " htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </div>
                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </form>

                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show position-absolute w-30 mb-4" role="alert">
                                    <strong>Login failed!</strong> {error}
                                </div>
                            )}
                        </div>

                    </div>


                </div>
            </section>
        </>
    );
}

