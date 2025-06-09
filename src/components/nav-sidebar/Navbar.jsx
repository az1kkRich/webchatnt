import React, { useState } from 'react'
import Mainlogo from '../../assets/main.png'
import { Button, Dropdown, Input, Space, message } from 'antd';
import { RiRefreshFill } from "react-icons/ri";
import { DownOutlined } from '@ant-design/icons';
import { CiSettings } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { handelDelete } from '../../api/api'; // <-- API dan import qilamiz
import "./nav.css"
import toast from 'react-hot-toast';

const Navbar = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const { Search } = Input;
    const navigate = useNavigate(); // navigate uchun

    const [isSpinning, setIsSpinning] = useState(false);

    const handleRefreshClick = () => {
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
        }, 1000); // 1s = duration of the animation
    };

    const handleMenuClick = async (e) => {
        if (e.key === '1') {
            // Logout
            localStorage.removeItem('token');
            toast.success('Logged out successfully!');
            navigate('/login');
        } else if (e.key === '2') {
            // Delete account
            try {
                await handelDelete();
                toast.success('Account deleted successfully!');
                localStorage.removeItem('token');
                navigate('/login');
            } catch (err) {
                console.error('Error deleting account:', err);
                toast.error(`Error: ${err.response?.data?.message || err.message}`);
            }
        } else if (e.key === '3') {
            // Settings
            toast.success('Settings clicked');
            // You can navigate to settings page if you have one
            // navigate('/settings');
        }
    };

    const menuProps = {
        items: [
            { label: 'Logout', key: '1' },
            { label: 'Delete Account', key: '2' },
            { label: 'Settings', key: '3' },
        ],
        onClick: handleMenuClick,
    };

    return (
        <div className='w-full flex justify-between items-center py-2 px-5 bg-cyan-100 shadow-md'>
            <div className="w-1/8">
                <img src={Mainlogo} className='w-[60px]' alt="Main Logo" />
            </div>
            <div className='w-5/8'>
                <Search placeholder="input search text" onSearch={onSearch} enterButton size='large' />
            </div>

            <div className='w-2/8 flex justify-end items-center gap-3'>
                <RiRefreshFill
                    onClick={handleRefreshClick}
                    className={`text-3xl text-amber-500 cursor-pointer ${isSpinning ? 'spin-twice' : ''}`}
                />
                <Dropdown menu={menuProps}>
                    <Button>
                        <Space>
                            <CiSettings className='text-2xl text-amber-500 cursor-pointer' />
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar;
