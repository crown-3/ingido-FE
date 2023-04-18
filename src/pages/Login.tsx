import { FDMT } from "../components/fundamental/fundamentalComponents";
import { CC } from "../components/fundamental/combinedComponents";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { loginAPI } from "../apis/api";

export default function Login() {
  const navigate = useNavigate();
  const [primaryColor, secondaryColor] = ["#A42FFF", "#FFE8F5"];
  const [errLog, setErrLog] = useState<string[]>([]);

  const nameTagRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginProcess = async () => {
    let process: boolean = true;
    setErrLog([]);
    const errLog = [];
    const inputName = nameTagRef.current?.value || "";
    const inputPassword = passwordRef.current?.value || "";

    if (inputName === "") {
      errLog.push("Please enter your name and tag");
      process = false;
    }
    const division = inputName.split("#");
    if (division.length > 2) {
      errLog.push("Name or tag is not correct");
      process = false;
    }
    const [name, tag] = division;

    if (inputPassword === "") {
      errLog.push("Please enter your password");
      process = false;
    }

    if (process) {
      const res = await loginAPI({
        name,
        tag,
        password: inputPassword,
      });
      if (res === "PWERR") {
        errLog.push("Password not correct");
        setErrLog(errLog);
      } else if (res === "USTERR") {
        errLog.push("Username and tag combination not found");
        setErrLog(errLog);
      } else {
        console.log(res);
        localStorage.setItem('accessToken', res)
        navigate('/main')
      }
    } else {
      setErrLog(errLog);
    }
  };

  return (
    <FDMT.FullPageCentreWrap backgroundColor={secondaryColor}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FDMT.txt.GothamContainer fontSize={100} color={primaryColor}>
          INGIDO
        </FDMT.txt.GothamContainer>
        <CC.loginInputs
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          type="text"
          placeholder="username#tag"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
          ref={nameTagRef}
        />
        <CC.loginInputs
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          type="password"
          placeholder="ur password"
          ref={passwordRef}
        />
        <CC.thiccBtn
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          style={{ marginTop: "20px" }}
          onClick={() => {
            loginProcess();
          }}
        >
          LOGIN
        </CC.thiccBtn>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <FDMT.txt.NSMediumContainer
            fontSize={14}
            color={primaryColor}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </FDMT.txt.NSMediumContainer>
          <div
            style={{
              borderLeft: `1.5px solid ${primaryColor}`,
              margin: "0 15px",
            }}
          ></div>
          <FDMT.txt.NSMediumContainer
            fontSize={14}
            color={primaryColor}
            style={{ cursor: "pointer" }}
          >
            u Cannot Change ur password
          </FDMT.txt.NSMediumContainer>
        </div>
        {errLog.map((i, x) => (
          <FDMT.txt.NSMediumContainer
            fontSize={14}
            color={`${primaryColor}80`}
            key={x}
          >
            {i}
          </FDMT.txt.NSMediumContainer>
        ))}
        <FDMT.txt.NSRegularContainer
          fontSize={10}
          color={primaryColor}
          style={{ position: "fixed", bottom: "20px" }}
        >
          ⓒ 2023. Lee Jeongwoo all rights reserved.
        </FDMT.txt.NSRegularContainer>
      </div>
    </FDMT.FullPageCentreWrap>
  );
}
