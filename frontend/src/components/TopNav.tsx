import React, { useState } from 'react'
import tikTokLogo from "../assets/images/tiktok-logo.png";
import { useGeneralStore } from '../store/general.store';
import { useUserStore } from '../store/user.store';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../graphql/mutation/Logout';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineFileSearch, AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai';
import { BsFillPersonFill, BsFillSendFill, BsThreeDotsVertical } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
export default function TopNav() {
    const { isLoginOpen, setLoginIsOpen } = useGeneralStore();
    const user = useUserStore();
    const { setUser, logout } = useUserStore();
    const [showMenu, setShowMenu] = useState(false)
    const [logoutUser] = useMutation(LOGOUT_USER);
    const location = useLocation();
    async function handleLogout() {
        try {
            await logoutUser();
            logout();
            setLoginIsOpen(true);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div
            id="TopNav"
            className="bg-white fixed z-30 flex items-center w-full border-b h-[61px]"
        >
            <div
                className={[
                    "max-w-[1150px] flex items-center justify-between w-full px-6 mx-auto",
                ].join(" ")}
            >
                <div className={"w-[80%]"}>
                    <Link to="/">
                        <img
                            src={tikTokLogo}
                            width={"100"}
                            height={"100"}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="hidden md:flex items-center bg-[#F1F1F1] p-1 rounded-full max-w-[380px] w-full">
                    <input
                        type="text"
                        className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
                        placeholder="Search accounts"
                    />
                    <div className="px-3 py-1 flex items-center border-l border-l-gray-3">
                        <AiOutlineSearch size="20" color="#838383" />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full">

                    {location.pathname === "/" ? (
                        <Link
                            to="/upload"
                            className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                        >
                            <AiOutlineUpload size="20" color="#161724" />
                            <span className="px-2 font-medium text-[15px] text-[#161724]">
                                Upload
                            </span>
                        </Link>
                    ) : (
                        <Link
                            to="/"
                            className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                        >
                            <AiOutlineFileSearch size="20" color="#161724" />
                            <span className="px-2 font-medium text-[15px] text-[#161724]">
                                Feed
                            </span>
                        </Link>
                    )}
                    {!user.id ? (
                        <div className="flex items-center">
                            <button
                                onClick={() => setLoginIsOpen(true)}
                                className="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px] min-w-[110px]"
                            >
                                <span className="mx-4 font-medium text-[15px]">Log In</span>
                            </button>
                            <BsThreeDotsVertical size="25" color="#161724" />
                        </div>
                    ) :
                        (
                            <div className="flex items-center">
                                <BsFillSendFill className='m-2' size="25" color="#161724" />
                                <BiMessageDetail className='m-2' size="25" color="#161724" />
                                <div className="relative m-2">
                                    <button className="mt-1" onClick={() => setShowMenu(!showMenu)}>
                                        <img
                                            className="rounded-full"
                                            width="33"
                                            src={
                                                !user.image
                                                    ? "https://picsum.photos/id/83/300/320"
                                                    : user.image
                                            }
                                        />
                                    </button>
                                    {showMenu && (
                                        <div
                                            id="PopupMenu"
                                            className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
                                        >
                                            <Link
                                                onClick={() => setShowMenu(!showMenu)}
                                                to={"/profile/" + user.id}
                                                className="flex flex-col px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                {" "}
                                                <BsFillPersonFill size="20" color="#161724" />
                                                <span className="font-semibold text-sm">Profile</span>
                                            </Link>
                                            {user.id && (
                                                <div
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <GrLogout size="20" color="#161724" />
                                                    <span className=" font-semibold text-sm">Log out</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
