import { atom, useAtom } from "jotai";

export interface UserInfo {
  name: string;
  tag: string;
  password: string;
  personal_color_1: string;
  personal_color_2: string;
}

export interface LoginInfo {
  accessToken: string;
}

export interface UserInfoAuth {
  name: string;
  tag: string;
  personal_color_1: string;
  personal_color_2: string;
  ingido: number;
  friend_number: number;
}

export interface FriendInfo {
  id: number;
  name: string;
  tag: string;
  personal_color_1: string;
  personal_color_2: string;
  ingido: number;
}

export interface SearchUser {
  nametag: string;
  id: number;
}

export const userInfoAtom = atom<UserInfoAuth>({
  name: "",
  tag: "",
  personal_color_1: "",
  personal_color_2: "",
  ingido: 0,
  friend_number: 0,
});
