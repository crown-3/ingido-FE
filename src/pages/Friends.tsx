import { FDMT } from "../components/fundamental/fundamentalComponents";
import Navbar from "../components/compound/Navbar";
import AddBtn from "../components/compound/AddBtn";
import { RoundInput } from "../components/compound/GeneralInputs";
import { Search } from "../assets/icons/icons";
import FriendComp from "../components/compound/FriendComp";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { FriendInfo, SearchUser, userInfoAtom } from "../store";
import {
  addFriendAPI,
  getAllFriends,
  handleLogin,
  searchUser,
} from "../apis/api";
import React, { ChangeEvent, useEffect, useState } from "react";
import useInterval from "../hooks/useInterval";
import useDebounce from "../hooks/useDebounce";

export default function Friends() {
  const navigate = useNavigate();
  const [userAtom, setUserAtom] = useAtom(userInfoAtom);
  const [friendsList, setFriendsList] = useState<FriendInfo[]>([]);
  async function init() {
    const initial = await getAllFriends();
    setFriendsList(initial);
  }

  async function Auth() {
    const userInfo = await handleLogin();
    const friends = await getAllFriends();
    if (userInfo.name === "" && userInfo.tag === "") {
      alert("Login Expired. Going back to login.");
      navigate("/");
    } else {
      setUserAtom({
        name: userInfo.name,
        tag: userInfo.tag,
        personal_color_1: userInfo.personal_color_1,
        personal_color_2: userInfo.personal_color_2,
        ingido: userInfo.ingido,
        friend_number: friends.length,
      });
    }
  }
  useEffect(() => {
    Auth();
    init();
  }, []);

  useInterval(() => {
    Auth();
  }, 2000);

  const [query, setQuery] = useState("");
  const [searchedList, setSearchedList] = useState<SearchUser[]>([]);
  const debouncedQuery = useDebounce<string>(query, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    searchUser(debouncedQuery).then((res) => setSearchedList(res));
  }, [debouncedQuery]);

  async function AddFriend(targetId: number) {
    const result = await addFriendAPI(targetId);
    if (result === "ITSELF") {
      alert("You are already a friend of yourself ^v^");
    }
    if (result === "EXIST") {
      alert("They are already friends of you!");
    }
    Auth();
    init();
  }

  return (
    <>
      <FDMT.FullPageWrap backgroundColor={userAtom.personal_color_1}>
        <Navbar
          isLogin={true}
          name={userAtom.name}
          tag={userAtom.tag}
          friendNumber={userAtom.friend_number}
          p={userAtom.personal_color_1}
          s={userAtom.personal_color_2}
          ingido={userAtom.ingido}
          main={false}
        />
        <FDMT.txt.GothamContainer
          fontSize={150}
          color={userAtom.personal_color_2}
          style={{
            marginLeft: "50px",
            marginTop: "20px",
          }}
        >
          {userAtom.friend_number} FRIENDS
        </FDMT.txt.GothamContainer>
        <div
          style={{
            marginLeft: "50px",
            display: "flex",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <div
            style={{
              height: "50px",
              display: "flex",
            }}
          >
            <RoundInput
              p={userAtom.personal_color_1}
              s={userAtom.personal_color_2}
              placeholder={"유저명#태그로 검색"}
              onChange={handleChange}
            />
            <div
              style={{
                height: "50px",
                borderRadius: "0 30px 30px 0",
                width: "30px",
                backgroundColor: userAtom.personal_color_2,
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
                marginRight: "20px",
              }}
            >
              <Search fill={userAtom.personal_color_1} size={40} />
            </div>
          </div>
          {searchedList.length === 0
            ? null
            : searchedList.map((i) => {
                const nameTagSplit = i.nametag.split("#");
                return (
                  <div
                    key={i.id}
                    onClick={() => {
                      AddFriend(i.id);
                    }}
                  >
                    <AddBtn
                      name={nameTagSplit[0]}
                      tag={"#" + nameTagSplit[1]}
                      p={userAtom.personal_color_1}
                      s={userAtom.personal_color_2}
                    />
                  </div>
                );
              })}
        </div>
        <FDMT.txt.NSRegularContainer
          fontSize={12}
          color={userAtom.personal_color_2}
          style={{ marginLeft: "50px", marginTop: "6px" }}
        >
          Shift + Scroll to Scroll Horizontally
        </FDMT.txt.NSRegularContainer>
        <div
          style={{
            paddingLeft: "50px",
            paddingTop: "30px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {friendsList.map((i) => (
            <div
              key={i.id}
              onClick={() => {
                navigate(`/userinfo/${i.id}`);
              }}
            >
              <FriendComp
                key={i.id}
                targetUserColor={i.personal_color_1}
                name={i.name}
                tag={i.tag}
                targetIngido={i.ingido}
                p={userAtom.personal_color_1}
                s={userAtom.personal_color_2}
              />
            </div>
          ))}
        </div>
      </FDMT.FullPageWrap>
    </>
  );
}
