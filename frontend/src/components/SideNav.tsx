import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries/GetUsers';
export default function SideNav() {
  const { data, loading, fetchMore } = useQuery(GET_USER, {});
  const [showAllUsers, setShowAllUsers] = useState(false);
  const displayUsers = showAllUsers ? data?.getUsers : data?.getUsers.slice(0, 3);
  const location = useLocation();
  return (
    <div
      id="SideNavMain"
      className={[
        location.pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]",
        "fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r  overflow-auto",
      ].join(" ")}
    >
      SideNav
    </div>
  )
}
