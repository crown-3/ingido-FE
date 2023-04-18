import { FDMT } from "../components/fundamental/fundamentalComponents";
import { CC } from "../components/fundamental/combinedComponents";
import { GeneralInput } from "../components/compound/GeneralInputs";
import React, { useRef, useState } from "react";
import { Arrow } from "../assets/icons/icons";
import { signUpAPI } from "../apis/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const primRef = useRef<HTMLInputElement>(null);
  const secoRef = useRef<HTMLInputElement>(null);

  const [primaryColor, setPrim] = useState<string>("#A42FFF");
  const [secondaryColor, setSeco] = useState<string>("#FFE8F5");
  const [errLog, setErrLog] = useState<string[]>([]);
  const nameTagReg = new RegExp("^[^#]+$");
  const passwordReg = new RegExp("^[a-zA-Z0-9]*$");
  const hexReg = new RegExp("^#[0-9a-f]{3,6}$", "i");

  const setPrimColor = () => {
    if (primRef.current?.value && hexReg.test(primRef.current?.value)) {
      setPrim(primRef.current?.value);
    } else {
      if (primRef.current?.value === "") setPrim("#A42FFF");
      else alert("The value is not a hex value.");
    }
  };

  const setSecoColor = () => {
    if (secoRef.current?.value && hexReg.test(secoRef.current?.value)) {
      setSeco(secoRef.current?.value);
    } else {
      if (secoRef.current?.value === "") setSeco("#FFE8F5");
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
      const res = await signUpAPI({
        name,
        tag,
        personal_color_1: primaryColor,
        personal_color_2: secondaryColor,
        password,
      });
      if (res) {
        const result = window.confirm(
          "Your account was successfully created! Wanna go back to login?"
        );

        if (result) {
          navigate("/");
        }
      } else {
        errLog.push("Tag already exists");
        setErrLog(errLog);
      }
    } else {
      setErrLog(errLog);
    }
  };

  return (
    <FDMT.FullPageJustifyWrap backgroundColor={secondaryColor}>
      <FDMT.txt.GothamContainer
        fontSize={60}
        color={primaryColor}
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
            <FDMT.txt.NSMediumContainer fontSize={16} color={primaryColor}>
              Username
            </FDMT.txt.NSMediumContainer>
            <GeneralInput
              p={primaryColor}
              s={secondaryColor}
              placeholder={"ur name here"}
              width={225}
              type={"text"}
              ref={nameRef}
            />
          </div>
          <div>
            <FDMT.txt.NSMediumContainer fontSize={16} color={primaryColor}>
              Tag
            </FDMT.txt.NSMediumContainer>
            <GeneralInput
              p={primaryColor}
              s={secondaryColor}
              placeholder={"#something"}
              width={225}
              type={"text"}
              ref={tagRef}
            />
          </div>
        </div>
        <div style={{ marginTop: "32px" }}>
          <FDMT.txt.NSMediumContainer fontSize={16} color={primaryColor}>
            Password
          </FDMT.txt.NSMediumContainer>
          <GeneralInput
            p={primaryColor}
            s={secondaryColor}
            placeholder={"u cannot change ur password ;)"}
            width={465}
            type={"password"}
            ref={passwordRef}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "470px",
            justifyContent: "space-between",
            marginTop: "55px",
          }}
        >
          <div style={{ marginTop: "32px" }}>
            <FDMT.txt.NSMediumContainer fontSize={16} color={primaryColor}>
              Primary Color (HEX)
            </FDMT.txt.NSMediumContainer>
            <div
              style={{
                display: "flex",
              }}
            >
              <GeneralInput
                p={primaryColor}
                s={secondaryColor}
                placeholder={"Default : #A42FFF"}
                width={185}
                type={"text"}
                ref={primRef}
              />
              <div
                style={{
                  height: "43px",
                  borderBottom: `1.5px solid ${primaryColor}`,
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
                <Arrow fill={primaryColor} size={24}></Arrow>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "32px" }}>
            <FDMT.txt.NSMediumContainer fontSize={16} color={primaryColor}>
              Secondary Color (HEX)
            </FDMT.txt.NSMediumContainer>
            <div
              style={{
                display: "flex",
              }}
            >
              <GeneralInput
                p={primaryColor}
                s={secondaryColor}
                placeholder={"Default : #FFE8F5"}
                width={185}
                type={"text"}
                ref={secoRef}
              />
              <div
                style={{
                  height: "43px",
                  borderBottom: `1.5px solid ${primaryColor}`,
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
                <Arrow fill={primaryColor} size={24}></Arrow>
              </div>
            </div>
          </div>
        </div>
        <CC.thiccBtn
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          style={{ marginTop: "55px" }}
        >
          SIGN UP
        </CC.thiccBtn>
      </form>
      <FDMT.txt.NSMediumContainer
        fontSize={14}
        color={primaryColor}
        style={{ marginTop: "20px", marginBottom: "10px", cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        I wanna go back to login
      </FDMT.txt.NSMediumContainer>
      {errLog.map((i, x) => (
        <FDMT.txt.NSMediumContainer
          fontSize={14}
          color={`${primaryColor}80`}
          key={x}
        >
          {i}
        </FDMT.txt.NSMediumContainer>
      ))}
    </FDMT.FullPageJustifyWrap>
  );
}
