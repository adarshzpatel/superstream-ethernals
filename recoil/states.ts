import { NFTMetadata } from "@thirdweb-dev/sdk";
import { atom } from "recoil";

type AppUserState = {
  data?:NFTMetadata
  loading:boolean,
  hasProfile:boolean
}


export const videosListState = atom(
  {
    key:'videos',
    default:[]
  }
)

export const currentUserState = atom<AppUserState>({
	key:'currentUser',
  default:{loading:true,hasProfile:false}
})

export const currentUserStream = atom({
  key:'currentUserStream',
  default:{}
})