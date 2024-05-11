import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LoginUserMutation } from '../gql/graphql';
import { LOGIN_USER } from '../graphql/mutation/Login';
import { GraphQLErrorExtensions } from 'graphql';
import { useUserStore } from '../store/user.store';
import { useGeneralStore } from '../store/general.store';
import { SweetAlertToast } from "../sweetAlert/toast";

export default function Login() {
  const [loginUser] = useMutation<LoginUserMutation>(LOGIN_USER);
  const [errors, setErrors]: any = useState<GraphQLErrorExtensions>({});
  const { setUser } = useUserStore();
  const { setLoginIsOpen } = useGeneralStore()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  function handleAssignFromValue(e: any) {
    setLoginData((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  function validateForm() {
    if (!loginData.email) {
      SweetAlertToast('error', "Email required.");
      return false;
    }
    else if (!loginData.password) {
      SweetAlertToast('error', "Password required.");
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
      const response = await loginUser({
        variables: {
          email: loginData.email,
          password: loginData.password,
        }
      })
      if (response?.data?.login.user) {
        const userData = response?.data?.login.user;
        setUser({
          id: userData?.id,
          email: userData?.email,
          fullname: userData?.fullname,
          bio: "",
          image: "",
        })
        setLoginIsOpen(false);
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

  useEffect(() => {
    if (errors?.invalidCredentials) {
      SweetAlertToast('error', errors?.invalidCredentials)
    }
  }, [errors])

  return (
    <>
      <div className='text-center text-[28px] mb-4 font-bold'>Sign In</div>
      <div className='px-6 pb-2'>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
          {/* email */}
          <div className='mb-3'>
            <label htmlFor='register-email' className="mb-2 text-sm font-medium text-gray-900">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="email" id="register-email" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Email..."
                value={loginData.email} name="email" onChange={handleAssignFromValue} required
              />
              {errors?.email && <span className='text-[12px] font-normal text-red-500'>*{errors?.email}</span>}
            </div>
          </div>
          {/* password */}
          <div className='mb-3'>
            <label htmlFor='register-email' className="mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="password" id="register-email" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Password..."
                value={loginData.password} name="password" onChange={handleAssignFromValue} required
              />
              {errors?.password && <span className='text-[12px] font-normal text-red-500'>*{errors?.password}</span>}
            </div>
          </div>


          <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register</button>
        </form>
      </div>
    </>
  )
}
