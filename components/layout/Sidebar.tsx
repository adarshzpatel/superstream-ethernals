import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { JSXElementConstructor, ReactNode } from "react";
import {
  CogIcon,
  FilmIcon,
  HomeIcon,
  MusicNoteIcon,
  PuzzleIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import FollowedUsers from "./FollowedUsers";
type Props = {};

type SidebarItem = {
  name: string;
  href: string;
  icon: JSXElementConstructor<"svg">;
};

const GameIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
    <title>Game Controller</title>
    <path
      d="M467.51 248.83c-18.4-83.18-45.69-136.24-89.43-149.17A91.5 91.5 0 00352 96c-26.89 0-48.11 16-96 16s-69.15-16-96-16a99.09 99.09 0 00-27.2 3.66C89 112.59 61.94 165.7 43.33 248.83c-19 84.91-15.56 152 21.58 164.88 26 9 49.25-9.61 71.27-37 25-31.2 55.79-40.8 119.82-40.8s93.62 9.6 118.66 40.8c22 27.41 46.11 45.79 71.42 37.16 41.02-14.01 40.44-79.13 21.43-165.04z"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={32}
    />
    <circle fill="currentColor" cx={292} cy={224} r={20} />
    <path
      fill="currentColor"
      d="M336 288a20 20 0 1120-19.95A20 20 0 01336 288z"
    />
    <circle fill="currentColor" cx={336} cy={180} r={20} />
    <circle fill="currentColor" cx={380} cy={224} r={20} />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M160 176v96M208 224h-96"
    />
  </svg>
);

const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: CogIcon,
  },
  {
    name: "My Videos",
    href: "/my-videos",
    icon: VideoCameraIcon,
  },
];

const Sidebar = (props: Props) => {
  const router: NextRouter = useRouter();

  return (
    <div className=" fixed bg-gray-900 py-3 h-full border-r w-60 border-gray-600">
      <div className="flex flex-col">
        {sidebarItems.map((item) =>
          item.href === router.pathname ? (
            <div key={item.href} className="flex cursor-pointer duration-200 tracking-wider font-medium font-display ease-out items-center px-4 py-2   w-full text-violet-100  gap-3">
              <item.icon className="h-7 w-7 stroke-current " />
              {item.name}
            </div>
          ) : (
            <Link href={item.href} key={item.href}>
              <a className="flex duration-200 font-medium tracking-wider group font-display ease-out items-center px-4 py-2  w-full text-slate-500   hover:bg-gray-800 hover:text-violet-100  gap-3">
                <item.icon className="h-7 w-7 stroke-current group-hover:rotate-6 duration-200 ease-out" />
                {item.name}
              </a>
            </Link>
          )
        )}
        <FollowedUsers/>
      </div>
    </div>
  );
};

export default Sidebar;
