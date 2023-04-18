import axios, {isAxiosError} from "axios";
import {
  FriendInfo,
  LoginInfo,
  SearchUser,
  UserInfo,
  UserInfoAuth,
} from "../store";
const url = "http://localhost:3001";

interface AxiosPostResType {
  wellCreated: boolean;
}

export const signUpAPI = async (userInfo: UserInfo): Promise<boolean> => {
  try {
    const { status, statusText } = await axios.post<UserInfo>(
      `${url}/auth/signup`,
      {
        name: userInfo.name,
        tag: userInfo.tag,
        password: userInfo.password,
        personal_color_1: userInfo.personal_color_1,
        personal_color_2: userInfo.personal_color_2,
      }
    );
    return status === 201;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { response } = err;
    }
    return false;
  }
};

interface ILogin {
  name: string;
  tag: string;
  password: string;
}
export const loginAPI = async ({
  name,
  tag,
  password,
}: ILogin): Promise<string> => {
  try {
    const { data } = await axios.post<LoginInfo>(`${url}/auth/signin`, {
      name,
      tag,
      password,
    });
    if (data.accessToken) {
      return data.accessToken;
    } else {
      return "";
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { response } = err;
      if (response?.data.message === "Login failed : password not correct") {
        return "PWERR";
      }
      if (
        response?.data.message ===
        "Login failed : name and tag combination not found"
      ) {
        return "USTERR";
      }
    }
    return "";
  }
};

export const getAllFriends = async (): Promise<FriendInfo[]> => {
  const token = localStorage.getItem("accessToken");
  const { status, statusText, data } = await axios.get<FriendInfo[]>(
    `${url}/user/get_all_friends`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const addFriendAPI = async (targetId: number): Promise<string> => {
  try {
    const token = localStorage.getItem("accessToken");
    const { status, statusText } = await axios.post(
      `${url}/user/add_friend/${targetId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (status === 201) {
      return "";
    } else {
      return "ERR";
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { response } = err;
      if (
        response?.data.message === "This friend relationship already exists"
      ) {
        return "EXIST";
      }
      if (response?.data.message === "Cannot add itself a friend") {
        return "ITSELF";
      }
    }
    return "ERR";
  }
};

export const getUserInfoAPI = async (targetId: string): Promise<FriendInfo> => {
  try {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.get<FriendInfo>(
      `${url}/user/get_user_info/${targetId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { response } = err;
      if (response?.data.message === `User id ${targetId} not found`) {
        return {
          id: -2,
          name: "",
          tag: "",
          personal_color_1: "",
          personal_color_2: "",
          ingido: 0,
        };
      }
      if (response?.status === 401) {
        return {
          id: -3,
          name: "",
          tag: "",
          personal_color_1: "",
          personal_color_2: "",
          ingido: 0,
        };
      }
      return {
        id: -1,
        name: "",
        tag: "",
        personal_color_1: "",
        personal_color_2: "",
        ingido: 0,
      };
    }
    return {
      id: -1,
      name: "",
      tag: "",
      personal_color_1: "",
      personal_color_2: "",
      ingido: 0,
    };
  }
};

interface ManipulateIngido {
  userId: number;
  ingidoAmount: number;
}
export const manipulateIngidoAPI = async (
  mani: ManipulateIngido
): Promise<string> => {
  try {
    const token = localStorage.getItem("accessToken");
    const { status, statusText } = await axios.patch(
      `${url}/user/ingido/${mani.userId}`,
      { ingidoAmount: mani.ingidoAmount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(status);
    return "";
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const deleteFriend = async (targerUserId: number): Promise<string> => {
  try {
    const token = localStorage.getItem("accessToken");
    const { status, statusText } = await axios.delete(
      `${url}/user/delete_friend/${targerUserId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(status === 200) {
      return ""
    }
    return "ERR"
  } catch (err) {
    if(isAxiosError(err)) {
      const {response} = err;

    }

  }
};

export const manageProfile = async (userInfo: UserInfo): Promise<string> => {
  try {
    const token = localStorage.getItem("accessToken");
    const { status, statusText } = await axios.patch<UserInfo>(
      `${url}/auth/update_user_info`,
      {
        name: userInfo.name,
        tag: userInfo.tag,
        password: userInfo.password,
        personal_color_1: userInfo.personal_color_1,
        personal_color_2: userInfo.personal_color_2,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const newAccessToken = await loginAPI({
      name: userInfo.name,
      tag: userInfo.tag,
      password: userInfo.password,
    });
    localStorage.setItem("accessToken", newAccessToken);
    return "";
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { response } = err;
      if (response?.data.message === "Patch failed : password not correct") {
        return "PWERR";
      }
      if (response?.data.message === "Tag already exists") {
        return "TAGDUP";
      }
    }
    return "ERR";
  }
};

export const searchUser = async (
  searchQuery: string
): Promise<SearchUser[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.get<SearchUser[]>(
      `${url}/user/search_user/${searchQuery}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (err) {
    return [];
  }
};

export const handleLogin = async (): Promise<UserInfoAuth> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 토큰이 로컬스토리지에 존재하지 않을 때 -> 로그인 창으로 돌려보냄, 리턴 값은 모두 empty string으로
      return {
        name: "",
        tag: "",
        personal_color_1: "",
        personal_color_2: "",
        ingido: 0,
        friend_number: 0,
      };
    } else {
      // 토큰이 존재하면 -> 받아와서 유저 정보를 리턴해줌
      const { data } = await axios.get<UserInfoAuth>(
        `${url}/user/get_user_auth`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const friends = await getAllFriends();
      return {
        name: data.name,
        tag: data.tag,
        personal_color_1: data.personal_color_1,
        personal_color_2: data.personal_color_2,
        ingido: data.ingido,
        friend_number: friends.length,
      };
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
    }

    return {
      name: "",
      tag: "",
      personal_color_1: "",
      personal_color_2: "",
      ingido: 0,
      friend_number: 0,
    };
  }
};
