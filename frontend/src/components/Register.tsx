import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { RegisterUserMutation } from '../gql/graphql';
import { REGISTER_USER } from "../graphql/mutation/Register";
import { GraphQLErrorExtensions } from 'graphql';
import { useUserStore } from '../store/user.store';
import { useGeneralStore } from '../store/general.store';
import { SweetAlertToast } from "../sweetAlert/toast";

export default function Register() {
  const [registerUser] = useMutation<RegisterUserMutation>(REGISTER_USER);
  const [errors, setErrors]: any = useState<GraphQLErrorExtensions>({});
  const { setUser } = useUserStore();
  const { setLoginIsOpen } = useGeneralStore()
  const [registerData, setRegisterData] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  })

  function handleAssignFromValue(e: any) {
    setRegisterData((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  function validateForm() {
    if (!registerData.email) {
      SweetAlertToast('error', "Email required.");
      return false;
    }
    else if (!registerData.fullname) {
      SweetAlertToast('error', "Fullname required.");
      return false;
    }
    else if (!registerData.password) {
      SweetAlertToast('error', "Password required.");
      return false;
    }
    else if (!registerData.confirmPassword) {
      SweetAlertToast('error', "Confirm password required.");
      return false;
    }
    else if (registerData.password !== registerData.confirmPassword) {
      SweetAlertToast('error', "Password did not matched!");
      return false;
    }
    else {
      return true;
    }
  }

  async function handleRegister(e: any) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setErrors({});
    try {
      const response = await registerUser({
        variables: {
          email: registerData.email,
          fullname: registerData.fullname,
          password: registerData.password,
          confirmPassword: registerData.confirmPassword,
        }
      })
      if (response?.data?.register.user) {
        const userData = response?.data?.register.user;
        setUser({
          id: userData?.id,
          email: userData?.email,
          fullname: userData?.fullname,
          bio: "",
          image: "",
        })
        setLoginIsOpen(false)
      }
    } catch (error: any) {
      if (error && error.graphQLErrors && error.graphQLErrors[0].extensions) {
        const validationErrors = error.graphQLErrors[0].extensions
        setErrors(validationErrors)
      } else {
        console.error('Error during registration:', error);
      }
      return;
    }
  }

  return (
    <>
      <div className='text-center text-[28px] mb-4 font-bold'>Sign Up</div>
      <div className='px-6 pb-2'>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
          {/* email */}
          <div className='mb-3'>
            <label htmlFor='register-email' className="mb-2 text-sm font-medium text-gray-900">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="email" id="register-email" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Email..."
                value={registerData.email} name="email" onChange={handleAssignFromValue} required
              />
              {errors?.email && <span className='text-[12px] font-normal text-red-500'>*{errors?.email}</span>}
            </div>
          </div>
          {/* fullname */}
          <div className='mb-3'>
            <label htmlFor='register-email' className="mb-2 text-sm font-medium text-gray-900">Fullname</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="text" id="register-email" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Fullname..."
                value={registerData.fullname} name="fullname" onChange={handleAssignFromValue} required
              />
              {errors?.fullname && <span className='text-[12px] font-normal text-red-500'>*{errors?.fullname}</span>}
            </div>
          </div>
          {/* password */}
          <div className='mb-3'>
            <label htmlFor='register-email' className="mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="password" id="register-email" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Password..."
                value={registerData.password} name="password" onChange={handleAssignFromValue} required
              />
              {errors?.password && <span className='text-[12px] font-normal text-red-500'>*{errors?.password}</span>}
            </div>
          </div>
          {/* confirm password */}
          <div className='mb-3'>
            <label htmlFor='register-email' className="mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="password" id="register-email" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Confirm Password..."
                value={registerData.confirmPassword} name="confirmPassword" onChange={handleAssignFromValue} required
              />
              {errors?.confirmPassword && <span className='text-[12px] font-normal text-red-500'>*{errors?.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register</button>
        </form>
      </div>
    </>
  )
}
