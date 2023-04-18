import { FDMT } from "../components/fundamental/fundamentalComponents";
import { CC } from "../components/fundamental/combinedComponents";
import { GeneralInput } from "../components/compound/GeneralInputs";
import React, { useEffect, useRef, useState } from "react";
import { Arrow } from "../assets/icons/icons";
import { handleLogin, manageProfile, signUpAPI } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";

export default function Profile() {
  const navigate = useNavigate();
  const [userAtom, setUserAtom] = useAtom(userInfoAtom);
  async function Auth() {
    const userInfo = await handleLogin();
    if (userInfo.name === "" && userInfo.tag === "") {
      navigate("/");
    } else {
      setUserAtom({
        ...userAtom,
        name: userInfo.name,
        tag: userInfo.tag,
        personal_color_1: userInfo.personal_color_1,
        personal_color_2: userInfo.personal_color_2,
        ingido: userInfo.ingido,
      });
    }
  }
  useEffect(() => {
    Auth();
  }, []);

  const nameRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const primRef = useRef<HTMLInputElement>(null);
  const secoRef = useRef<HTMLInputElement>(null);
  const [errLog, setErrLog] = useState<string[]>([]);
  const nameTagReg = new RegExp("^[^#]+$");
  const passwordReg = new RegExp("^[a-zA-Z0-9]*$");
  const hexReg = new RegExp("^#[0-9a-f]{3,6}$", "i");

  const setPrimColor = () => {
    if (primRef.current?.value && hexReg.test(primRef.current?.value)) {
      setUserAtom({ ...userAtom, personal_color_1: primRef.current?.value });
    } else {
      if (primRef.current?.value === "")
        setUserAtom({ ...userAtom, personal_color_1: "#A42FFF" });
      else alert("The value is not a hex value.");
    }
  };

  const setSecoColor = () => {
    if (secoRef.current?.value && hexReg.test(secoRef.current?.value)) {
      setUserAtom({ ...userAtom, personal_color_2: secoRef.current?.value });
    } else {
      if (secoRef.current?.value === "")
        setUserAtom({ ...userAtom, personal_color_2: "#FFE8F5" });
      else alert("The value is not a hex value.");
    }
  };

  const signupProcess = async (): Promise<void> => {
    const errLog: string[] = [];
    setErrLog([]);
    let process: boolean = true;

    const name = nameRef.current?.value || "";
    let tag = tagRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const personal_color_1 = primRef.current?.value || "#A42FFF";
    const personal_color_2 = secoRef.current?.value || "#FFE8F5";

    //name 검사
    if (name.length < 2 || name.length > 12) {
      process = false;
      errLog.push("Length of name must be longer than 1 and shorter than 13");
    }
    if (!nameTagReg.test(name)) {
      process = false;
      errLog.push('Name should not include "#"');
    }

    //tag 앞에 #이 있다면 그걸 빼고 검사
    if (tag[0] === "#") tag = tag.slice(1);

    if (tag.length < 2 || tag.length > 12) {
      process = false;
      errLog.push("Length of tag must be longer than 1 and shorter than 13");
    }
    if (!nameTagReg.test(tag)) {
      process = false;
      errLog.push('Tag should not include "#"');
    }

    //password 검사
    if (password.length < 4 || password.length > 20) {
      process = false;
      errLog.push(
        "Length of password must be longer than 3 and shorter than 21"
      );
    }
    if (!passwordReg.test(password)) {
      process = false;
      errLog.push("Password only accepts English and number");
    }

    //personal_color 검사
    if (!hexReg.test(personal_color_1)) {
      process = false;
      errLog.push("Primary Color is not a hex value");
    }
    if (!hexReg.test(personal_color_2)) {
      process = false;
      errLog.push("Secondary Color is not a hex value");
    }

    //process가 true인 경우만 실행
    if (process) {
      const result = await manageProfile({
        name,
        tag,
        personal_color_1: userAtom.personal_color_1,
        personal_color_2: userAtom.personal_color_2,
        password,
      });
      if (result === "ERR") {
        errLog.push("Something went wrong!");
        setErrLog(errLog);
      }
      if (result === "PWERR") {
        errLog.push("Password not correct");
        setErrLog(errLog);
      }
      if (result === "TAGDUP") {
        errLog.push("Tag already exists");
        setErrLog(errLog);
      }
      if (result === "") {
        alert("Your user information was successfully changed!");
        navigate("/main");
      }
    } else {
      setErrLog(errLog);
    }
  };

  return (
    <FDMT.FullPageJustifyWrap backgroundColor={userAtom.personal_color_2}>
      <FDMT.txt.GothamContainer
        fontSize={60}
        color={userAtom.personal_color_1}
        style={{ marginTop: "60px" }}
      >
        INGIDO
      </FDMT.txt.GothamContainer>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          signupProcess();
        }}
      >
        <div
          style={{
            display: "flex",
            width: "470px",
            justifyContent: "space-between",
            marginTop: "55px",
          }}
        >
          <div>
            <FDMT.txt.NSMediumContainer
              fontSize={16}
              color={userAtom.personal_color_1}
            >
              Username
            </FDMT.txt.NSMediumContainer>
            <GeneralInput
              p={userAtom.personal_color_1}
              s={userAtom.personal_color_2}
              placeholder={"ur name here"}
              width={225}
              type={"text"}
              ref={nameRef}
              defaultValue={userAtom.name}
            />
          </div>
          <div>
            <FDMT.txt.NSMediumContainer
              fontSize={16}
              color={userAtom.personal_color_1}
            >
              Tag
            </FDMT.txt.NSMediumContainer>
            <GeneralInput
              p={userAtom.personal_color_1}
              s={userAtom.personal_color_2}
              placeholder={"#something"}
              width={225}
              type={"text"}
              ref={tagRef}
              defaultValue={userAtom.tag}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "470px",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <div style={{ marginTop: "32px" }}>
            <FDMT.txt.NSMediumContainer
              fontSize={16}
              color={userAtom.personal_color_1}
            >
              Primary Color (HEX)
            </FDMT.txt.NSMediumContainer>
            <div
              style={{
                display: "flex",
              }}
            >
              <GeneralInput
                p={userAtom.personal_color_1}
                s={userAtom.personal_color_2}
                placeholder={"Default : #A42FFF"}
                width={185}
                type={"text"}
                ref={primRef}
                defaultValue={userAtom.personal_color_1}
              />
              <div
                style={{
                  height: "43px",
                  borderBottom: `1.5px solid ${userAtom.personal_color_1}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPrimColor();
                }}
              >
                <Arrow fill={userAtom.personal_color_1} size={24}></Arrow>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "32px" }}>
            <FDMT.txt.NSMediumContainer
              fontSize={16}
              color={userAtom.personal_color_1}
            >
              Secondary Color (HEX)
            </FDMT.txt.NSMediumContainer>
            <div
              style={{
                display: "flex",
              }}
            >
              <GeneralInput
                p={userAtom.personal_color_1}
                s={userAtom.personal_color_2}
                placeholder={"Default : #FFE8F5"}
                width={185}
                type={"text"}
                ref={secoRef}
                defaultValue={userAtom.personal_color_2}
              />
              <div
                style={{
                  height: "43px",
                  borderBottom: `1.5px solid ${userAtom.personal_color_1}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSecoColor();
                }}
              >
                <Arrow fill={userAtom.personal_color_1} size={24}></Arrow>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "74px" }}>
          <FDMT.txt.NSMediumContainer
            fontSize={16}
            color={userAtom.personal_color_1}
          >
            Password
          </FDMT.txt.NSMediumContainer>
          <GeneralInput
            p={userAtom.personal_color_1}
            s={userAtom.personal_color_2}
            placeholder={"enter ur password to verify"}
            width={465}
            type={"password"}
            ref={passwordRef}
          />
        </div>
        <CC.thiccBtn
          primaryColor={userAtom.personal_color_1}
          secondaryColor={userAtom.personal_color_2}
          style={{ marginTop: "55px" }}
        >
          EDIT PROFILE
        </CC.thiccBtn>
        <CC.thiccBtnAlt
          primaryColor={userAtom.personal_color_1}
          secondaryColor={userAtom.personal_color_2}
          style={{ marginTop: "10px" }}
          onClick={() => {
            localStorage.removeItem("accessToken");
            const isLogout = confirm("R U Sure About That");
            if (isLogout) navigate("/");
          }}
        >
          LOGOUT
        </CC.thiccBtnAlt>
      </form>
      <FDMT.txt.NSMediumContainer
        fontSize={14}
        color={userAtom.personal_color_1}
        style={{ marginTop: "20px", marginBottom: "10px", cursor: "pointer" }}
        onClick={() => {
          navigate("/main");
        }}
      >
        I wanna go back to Main
      </FDMT.txt.NSMediumContainer>
      {errLog.map((i, x) => (
        <FDMT.txt.NSMediumContainer
          fontSize={14}
          color={`${userAtom.personal_color_1}80`}
          key={x}
        >
          {i}
        </FDMT.txt.NSMediumContainer>
      ))}
    </FDMT.FullPageJustifyWrap>
  );
}
