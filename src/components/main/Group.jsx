import { Avatar, Badge, Button, Input, Spin, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { CgAdd, CgRemove } from 'react-icons/cg';
import { FaCartArrowDown } from "react-icons/fa6";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AddMember from './addMember';
import { useParams } from 'react-router-dom';
import { getGroupDetail } from '../../api/api';

const Group = () => {
    const { id: groupId } = useParams(); // groupId ni olish
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log("Group ID:", groupId);
    

    const handleAddMember = (data) => {
        console.log("Member added:", data);
        // API chaqirib refresh qilish mumkin
        fetchGroupDetail();
        setIsOpenMember(false);
    };

    const fetchGroupDetail = async () => {
        setLoading(true);
        try {
            const response = await getGroupDetail(groupId);
            setGroup(response.data);
            console.log("Group data fetched:", response.data);
            
        } catch (error) {
            console.error("Failed to fetch group detail:", error);
            message.error("Failed to load group data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (groupId) {
            fetchGroupDetail();
        }
    }, [groupId]);

    return (
        <div className='w-full flex justify-between py-4'>
            <div className="w-1/2 px-2">
                <div className="bg-cyan-700 border-b-blue-700 overflow-auto rounded-2xl w-full h-[85vh] p-5">
                    {loading ? (
                        <div className='flex justify-center items-center h-full'>
                            <Spin size="large" />
                        </div>
                    ) : group ? (
                        <>
                            <div className="flex justify-between">
                                <div>
                                    <h1 className='text-2xl text-white mb-0!'>{group.name}</h1>
                                    <Badge count={group.items?.length || 0} size="small">
                                        <h1 className='text-md text-white mb-0!'>Items</h1>
                                    </Badge>
                                </div>
                                <div className="flex">
                                    <Input placeholder='Add Message' className='w-50! h-10' />
                                    <Button type="primary" className='ml-2! h-10! w-10!' icon={<CgAdd size={20} />}></Button>
                                </div>
                            </div>
                            <div className="mt-2">
                                {group.items?.map((item) => (
                                    <div key={item._id} className='w-full border border-cyan-500 flex justify-between items-center mb-2'>
                                        <div className="flex items-center p-2">
                                            <h1 className='bg-blue-100 w-8 h-8 flex justify-center items-center rounded-sm'>
                                                {item.createdBy?.username?.charAt(0).toUpperCase()}
                                            </h1>
                                            <div>
                                                <h1 className='text-white ml-2 text-2xl mb-0!'>{item.name}</h1>
                                                <p className='mb-0! text-white ml-2'>created by {item.createdBy?.username} {item.createdAt}</p>
                                            </div>
                                        </div>
                                        <div className="flex px-2">
                                            <Button type="primary" className='ml-2! h-10! w-10!' icon={<FaCartArrowDown size={20} />}></Button>
                                            <Button danger className='ml-2! h-10! w-10!' icon={<CgRemove size={20} />}></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='text-center text-white'>No group data found.</div>
                    )}
                </div>
            </div>

            <div className="w-1/2 px-2">
                <div className="bg-cyan-700 border-b-blue-700 overflow-auto rounded-2xl w-full h-[85vh] p-5">
                    {loading ? (
                        <div className='flex justify-center items-center h-full'>
                            <Spin size="large" />
                        </div>
                    ) : group ? (
                        <>
                            <div className="flex justify-between">
                                <div>
                                    <h1 className='text-2xl text-white mb-0!'>{group.createdBy?.username || "Group Creator"}</h1>
                                    <Badge count={group.members?.length || 0} size="small">
                                        <h1 className='text-md text-white mb-0!'>Members</h1>
                                    </Badge>
                                </div>
                                <div className="flex">
                                    <Button type="primary" className='ml-2! h-10! w-auto!' onClick={() => setIsOpenMember(true)} icon={<CgAdd size={20} />}>Add</Button>
                                    <AddMember
                                        isOpen={isOpenMember}
                                        onClose={() => setIsOpenMember(false)}
                                        onAdd={handleAddMember}
                                    />
                                    <Button danger className='ml-2! h-10! w-auto!' icon={<RiDeleteBin5Fill size={20} />}>Delete</Button>
                                </div>
                            </div>
                            <div className="mt-2">
                                {group.members?.map((member) => (
                                    <div key={member._id} className='w-full border border-cyan-500 flex justify-between items-center mb-2'>
                                        <div className="flex items-center p-2">
                                            <h1 className='bg-blue-100 w-8 h-8 flex justify-center items-center rounded-sm'>
                                                {member.username?.charAt(0).toUpperCase()}
                                            </h1>
                                            <div>
                                                <h1 className='text-white ml-2 text-2xl mb-0!'>{member.username}</h1>
                                                <p className='mb-0! text-white ml-2'>{member.email || "-"}</p>
                                            </div>
                                        </div>
                                        <Button danger className='mr-2! h-10! w-10!' icon={<CgRemove size={20} />}></Button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='text-center text-white'>No group data found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Group;
