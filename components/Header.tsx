import { Menu } from "@headlessui/react";
import { LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import {
  defaultL2Chains,
  InjectedConnector,
  useAccount,
  useConnect,
} from "wagmi";
import useSuperstreamContract from "../hooks/useSuperstreamContract";
import useUser from "../hooks/useUser";
import Copyable from "./Copyable";
import CreateUser from "./CreateUser";
type Props = {};

const connector = new InjectedConnector({
  chains: defaultL2Chains,
  options: {
    shimDisconnect: true,
  },
});


const Brand = () => (
  <div className="flex gap-2 items-center">
    <img src="/logo.svg" />
    <h1 className="font-display font-bold text-2xl">Super Stream</h1>
  </div>
);
const Header = (props: Props) => {
  const [user, setUser] = React.useState<any>("");
  const [isCreateUserOpen, setIsCreateUserOpen] =
    React.useState<boolean>(false);
  const [{ data: connectData,loading:connectLoading ,error: connectError }, connect] =
    useConnect();
  const [{ data: accountData ,loading:accountLoading,error:accountError} , disconnect] = useAccount();
  const { currentUser, addressHasAccount,checkIfAddressHasAccount,getUserData } = useUser();

  const parseAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-5, -1);
  };

  const showCreateAccountModal = () => {
    if(!accountLoading && !connectLoading && !connectError && !accountError){
      if(!addressHasAccount) {
        setIsCreateUserOpen(true);
      } else {
        setIsCreateUserOpen(false);
      }
    }
  };

  React.useEffect(() => {
    showCreateAccountModal;
  }, [addressHasAccount]);

  const handleConnect = async () => {
      await connect(connector);
      await checkIfAddressHasAccount();
      await getUserData();
  }

  return (
    <>
      <CreateUser isOpen={isCreateUserOpen} setIsOpen={setIsCreateUserOpen} />
      <header className="sticky z-10 bg-gray-900 top-0 left-0 border-b border-gray-700">
        <nav className="p-4 flex justify-between">
          <Brand />
          <div className="flex gap-4">
            <button

              onClick={handleConnect}
              className="bg-violet-600 hover:bg-violet-500 active:scale-95"
            >
              {accountData && !addressHasAccount && 
                <Copyable
                  copyText={accountData.address}
                  text={parseAddress(accountData.address)}
                />}
              {addressHasAccount && (<>
                <UserCircleIcon className="h-6 w-6"/>
                {currentUser?.username}
              </>
              )}
              {!accountData && "Connect wallet"}

            </button>
  
                <button
                  onClick={disconnect}
                  className="bg-rose-900 bg-opacity-25 hover:bg-opacity-50 text-rose-300"
                >
                  <LogoutIcon className="h-5 w-5" /> Disconnect
                </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
