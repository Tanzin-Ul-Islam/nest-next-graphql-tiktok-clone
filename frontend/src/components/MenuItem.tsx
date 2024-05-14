import React from 'react';
import { IconType } from "react-icons"
import { AiFillHome } from 'react-icons/ai';
import { BiGroup } from "react-icons/bi"
import { RiLiveLine } from "react-icons/ri"
interface IconComponent {
  icon: string,
  color: string,
  size: string,
}
export default function MenuItem({ icon, color, size }: IconComponent) {
  let Icon: IconType | null = null;
  if (icon === "For you") Icon = AiFillHome;
  if (icon === "Following") Icon = BiGroup;
  if (icon === "LIVE") Icon = RiLiveLine;
  return (
    <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
      <div className="flex items-center lg:mx-0 mx-auto">
        {Icon && <Icon color={color} size={parseInt(size, 10)} />}
        <span
          className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${color}]`}
        >
          {icon}
        </span>
      </div>
    </div>
  )
}
