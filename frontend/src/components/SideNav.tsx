import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries/GetUsers';
import MenuItemFollow from './MenuItemFollow';
export default function SideNav() {
  const { data, loading, fetchMore } = useQuery(GET_USER, {});
  const [showAllUsers, setShowAllUsers] = useState(false);
  const displayUsers = showAllUsers ? data?.getUsers : data?.getUsers.slice(0, 3);
  const location = useLocation();
  return (
    <div
      id="SideNavMain"
      className={["lg:w-[310px] fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r  overflow-auto"].join(" ")}
    >
      <div className='lg:w-full w-[55px] mx-auto'>
        <Link to="/">
          <MenuItem
            icon="For you"
            color="#F02C56"
            size="30"
          />
        </Link>
        <MenuItem
          icon="Following"
          color="#000000"
          size="27"
        />
        <MenuItem icon="LIVE" color="#000000" size="27" />
        <div className="border-b lg:ml-2 mt-2" />
        <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          Suggested accounts
        </div>
        <div className="lg:hidden block pt-3" />
        <ul>
          {displayUsers?.map((user: any) => (
            <li className="cursor-pointer" key={user.id}>
              <MenuItemFollow user={user} />
            </li>
          ))}
        </ul>
        {
          displayUsers?.length > 5 ? <button
            onClick={() => setShowAllUsers(!showAllUsers)}
            className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
          >
            See more
          </button> : <></>
        }

        <div className="lg:block hidden border-b lg:ml-2 mt-2" />
        <div className="lg:block hidden text-[11px] text-gray-500">
          <div className="pt-4 px-2">
            About Newsroom TikTok Shop Contact Careers ByteDance
          </div>
          <div className="pt-4 px-2">
            TikTok for Good Advertise Developers Transperancy TikTok Rewards
            TikTok Browse TikTok
          </div>
          <div className="pt-4 px-2">2023 TikTok</div>
          <div className="pb-14"></div>
        </div>
      </div>
    </div>
  )
}
