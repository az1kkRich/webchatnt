import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/api';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await login(formData);
      toast.success('User logged in successfully!');

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token:', response.data.token);
      }

      navigate('/'); // Home yoki profile ga redirect
    } catch (err) {
      console.error('Error logging in:', err);
      toast.error(`Error Logging in`);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-blue-900 flex justify-center items-center'>
      <div className="bg-white w-[40rem] h-[95vh] rounded-2xl">
        <div className="flex flex-col items-center justify-center min-h-[94vh]">
          <h1 className="text-4xl font-bold mb-4">Login</h1>
          <form className="w-96" onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
              <Input 
                id="username"
                type="text" 
                size='large' 
                placeholder="Enter your username" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <Input.Password 
                id="password"
                size='large' 
                placeholder="Enter your password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <Button type='primary' htmlType='submit' size='large' block>
              Login
            </Button>

          </form>
          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/login/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
