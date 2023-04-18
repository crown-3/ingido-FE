import {FDMT} from "../fundamental/fundamentalComponents";
import {Add, Remove} from "../../assets/icons/icons";

interface IProps {
    name:string,
    tag:string,
    p:string,
    s:string,
}

export default function AddBtn(btnProps:IProps) {
    return <div style={{
        height:"50px",
        color:btnProps.p,
        backgroundColor:btnProps.s,
        display:"flex",
        alignItems:"center",
        padding:"0 25px 0 35px",
        marginRight:"20px",
        borderRadius:"40px",
        minWidth:"max-content",
        cursor:"pointer"
    }}>
        <FDMT.txt.NSBoldContainer fontSize={20} color={btnProps.p}>{btnProps.name}</FDMT.txt.NSBoldContainer>
        <FDMT.txt.NSRegularContainer fontSize={20} color={btnProps.p}
            style={{marginRight:"20px"}}
        >{btnProps.tag}</FDMT.txt.NSRegularContainer>
        <Add fill={btnProps.p} size={35}/>
    </div>
}

export function RemoveBtn(btnProps:IProps) {
    return <div style={{
        height:"50px",
        color:btnProps.p,
        backgroundColor:btnProps.s,
        display:"flex",
        alignItems:"center",
        padding:"0 25px 0 35px",
        marginRight:"20px",
        borderRadius:"40px",
        minWidth:"max-content",
        cursor:"pointer"
    }}>
        <FDMT.txt.NSBoldContainer fontSize={20} color={btnProps.p}>{btnProps.name}</FDMT.txt.NSBoldContainer>
        <FDMT.txt.NSRegularContainer fontSize={20} color={btnProps.p}
                                     style={{marginRight:"20px"}}
        >{btnProps.tag}</FDMT.txt.NSRegularContainer>
        <Remove fill={btnProps.p} size={35}/>
    </div>
}