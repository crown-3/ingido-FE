import styled from "styled-components";

const loginInputs = styled.input<{
  primaryColor: string;
  secondaryColor: string;
}>`
  border: ${(props) => props.primaryColor} 1.5px solid;
  background-color: ${(props) => props.secondaryColor};
  border-radius: 15px;
  font-family: NSRegular;
  height: 48px;
  width: 300px;
  outline: none;
  padding-left: 20px;
  font-size: 18px;
  color: ${(props) => props.primaryColor};

  ::placeholder {
    color: ${(props) => props.primaryColor}80; //#RRGGBBAA
  }
`;

const thiccBtn = styled.button<{primaryColor:string; secondaryColor: string}>`
  background-color: ${(props) => props.primaryColor};
  border-radius: 15px;
  font-family: NSBlack;
  height: 56px;
  width: 323px;
  outline: none;
  border: none;
  color: ${(props) => props.secondaryColor};
  font-size: 23px;
  transition: .2s;
  cursor:pointer;
  
  :active{
    width: 280px;
    height: 45px;
    font-size: 21px;
  }
`

const thiccBtnAlt = styled.button<{primaryColor:string; secondaryColor: string}>`
  background-color: ${(props) => props.secondaryColor};
  border-radius: 15px;
  font-family: NSBlack;
  height: 56px;
  width: 323px;
  outline: none;
  border: 1.5px solid ${props => props.primaryColor};
  color: ${(props) => props.primaryColor};
  font-size: 23px;
  transition: .2s;
  cursor:pointer;
  
  :active{
    width: 280px;
    height: 45px;
    font-size: 21px;
  }
`

export const CC = {
  loginInputs, thiccBtn, thiccBtnAlt
};
