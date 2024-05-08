import React, { ReactNode, useEffect } from 'react'
import { useUserStore } from '../store/user.store'
import { useNavigate } from 'react-router-dom';
import { useGeneralStore } from '../store/general.store';

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const user = useUserStore((state) => state);
  const navigate = useNavigate();
  const { setLoginIsOpen } = useGeneralStore((state) => state);
  useEffect(()=> {
    if(!user.id){
      navigate("/");
      setLoginIsOpen(true);
    }
  }, [user.id, navigate, setLoginIsOpen])
  if(!user.id){
    return (
      <div>No Access</div>
    )
  }
  return(
    <>{children}</>
  )
}
