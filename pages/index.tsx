import React, { FormEventHandler } from "react";
import Header from "../components/Header";
import { PlusIcon } from "@heroicons/react/outline";

import { updateStream } from "../redux/stream/streamSlice";
import { createStream } from "../utils/livepeerApi";
import VideoJs from "../components/VideoJS";
import { selectLoadingState, setLoading } from "../redux/app/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Layout from "../components/Layout";

type Props = {};

const Home = (props: Props) => {
  const loading = useAppSelector(selectLoadingState);
  const [streamData, setStreamData] = React.useState<any>({});
  const [hasStream, setHasStream] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleCreateStream: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { streamName }: any = e.target;
    if (streamName != "") {
      dispatch(setLoading(true));
      try {
        const response = await createStream(streamName.value);
        setStreamData(response.data);
        setHasStream(true);
        dispatch(
          updateStream({
            playbackId: response.data.playbackId,
            streamKey: response.data.streamKey,
            streamIsActive: response.data.isActive,
          })
        );
        console.log(response);
      } catch (e) {
        console.error(e);
      }
      dispatch(setLoading(false));
    }
  };
  return <Layout>
        <div>
        Hello this is homepage
        </div>
    </Layout>;
};

export default Home;
