import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { register } from '../../api/api';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate(); // Import useNavigate from 'react-router-dom' if you want to navigate after registration
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            toast.success('User registered successfully!');

            // Token bo'lsa localStorage ga yozamiz
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('Token:', response.data.token);
            }

            // Optionally navigate to login page
            navigate('/'); // Redirect to login page after successful registration

        } catch (err) {
            console.error('Error registering:', err);
            toast.error(`Error registering`);
        }
    };

    return (
        <div className='w-full h-[100vh] bg-blue-900 flex justify-center items-center'>
            <div className="bg-white w-[40rem] h-[95vh] rounded-2xl">
                <div className="flex flex-col items-center justify-center min-h-[94vh]">
                    <h1 className="text-4xl font-bold mb-4">Register</h1>
                    <form className="w-96" onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                size='large'
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                size='large'
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <Input.Password
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                size='large'
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <Button type="primary" size='large' block htmlType="submit">
                            Register
                        </Button>
                    </form>
                    <p className="mt-4 text-gray-600">
                        Do You Have Accaount {" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
