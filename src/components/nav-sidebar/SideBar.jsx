import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import 'antd/dist/reset.css'; // yoki 'antd/dist/antd.css'
import { CgAdd, CgProfile } from 'react-icons/cg';
import { FcAddDatabase } from 'react-icons/fc';
import FloatingModal from '../main/modal';
import { GrGroup } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { getMyGroups } from '../../api/api';
import toast from 'react-hot-toast';

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleAddGroup = (data) => {
    console.log("Group added:", data);
    // Bu yerda API chaqirishingiz yoki statega saqlashingiz mumkin
  };


  // Get Groupdata
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await getMyGroups();
      setGroups(response.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      toast.error("Failed to load groups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);


  return (
    <div className='w-full bg-cyan-100 h-[88vh] pt-4 flex flex-col items-center gap-2'>
      <Link to="/" className='w-[90%]'>
        <Button type="dashed" className='w-full' icon={<CgProfile className='text-blue-600!' size={20} />}>Profile</Button>

      </Link>
      {loading ? (
        <Button type="dashed" className='w-[90%]' disabled>
          Loading Groups...
        </Button>
      ) : (
        <Link to="/groups" className='w-[90%]'>
          {groups.map((group) => (
            <Link to={`/groups/${group._id}`} key={group._id} className='w-full '>
              <Button key={group._id} type="dashed" className='w-full mb-2!' icon={<GrGroup className='text-amber-600!' size={20} />} >
                {group.name}
              </Button>
            </Link>
          ))}
        </Link>
      )}

      <Button type="dashed" className='w-[90%]' icon={<CgAdd className='text-blue-600!' size={20} />}
        onClick={() => setIsModalOpen(true)}>Create Group </Button>
      <FloatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGroup}
      />
    </div>
  );
};

export default SideBar;
