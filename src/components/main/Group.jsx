import { Avatar, Badge, Button, Input, Spin, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { CgAdd, CgRemove } from 'react-icons/cg';
import { FaCartArrowDown } from "react-icons/fa6";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AddMember from './addMember';
import { useParams } from 'react-router-dom';
import { addItem, addMember, getMe, getMyGroups, markItemAsBought, removeItemAsBought, removeItemFromGroup, RemoveMember } from '../../api/api';
import toast from 'react-hot-toast';
import { IoRemove } from 'react-icons/io5';

const Group = () => {
    const { id } = useParams(); // groupId ni olish
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [group, setGroup] = useState({});
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const [messageValue, setMessageValue] = useState('');

    const handleAddMember = async (data) => {
        console.log("Adding member with data:", data.memberId);
        try {
          await addMember({
            groupId: group._id,
            memberId: data.memberId,
          });

          toast.success("Member added successfully!");
          console.log("Member added:", memberId);
        } catch (error) {
          console.error("Error adding member:", error);
          toast.error("Failed to add member.");
        }
      };
      

    const fetchGroupDetail = async () => {
        setLoading(true);
        try {
            const response = await getMyGroups();
            const foundGroup = response.data.find(group => group._id === id);

            if (foundGroup) {
                setGroup(foundGroup);
                console.log("Fetched group detail:", foundGroup);
            } else {
                console.warn("Group not found with id:", id);
                setGroup(null);
            }
        } catch (error) {
            console.error("Failed to fetch group detail:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return; // id tayyor bo'lmaguncha chaqirmaymiz
        fetchGroupDetail();
    }, [id]);


    // Userni olish uchun

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe()
                setUser(response.data)
                console.log("Fetched user data:", response.data)
            } catch (error) {
                console.error("Failed to fetch user data:", error)
                toast.error("Failed to load profile data.")
            }
        }

        fetchUser()
    }, [])


    // Message qo'shish uchun
    const handleAddMessage = async (e) => {
        e.preventDefault();

        if (messageValue.trim()) {
            try {
                await addItem({
                    groupId: group._id,
                    itemData: {
                        title: messageValue,
                        addedBy: user._id,
                    },
                });
                toast.success(`Message "${messageValue}" added successfully!`);
                setMessageValue("");

            } catch (error) {
                toast.error("Failed to add message.");
            }
        } else {
            toast.warning("Please enter a message.");
        }
    };


    const handleRemoveItem = async (itemId) => {
        try {
            await removeItemFromGroup(itemId);
            toast.success("Item removed successfully!");

        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item.");
        }
    };

    const handleRemoveMember = (groupId,memberId) => {
        const confirm = window.confirm("Are you sure you want to remove this member?");
        if (confirm) {
            try {
                RemoveMember(groupId, memberId);
                toast.success("Member removed successfully!");
            } catch (error) {
                console.error("Error removing member:", error);
                toast.error("Failed to remove member.");
            }
        }
    };


    // Mark item as bought
    const handleMarkBought = async (itemId) => {
        try {
            await markItemAsBought(itemId);
            toast.success("Item marked as bought successfully!");

        } catch (error) {
            console.error("Error marking item as bought:", error);
            toast.error("Failed to mark item as bought.");

        }
    }

    // Remove item as bought
    const handleRemBought = async (itemId) => {
        try {
            await removeItemAsBought(itemId);
            toast.success("Item marked as not bought successfully!");
        } catch (error) {
            console.error("Error removing item as bought:", error);
            toast.error("Failed to mark item as not bought.");
        }
    };


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="w-full flex justify-between py-4">
            {/* LEFT COLUMN */}
            <div className="w-1/2 px-2">
                <div className="bg-gray-900 border border-gray-700 overflow-auto rounded-2xl w-full h-[85vh] p-5 backdrop-blur-lg">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Spin size="large" />
                        </div>
                    ) : group ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h1 className="text-2xl text-white font-bold">{group.name}</h1>
                                    {group.items && group.items.length > 0 ? (
                                        <Badge count={group.items.length || 0} size="small">
                                            <h1 className="text-md text-white">Items</h1>
                                        </Badge>
                                    ) : (
                                        <h1 className="text-md text-white">No items in this group</h1>
                                    )}
                                </div>
                                <form onSubmit={handleAddMessage} className="flex items-center gap-2">
                                    <Input
                                        placeholder="Add Message"
                                        value={messageValue}
                                        onChange={(e) => setMessageValue(e.target.value)}
                                        className="h-10 rounded-lg text-black"
                                    />
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 border-none"
                                        icon={<CgAdd size={20} />}
                                    />
                                </form>
                            </div>

                            {/* ITEMS LIST */}
                            <div className="mt-2">
                                {group.items?.map((item) => (
                                    <div
                                        key={item._id}
                                        className="w-full bg-white/5 border border-gray-500 rounded-lg flex justify-between items-center p-3 mb-3 backdrop-blur"
                                    >
                                        <div className="flex items-center">
                                            <h1 className="bg-blue-200 text-blue-900 font-semibold w-8 h-8 flex justify-center items-center rounded-full">
                                                {item.owner?.name?.charAt(0).toUpperCase()}
                                            </h1>
                                            <div className="ml-3">
                                                <h1 className="text-white font-semibold text-lg mb-0!">{item.title}</h1>
                                                <p className="text-gray-300 text-sm mb-0!">
                                                    created by {item.owner?.name} • {formatDate(item.createdAt)}
                                                </p>
                                                <p className="text-blue-400 text-xs">
                                                    {item.isBought ? `Boughted by ${item.boughtBy.name}` : "Not Bought"}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">

                                            {item.isBought ? (
                                                <Button
                                                    type="primary"
                                                    onClick={() => handleRemBought(item._id)} // ✅ To'g'ri function
                                                    className="h-9 w-9 flex items-center justify-center bg-blue-500 hover:bg-blue-600 border-none rounded-full"
                                                    icon={<IoRemove size={18} />}
                                                />
                                            ) : (
                                                <Button
                                                    type="primary"
                                                    onClick={() => handleMarkBought(item._id)} // ✅ To'g'ri function
                                                    className="h-9 w-9 flex items-center justify-center bg-blue-500 hover:bg-blue-600 border-none rounded-full"
                                                    icon={<FaCartArrowDown size={18} />}
                                                />
                                            )}




                                            {(user?._id === group?.owner?._id || user?._id === item?.owner?._id) && (
                                                <Button
                                                    danger
                                                    className="h-9 w-9 flex items-center justify-center bg-red-500 hover:bg-red-600 border-none rounded-full"
                                                    icon={<CgRemove size={18} />}
                                                    onClick={() => handleRemoveItem(item._id)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-white">No group data found.</div>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-1/2 px-2">
                <div className="bg-gray-900 border border-gray-700 overflow-auto rounded-2xl w-full h-[85vh] p-5 backdrop-blur-lg">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Spin size="large" />
                        </div>
                    ) : group ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                
                                    <Badge count={group.members?.length || 0} size="small">
                                        <h1 className="text-md text-white">Members</h1>
                                    </Badge>
                                <div className="flex gap-2">
                                    {group.owner?._id === user?._id ? (

                                        <>
                                            <Button
                                                type="primary"
                                                className="h-10 px-4 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 border-none rounded-lg"
                                                onClick={() => setIsOpenMember(true)}
                                                icon={<CgAdd size={20} />}
                                            >
                                                Add
                                            </Button>
                                            <AddMember
                                                isOpen={isOpenMember}
                                                onClose={() => setIsOpenMember(false)}
                                                onAdd={handleAddMember}
                                            />
                                            <Button
                                                danger
                                                className="h-10 px-4 flex items-center justify-center bg-red-500 hover:bg-red-600 border-none rounded-lg"
                                                icon={<RiDeleteBin5Fill size={20} />}
                                            >
                                                Delete
                                            </Button>

                                        </>

                                    ) : (
                                        <Button
                                            danger
                                            className="h-10 px-4 flex items-center justify-center bg-blue-500 hover:bg-blue-600 border-none rounded-lg"
                                            onClick={() => toast.success("Get Out.")}
                                            icon={<CgRemove size={20} />}
                                        >
                                            Leave
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* MEMBERS LIST */}
                            <div className="mt-2">
                                {group.members?.map((member) => (
                                    <div
                                        key={member._id}
                                        className="w-full bg-white/5 border border-gray-500 rounded-lg flex justify-between items-center p-3 mb-3 backdrop-blur"
                                    >
                                        <div className="flex items-center">
                                            <h1 className="bg-blue-200 text-blue-900 font-semibold w-8 h-8 flex justify-center items-center rounded-full">
                                                {member.username?.charAt(0).toUpperCase()}
                                            </h1>
                                            <div className="ml-3">
                                                <h1 className="text-white font-semibold text-lg">{member.username}</h1>
                                                <p className="text-gray-300 text-sm">{member.name || "-"}</p>
                                            </div>
                                        </div>
                                        {member._id === group.owner?._id ? (
                                            <div className="text-green-400 font-semibold">Owner</div>
                                        ) : (
                                            <div className="text-gray-400">Member</div>
                                        )}
                                        {/* Remove member button */}

                                        {user._id === group.owner._id && member._id !== group.owner._id 
                                            ? (

                                                <Button
                                                    danger
                                                    className="h-9 w-9 flex items-center justify-center bg-red-500 hover:bg-red-600 border-none rounded-full"
                                                    icon={<CgRemove size={18} />}
                                                    onClick={() => handleRemoveMember(group._id,member._id)} 
                                                    />
                                            ) : (
                                                <div></div>

                                            )
                                        }

                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-white">No group data found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Group;
