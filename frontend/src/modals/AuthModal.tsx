import React, { useState } from 'react'
import { useGeneralStore } from '../store/general.store';
import { ImCross } from 'react-icons/im';
import Register from '../components/Register';
import Login from '../components/Login';

export default function AuthModal() {
    const [isRegistered, setIsRegistered] = useState(false);
    const { isLoginOpen, setLoginIsOpen } = useGeneralStore((state) => (state))
    return (
        <div id='AuthModal' className='fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50'>
            <div className='relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg'>
                <div className='w-full flex justify-end'>
                    <button onClick={() => (setLoginIsOpen(!isLoginOpen))} className='p-1.5 rounded-full bg-gray-100'>
                        <ImCross color='#000000' size="20" />
                    </button>
                </div>
                {isRegistered ? <Login /> : <Register />}
                <div className='absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full'>
                    <span className='text-[14px] text-gray-600'>
                        {`${isRegistered ? 'Do not have an account?' : 'Already have an account?'}`}
                    </span>
                    <button className='text-[14px] text-red-500 font-semibold pl-1' onClick={() => setIsRegistered(!isRegistered)}>
                        {isRegistered ? <span>Sign Up</span> : <span>Log in</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}
