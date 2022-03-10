import { LogoutIcon } from "@heroicons/react/outline";
import React from "react";
import { InjectedConnector, useAccount, useConnect } from "wagmi";
type Props = {};

const connector = new InjectedConnector({
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
  const [{ data: connectData,loading, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  return (
    <header className="sticky z-10 bg-gray-900 top-0 left-0 border-b border-gray-700">
      <nav className="p-4 flex justify-between">
        <Brand />

        <div className="flex gap-4">
          <button
            onClick={() => connect(connector)}
            className="bg-purple-500 hover:bg-purple-400 active:scale-95"
          >
            {accountData ? accountData.address.slice(0, 6) + "..." + accountData.address.slice(-5, -1): "Connect Wallet"}
          </button>
            {accountData && <button onClick={disconnect} className="bg-rose-600 hover:bg-rose-500">
              <LogoutIcon className="h-5 w-5"/> Disconnect
            </button>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
