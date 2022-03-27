
import React, { useState } from "react";
import {useAddress} from "@thirdweb-dev/react"
import UserMenu from "./UserMenu";
import ConnectMetamask from "./ConnectMetamask"
import {  useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/states";
import Link from "next/link";


const Header = ()=> {
  const currentUserAddress = useAddress();

  const currentUser = useRecoilValue(currentUserState);


  return (
    <>
      <header className="sticky z-10  bg-gray-900 top-0 left-0 border-b border-gray-700">
        <nav className="py-3 px-4 flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl pl-16">Super Stream</h1>
          <div className="flex gap-3 items-center ">
          {!currentUser.loading && !currentUser.hasProfile && (
            <Link href='/signup'>
              <button className="bg-violet-600 hover:bg-violet-500">Create Profile</button>
            </Link>
          )}
          {!currentUserAddress && !currentUser.data ? <ConnectMetamask/> : <UserMenu />  }
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
