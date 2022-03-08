import { ethers, Signer } from "ethers";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentAccount, walletConnected } from "../redux/app/appSlice";

type Props = {};

const networks = {
  "0x1": "Ethereum Mainnet",
  "0x3": "Ropsten",
  "0x2a": "Kovan",
  "0x4": "Rinkeby",
  "0x5": "Goerli",
  "0x61": "BSC Testnet",
  "0x38": "BSC Mainnet",
  "0x89": "Polygon Mainnet",
  "0x13881": "Polygon Testnet",
  "0xa86a": "AVAX Mainnet",
};

const Header = (props: Props) => {
  const currentAccount = useAppSelector(selectCurrentAccount);
  const dispatch = useAppDispatch();
  const [network,setNetwork] = React.useState<string>('');
  const checkIfWalletIsConnected = async () => {
		const { ethereum }:any = window;

		if (!ethereum) {
			console.log('Make sure you have metamask!');
			return;
		} else {
			console.log('We have the ethereum object', ethereum);
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			dispatch(walletConnected(account));
		} else {
			console.log('No authorized account found');
		}

    const chainId = await ethereum.request({ method: "eth_chainId" });
    setNetwork(networks[chainId]);
    ethereum.on("chainChanged", ()=> window.location.reload());
    ethereum.on('accountsChanged', (accounts) => {
      window.location.reload();
    });
    ethereum.on('disconnect',()=> window.location.reload());
	};

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      //fetch the account from metamask
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected to ", accounts[0]);
      dispatch(walletConnected(accounts[0]));
    } catch (err) {
      if (err.code === 4001) {
        alert("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  };

  React.useEffect(()=>{
    checkIfWalletIsConnected();
  },[currentAccount])

  return (
    <header className="w-full border-b border-gray-700">
      <nav className="p-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-violet-100">
          Super Stream
        </h1>
        <div>
          <button className="bg-violet-900 bg-opacity-30 hover:bg-opacity-50 text-violet-400">
            {network}
          </button>
          <button
            onClick={connectWallet}
            className="bg-violet-500 hover:bg-violet-400 ml-4 "
          >
            {currentAccount
              ? currentAccount.slice(0, 6) + "..." + currentAccount.slice(-5, -1)
              : "Connect Wallet"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
