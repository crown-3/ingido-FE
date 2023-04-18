import { Account } from "../../assets/icons/icons";
import { FDMT } from "../fundamental/fundamentalComponents";
import { useNavigate } from "react-router-dom";

interface IProps {
  isLogin: boolean;
  name: string;
  tag: string;
  friendNumber: number;
  p: string;
  s: string;
  ingido: number;
  main: boolean;
}

export default function Navbar(navInfo: IProps) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "56px",
        backgroundColor: navInfo.s,
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* left pool */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            paddingLeft: "15px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Account fill={navInfo.p} size={30} />
          {navInfo.isLogin ? (
            <>
              <FDMT.txt.NSBoldContainer
                fontSize={16}
                color={navInfo.p}
                style={{ marginLeft: "5px" }}
              >
                {navInfo.name}
              </FDMT.txt.NSBoldContainer>
              <FDMT.txt.NSMediumContainer fontSize={16} color={navInfo.p}>
                #{navInfo.tag}
              </FDMT.txt.NSMediumContainer>
            </>
          ) : (
            <>
              <FDMT.txt.NSBoldContainer
                fontSize={16}
                color={navInfo.p}
                style={{ marginLeft: "5px" }}
              >
                LOGIN
              </FDMT.txt.NSBoldContainer>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            marginLeft: "40px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={()=>{navigate('/friends')}}
          >
            <FDMT.txt.NSBlackContainer fontSize={22} color={navInfo.p}>
              친구
            </FDMT.txt.NSBlackContainer>
            <div
              style={{
                backgroundColor: navInfo.p,
                color: navInfo.s,
                height: "20px",
                fontFamily: "NSBold",
                lineHeight: "21px",
                fontSize: "13px",
                padding: "0 10px",
                borderRadius: "20px",
                marginLeft: "10px",
                marginTop: "2px",
              }}
            >
              {navInfo.friendNumber}
            </div>
          </div>
        </div>

        <FDMT.txt.NSBlackContainer
          fontSize={22}
          color={navInfo.p}
          style={{ marginLeft: "30px", cursor: "pointer" }}
        >
          서버
        </FDMT.txt.NSBlackContainer>
      </div>

      {/* right pool */}
      <div
        style={{
          position: "relative",
          top: "-30px",
          right: "20px",
        }}
      >
        <FDMT.txt.GothamContainer fontSize={100} color={navInfo.p}>
          {navInfo.main ? "INGIDO" : navInfo.ingido}
        </FDMT.txt.GothamContainer>
      </div>
    </div>
  );
}
