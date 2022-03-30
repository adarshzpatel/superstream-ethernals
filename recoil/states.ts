import { atom } from "recoil";

type Profile = {
  id: number;
  username: string;
  bio: string;
  pfp: string;
  streamId: string;
  defaultTitle: string;
  defaultThumbnail: string;
  followers: string[];
  follows: string[];
  owner: string;
};

type AppUserState = {
  profile?: Profile;
  loading: boolean;
  hasProfile: boolean;
};




export const videosListState = atom({
  key: "videos",
  default: [],
});

export const currentUserState = atom<AppUserState>({
  key: "currentUser",
  default: { loading: true, hasProfile: false },
});

export const currentUserStream = atom({
  key: "currentUserStream",
  default: {},
});
