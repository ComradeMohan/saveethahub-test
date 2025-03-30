// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Props {
    setUser: (user: { username: string }) => void; // Function to set user in parent component
}

const LoginForm: React.FC<Props> = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Directly set the user without verification
        setUser({ username });
        // Clear inputs after submission
        setUsername('');
        setPassword('');
        // Navigate to the home page
        navigate('/'); // Redirect to home page
    };

    return (
        <form onSubmit={handleSubmit} className="backdrop-blur p-6 rounded shadow-md w-full max-w-sm">
            <h1 className='text-4xl text-white text-center'>Login</h1>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-white">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="bg-transparent text-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="bg-transparent text-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <button type="submit" className="w-full bg-gradient-to-br from-[#0d9488] to-[#1a365d] text-white py-2 rounded hover:bg-blue-700">
                Login
            </button>
            <div className="mt-4">
                <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 hover:shadow-lg transition-shadow">
                    <img src="data:image/jpeg;base64,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" alt="Google Icon" className="h-5 mr-2" />
                    Sign in with Google
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
