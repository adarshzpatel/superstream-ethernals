import { Tab } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GiftIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import Loader from "react-spinners/SyncLoader";
import { useSigner } from "wagmi";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import useSuperstreamContract, {
  User,
} from "../../hooks/useSuperstreamContract";
import useUser from "../../hooks/useUser";

type Props = {};

const UserPage = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { query }: NextRouter = useRouter();
  const [user, setUser] = React.useState<User>();
  const [userExists, setUserExists] = React.useState<boolean>(false);
  const { usernameExists, getUserByUsername } = useSuperstreamContract();
  const [signer] = useSigner();
  const { currentUser } = useUser();

  const checkIfUserExists = async () => {
    console.log("checking if user exists");
    setLoading(true);
    try {
      if (!signer.loading && !signer.error && query.username) {
        const result = await usernameExists(query.username);
        setUserExists(result);
        console.log(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      if (query.username) {
        const userData = await getUserByUsername(query.username);
        setUser(userData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkIfUserExists();
  }, [signer]);

  React.useEffect(() => {
    if (userExists) {
      fetchUserData();
    } else {
      console.log("User does not exists!");
    }
  }, [userExists]);

  if (!userExists && !loading) {
    return (
      <div className="text-2xl p-20 text-center">
        Oops ! , The user does not exist
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid place-items-center w-full py-20">
        <Loader color="#fff" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-r from-gray-800  items-center justify-between border rounded-xl border-gray-600 p-4 ">
        <div className="flex items-center gap-4">
          <Avatar />
          <div>
            <h6 className="text-2xl font-display font-bold">
              {user?.username}
            </h6>
            <p className="text-gray-400">{user?.followers?.length} followers</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-violet-600 group hover:bg-violet-500">
            <HeartIcon className="h-5 w-5 group-hover:scale-110 group-hover:rotate-6" />
            Follow
          </button>
          <button className="bg-amber-500 group hover:bg-yellow-400">
            <GiftIcon className="h-5 w-5 group-hover:scale-110 group-hover:rotate-6" />
            Tip
          </button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default UserPage;
