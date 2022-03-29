import { NextPage } from "next";
import Reactfrom from "react";
import SessionDetails from "../components/dashboard/SessionDetails";
import StreamDetails from "../components/dashboard/StreamDetails";

type Props = {};

const dashboard: NextPage = (props: Props) => {

  return (
    <div className="lg:px-4">
      <h1 className="text-3xl  font-display">Dashboard  </h1>
      <hr className="border-gray-600 my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StreamDetails/>
      <SessionDetails  />
      </div>
    </div>
  );
};
export default dashboard;
