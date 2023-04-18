import { FDMT } from "../components/fundamental/fundamentalComponents";
import Navbar from "../components/compound/Navbar";
import { getAllFriends, handleLogin } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import { useEffect, useState } from "react";
import useInterval from "../hooks/useInterval";

export default function Main() {
  const navigate = useNavigate();
  const [userAtom, setUserAtom] = useAtom(userInfoAtom);
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
  useEffect(() => {
    Auth();
  }, []);

  useInterval(() => {
    Auth();
  }, 1000);

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
          main={true}
        />
        <FDMT.txt.GothamContainer
          fontSize={400}
          color={userAtom.personal_color_2}
          style={{
            marginLeft: "50px",
            marginTop: "20px",
          }}
        >
          {userAtom.ingido}
        </FDMT.txt.GothamContainer>
        <FDMT.txt.GothamContainer
          fontSize={160}
          color={userAtom.personal_color_2}
          style={{
            marginLeft: "50px",
            position: "relative",
            top: "-90px",
          }}
        >
          INGIDO
        </FDMT.txt.GothamContainer>
        <FDMT.txt.NSBlackContainer
          fontSize={35}
          color={userAtom.personal_color_2}
          style={{
            marginLeft: "50px",
            position: "relative",
            top: "-120px",
          }}
        >
          [ 인기도 ] : 人氣度
        </FDMT.txt.NSBlackContainer>
        <div
          style={{
            marginLeft: "50px",
            position: "relative",
            top: "-115px",
            display: "flex",
          }}
        >
          <FDMT.txt.NSBlackContainer
            fontSize={20}
            color={userAtom.personal_color_2}
          >
            명사
          </FDMT.txt.NSBlackContainer>
          <div
            style={{
              borderLeft: `1.5px solid ${userAtom.personal_color_2}`,
              margin: "0 15px",
              height: "21px",
              position: "relative",
              top: "5px",
            }}
          ></div>
          <FDMT.txt.NSRegularContainer
            fontSize={20}
            color={userAtom.personal_color_2}
          >
            어떤 대상에 대한 사람들의 좋은 평판의 정도.{" "}
          </FDMT.txt.NSRegularContainer>
          <FDMT.txt.NSRegularContainer
            fontSize={10}
            color={userAtom.personal_color_2}
            style={{ position: "fixed", bottom: "40px" }}
          >
            ⓒ 2023. Lee Jeongwoo all rights reserved.
          </FDMT.txt.NSRegularContainer>
        </div>
      </FDMT.FullPageWrap>
    </>
  );
}
