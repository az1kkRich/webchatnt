import { Avatar, Badge, Button, Input } from 'antd'
import React, { useState } from 'react'
import { CgAdd, CgRemove } from 'react-icons/cg'
import { FaCartArrowDown } from "react-icons/fa6";
import { LuDelete } from 'react-icons/lu';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AddMember from './addMember';


const Group = () => {

    const [isOpenMember, setIsOpenMember] = useState(false);

    const handleAddMember = (data) => {
        console.log("Member added:", data);
        // Bu yerda API chaqirishingiz yoki statega saqlashingiz mumkin
        setIsOpenMember(false);
    }
    return (
        <div className='w-full flex justify-between py-4'>
            <div className="w-1/2 px-2">
                <div className="bg-cyan-700 border-b-blue-700 overflow-auto rounded-2xl w-full h-[85vh] p-5 ">
                    <div className="flex justify-between">
                        <div >
                            <h1 className='text-2xl text-white mb-0!'>Group Name</h1>
                            <Badge count={5} size="small">
                                <h1 className='text-md text-white mb-0!'>Items</h1>
                            </Badge>

                        </div>
                        <div className="flex">
                            <Input placeholder='Add Messeage' className='w-50! h-10' />
                            <Button type="primary" className='ml-2! h-10! w-10!   ' icon={<CgAdd size={20} />}></Button>
                        </div>
                    </div>
                    <div className="mt-2 ">
                        <div className='w-full border border-cyan-500 flex justify-between items-center'>
                            <div className="flex items-center p-2">
                                <h1 className='bg-blue-100 w-8 h-8 flex justify-center items-center rounded-sm'>A</h1>
                                <div>
                                    <h1 className='text-white ml-2 text-2xl mb-0!'>Alice</h1>
                                    <p className='mb-0! text-white ml-2'>created by Alice 11:00 09-06-2025</p>
                                </div>
                            </div>
                            <div className="flex px-2">
                                <Button type="primary" className='ml-2! h-10! w-10! ' icon={<FaCartArrowDown size={20} />}></Button>
                                <Button color="danger" variant="solid" className='ml-2! h-10! w-10! ' icon={<CgRemove size={20} />}></Button>
                            </div>
                        </div>


                    </div>


                </div>
            </div>

            <div className="w-1/2 px-2">
                <div className="bg-cyan-700 border-b-blue-700 overflow-auto rounded-2xl w-full h-[85vh] p-5 ">
                    <div className="flex justify-between">
                        <div >
                            <h1 className='text-2xl text-white mb-0!'>GroupCreator</h1>
                            <Badge count={5} size="small">
                                <h1 className='text-md text-white mb-0!'>Members</h1>
                            </Badge>

                        </div>
                        <div className="flex">
                            <Button type="primary" className='ml-2! h-10! w-auto! ' onClick={() =>setIsOpenMember(true)} icon={<CgAdd size={20} />}>Add</Button>
                            <AddMember isOpen={isOpenMember}
                                onClose={() => setIsOpenMember(false)}
                                onAdd={handleAddMember} />


                            <Button color='danger' variant='solid' className='ml-2! h-10! w-auto! ' icon={<RiDeleteBin5Fill size={20} />}>Delete</Button>
                        </div>
                    </div>
                    <div className="mt-2 ">
                        <div className='w-full border border-cyan-500 flex justify-between items-center'>
                            <div className="flex items-center p-2">
                                <h1 className='bg-blue-100 w-8 h-8 flex justify-center items-center rounded-sm'>A</h1>
                                <div>
                                    <h1 className='text-white ml-2 text-2xl mb-0!'>Alice</h1>
                                    <p className='mb-0! text-white ml-2'>alice1109</p>
                                </div>
                            </div>
                            <Button color="danger" variant="solid" className='mr-2! h-10! w-10! ' icon={<CgRemove size={20} />}></Button>

                        </div>


                    </div>


                </div>
            </div>
        </div>
    )
}

export default Group
