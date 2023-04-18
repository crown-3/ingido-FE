import { FDMT } from "../fundamental/fundamentalComponents";

interface IProps {
  targetUserColor: string;
  name: string;
  tag: string;
  targetIngido: number;
  p: string;
  s: string;
}

export default function FriendComp(info: IProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "80px",
        borderRadius: "25px",
        backgroundColor: info.s,
        padding: "0 30px",
        width: "min-content",
          marginRight:"15px",
          marginBottom:"15px",
          cursor:"pointer"
      }}
    >
      <div
        style={{
          width: "25px",
          height: "25px",
          border: `5px ${info.p} solid`,
          borderRadius: "100px",
          backgroundColor: info.targetUserColor,
            marginRight:"10px"
        }}
      ></div>
      <FDMT.txt.NSBoldContainer
        fontSize={25}
        color={info.p}
        style={{ width: "max-content",marginRight:"6px" }}
      >
        {info.name}
      </FDMT.txt.NSBoldContainer>
      <FDMT.txt.NSMediumContainer fontSize={18} color={info.p} style={{marginRight:"30px"}}>
        #{info.tag}
      </FDMT.txt.NSMediumContainer>
      <FDMT.txt.GothamContainer fontSize={40} color={info.p}>
        {info.targetIngido}
      </FDMT.txt.GothamContainer>
    </div>
  );
}
