import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const ChangePassword = () => {
    const { loginUser } = useAuth();

    const userId = loginUser;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password, confirm) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
            return false;
        } else if (password !== confirm) {
            setPasswordError('New password and confirm password do not match');
            return false;
        }

        setPasswordError('');
        return true;
    };

    const handleNewPasswordChange = (newPassword) => {
        validatePassword(newPassword, confirmPassword);
        setNewPassword(newPassword);
    };

    const handleConfirmPasswordChange = (confirmPassword) => {
        validatePassword(newPassword, confirmPassword);
        setConfirmPassword(confirmPassword);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!validatePassword(newPassword, confirmPassword)) {
            return;
        }

        const changePassword = {
            userId,
            currentPassword,
            newPassword,
            confirmPassword,
        };

        try {
            const response = await fetch('http://localhost:3001/password/change', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changePassword),
            });

            if (response.ok) {
                console.log('Password changed successfully!');
                alert('Password changed successfully!');
            } else {
                console.error('Failed to change password. Server returned:', await response.text());
                alert('Failed to change password.');
            }
        } catch (error) {
            console.error('An error occurred while changing the password:', error);
            alert('An error occurred while changing the password.');
        }
    };

    return (
        <div className="container mt-4 d-flex justify-content-center align-items-center">
            <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Change Password</h5>
                    <form onSubmit={handleChangePassword}>
                        <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">Current Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                value={currentPassword}
                                placeholder='Current Password'
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input
                                type="password"
                                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                id="newPassword"
                                value={newPassword}
                                placeholder='New Password'
                                onChange={(e) => handleNewPasswordChange(e.target.value)}
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                placeholder='Confirm New Password'
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Change Password</button>
                        {passwordError && <span className="text-danger">{passwordError}</span>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
