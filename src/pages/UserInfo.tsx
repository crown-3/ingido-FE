import { FDMT } from "../components/fundamental/fundamentalComponents";
import Navbar from "../components/compound/Navbar";
import { Clear, IngidoBtn, Remove } from "../assets/icons/icons";
import AddBtn, { RemoveBtn } from "../components/compound/AddBtn";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllFriends,
  getUserInfoAPI,
  handleLogin,
  manipulateIngidoAPI,
  searchUser,
} from "../apis/api";
import { FriendInfo, userInfoAtom } from "../store";
import useInterval from "../hooks/useInterval";
import { useAtom } from "jotai";

export default function UserInfo() {
  const navigate = useNavigate();
  const [userAtom, setUserAtom] = useAtom(userInfoAtom);
  const [friendsList, setFriendsList] = useState<FriendInfo[]>([]);
  const friendsIdList = friendsList.map((i) => i.id);
  async function init() {
    const initial = await getAllFriends();
    setFriendsList(initial);
  }

  async function Auth() {
    const userInfo = await handleLogin();
    const friends = await getAllFriends();
    if (userInfo.name === "" && userInfo.tag === "") {
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

  const [targetUserInfo, setTargetUserInfo] = useState<FriendInfo>({
    name: "",
    tag: "",
    personal_color_1: "",
    personal_color_2: "",
    ingido: 0,
    id: 0,
  });
  let { id } = useParams();

  async function getUserInfoProcess() {
    const result = await getUserInfoAPI(id || "");
    switch (result.id) {
      case -1:
        alert("Error : reason not found");
        navigate(-1);
        break;
      case -2:
        alert("Error : user not found");
        navigate(-1);
        break;
      case -3:
        alert("Error : unauthorized (access token expired)");
        navigate("/");
        break;
    }
    setTargetUserInfo(result);
  }

  useEffect(() => {
    Auth();
    init();
    getUserInfoProcess();
  }, []);

  useInterval(() => {
    Auth();
    getUserInfoProcess();
  }, 500);

  return (
    <FDMT.FullPageJustifyWrap backgroundColor={targetUserInfo.personal_color_1}>
      <Navbar
        isLogin={true}
        name={userAtom.name}
        tag={userAtom.tag}
        friendNumber={userAtom.friend_number}
        p={targetUserInfo.personal_color_1}
        s={targetUserInfo.personal_color_2}
        ingido={userAtom.ingido}
        main={false}
      />
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "30px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <Clear fill={targetUserInfo.personal_color_2} size={40} />
      </div>
      <FDMT.txt.NSBoldContainer
        fontSize={35}
        color={targetUserInfo.personal_color_2}
        style={{ marginTop: "60px" }}
      >
        {targetUserInfo.name}
      </FDMT.txt.NSBoldContainer>
      <FDMT.txt.NSMediumContainer
        fontSize={20}
        color={targetUserInfo.personal_color_2}
        style={{ marginTop: "-5px" }}
      >
        #{targetUserInfo.tag}
      </FDMT.txt.NSMediumContainer>
      <div
        style={{
          width: "400px",
          borderBottom: `3px solid ${targetUserInfo.personal_color_2}`,
          marginTop: "13px",
        }}
      ></div>
      <FDMT.txt.GothamContainer
        fontSize={300}
        color={targetUserInfo.personal_color_2}
      >
        {targetUserInfo.ingido}
      </FDMT.txt.GothamContainer>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          onClick={() => {
            manipulateIngidoAPI({ userId: Number(id), ingidoAmount: -1 });
            getUserInfoProcess();
          }}
        >
          <IngidoBtn
            p={targetUserInfo.personal_color_1}
            s={targetUserInfo.personal_color_2}
            size={94}
            rotate={false}
          />
        </div>
        <div
          onClick={() => {
            manipulateIngidoAPI({ userId: Number(id), ingidoAmount: 1 });
            getUserInfoProcess();
          }}
        >
          <IngidoBtn
            p={targetUserInfo.personal_color_1}
            s={targetUserInfo.personal_color_2}
            size={94}
            rotate={true}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "-40px",
          marginLeft: "20px",
        }}
      >
        {friendsIdList.includes(Number(id)) ? (
          <>
            <RemoveBtn
              name={"친구 목록에서 제거하기"}
              tag={""}
              p={targetUserInfo.personal_color_1}
              s={targetUserInfo.personal_color_2}
            />
          </>
        ) : (
          <>
            <AddBtn
              name={"친구로 추가하기"}
              tag={""}
              p={targetUserInfo.personal_color_1}
              s={targetUserInfo.personal_color_2}
            />
          </>
        )}
      </div>
    </FDMT.FullPageJustifyWrap>
  );
}
