import * as wagmi from "wagmi";
import {useProvider,useSigner} from "wagmi";
import type {BigNumber} from "ethers";

import SuperstreamContract from "../artifacts/contracts/Superstream.sol/Superstream.json"

type Livestream = {
  streamId: string
  streamKey: string,
  creator_address: string,
  // scheduled_at: BigNumber
}

const useSuperstreamContract = () => {
  const [signer] = useSigner();
  const provider = useProvider();
  const contract = wagmi.useContract({
    addressOrName: "0x",
    contractInterface:SuperstreamContract.abi,
    signerOrProvider: signer.data || provider
  })

  // Wrapper to add types to our functions
  const createStream = async(streamId:string,streamKey:string,creator_address:string): Promise<void> => {
      const tx = contract.createStream(streamId,streamKey,creator_address);
      await tx.wait();
  }

  const fetchStreamById =async (streamId:string)=> {
    return contract.fetchStreamById(streamId).then((livestream)=>{
      return {streamId:livestream.streamId,streamKey:livestream.streamKey,creator_address:livestream.creator_address};
    })
  }
  return {
    contract,
    chainId:contract.provider.netword?.chainId,
    createStream,
    fetchStreamById
  }
}

export default useSuperstreamContract;