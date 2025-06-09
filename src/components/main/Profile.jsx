import { Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiCopy } from 'react-icons/bi'
import { getMe } from '../../api/api'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCopy = () => {
    if (user?.username) {
      navigator.clipboard.writeText(user.username)
      toast.success(`Username ${user.username} copied to clipboard!`)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true) // loaderni yoqamiz
      try {
        const response = await getMe()
        setUser(response.data)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        toast.error("Failed to load profile data.")
      } finally {
        setLoading(false) // loaderni o'chiramiz
      }
    }

    fetchUser()
  }, [])

  return (
    <div className='w-full flex justify-center py-4'>
      <div className="bg-cyan-700 border-b-blue-700 rounded-2xl w-[94%] flex justify-between p-5 min-h-[200px]">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Spin size="large" tip="Loading profile..." />
          </div>
        ) : user ? (
          <>
            <div className='w-5/6'>
              <h1 className='text-4xl text-white'>Your Profile</h1>
              <div className="flex flex-row items-center mt-4">
                <div className="bg-red-500 w-[100px] h-[100px] rounded-full flex justify-center items-center">
                  <h1 className='text-6xl text-white mb-0! shadow'>
                    {user.username?.charAt(0).toUpperCase()}
                  </h1>
                </div>

                <div className="ml-5 text-white">
                  <h1 className='text-4xl mb-0!'>{user.username}</h1>
                  <p>{user.name || user.fullName || "-"}</p>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex justify-end items-start">
              <Button type="default" icon={<BiCopy />} onClick={handleCopy}>
                Copy Username
              </Button>
            </div>
          </>
        ) : (
          // Agar user null bo'lsa va loading tugagan bo'lsa
          <div className='text-white text-center w-full'>
            No user data found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
