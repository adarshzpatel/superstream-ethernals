import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { JSXElementConstructor, ReactNode } from "react";
import { CogIcon, FilmIcon, HomeIcon, MusicNoteIcon, PuzzleIcon } from "@heroicons/react/outline";
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
  <circle cx={292} cy={224} r={20} />
  <path d="M336 288a20 20 0 1120-19.95A20 20 0 01336 288z" />
  <circle cx={336} cy={180} r={20} />
  <circle cx={380} cy={224} r={20} />
  <path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={32}
    d="M160 176v96M208 224h-96"
  />
</svg>

)


const Sidebar = (props: Props) => {
  const router: NextRouter = useRouter();

  return (
    <div className="fixed  flex flex-col z-20 bg-gray-900 h-screen border-r border-gray-600 left-0  p-0 ">
      <div className=" m-3  ">
        <Link href="/">
          <img
            src="/logo.svg"
          alt="logo"
            className="hover:scale-110 duration-300 ease-out cursor-pointer "
          />
        </Link>
      </div>
      <div className="flex-1 m-2 gap-3 flex flex-col items-center justify-start">
        <Link href="/">
          <div className="relative group hover:bg-gray-800 group cursor-pointer flex p-2 rounded-md duration-200 ease-out">
            <HomeIcon className="h-6 w-6 m-auto group-hover:scale-110 group-hover:text-white text-slate-400 duration-200 ease-out" />
            <div className="text-sm h-full  top-0 flex items-center absolute -right-[4.5rem]">
              <p className="px-2 font-display bg-slate-700 p-1 rounded-md opacity-0 duration-200 ease-out group-hover:opacity-100 "> Home </p>
              </div>
          </div>
        </Link>
        <Link href="/gaming">
          <div className="relative hover:bg-gray-800 group cursor-pointer flex p-2 rounded-md duration-200 ease-out">
            <GameIcon className="h-6 w-6  m-auto group-hover:scale-110 group-hover:text-white text-slate-400 fill-current duration-200 ease-out" />
          <div className="text-sm h-full  top-0 flex items-center absolute -right-[5.4rem]">
              <p className="px-2 font-display bg-slate-700 p-1 rounded-md opacity-0 duration-200 ease-out group-hover:opacity-100 "> Gaming </p>
              </div>
          </div>
        </Link>
        <Link href="/music">
          <div className="relative hover:bg-gray-800 group cursor-pointer flex p-2 rounded-md duration-200 ease-out">
            <MusicNoteIcon className="h-6 w-6  m-auto group-hover:scale-110 group-hover:text-white text-slate-400  duration-200 ease-out" />
          <div className="text-sm h-full  top-0 flex items-center absolute -right-[4.6rem]">
              <p className="px-2 font-display bg-slate-700 p-1 rounded-md opacity-0 duration-200 ease-out group-hover:opacity-100 "> Music </p>
          </div>
          </div>
        </Link>
        <Link href="/entertainment">
          <div className="relative hover:bg-gray-800 group cursor-pointer flex p-2 rounded-md duration-200 ease-out">
            <FilmIcon className="h-6 w-6  m-auto group-hover:scale-110 group-hover:text-white text-slate-400  duration-200 ease-out" />
            <div className="text-sm h-full  top-0 flex items-center justify-end  absolute -right-[8.4rem] ">
              <p className="px-2 font-display bg-slate-700 p-1 rounded-md opacity-0 duration-200 ease-out group-hover:opacity-100 "> Entertainment </p>
              </div>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className="relative hover:bg-gray-800 group cursor-pointer flex p-2 rounded-md duration-200 ease-out">
            <CogIcon className="h-6 w-6  m-auto group-hover:scale-110 group-hover:text-white text-slate-400  duration-200 ease-out" />
            <div className="text-sm h-full  top-0 flex items-center justify-end  absolute -right-[6.8rem] ">
              <p className="px-2 font-display bg-slate-700 p-1 rounded-md opacity-0 duration-200 ease-out group-hover:opacity-100 "> Dashboard </p>
              </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
