import { FDMT } from "../fundamental/fundamentalComponents";
import styled from "styled-components";
import React, { ForwardedRef, forwardRef, MutableRefObject } from "react";
import { Arrow } from "../../assets/icons/icons";
import { PrimitiveAtom } from "jotai/vanilla/atom";

interface IProps {
  primaryColor: string;
  secondaryColor: string;
  inputType: string;
  title: string;
  placeholder: string;
}

export const GeneralInput = styled.input<{
  p: string;
  s: string;
  width: number;
}>`
  border: none;
  border-bottom: 1.5px solid ${(props) => props.p};
  background-color: ${(props) => props.s};
  height: 43px;
  font-family: NSRegular;
  font-size: 16px;
  padding-left: 5px;
  outline: none;
  color: ${(props) => props.p};
  width: ${(props) => props.width}px;

  ::placeholder {
    color: ${(props) => props.p}80;
  }
`;

export const RoundInput = styled.input<{ p: string; s: string }>`
  height: 50px;
  background-color: ${props => props.s};
  width: 250px;
  font-family: NSRegular;
  font-size: 20px;
  border-radius: 30px 0 0 30px;
  border:none;
  outline: none;
  color: ${(props) => props.p};
  padding-left: 30px;
  
  ::placeholder {
    color: ${(props) => props.p}80;
  }
`;
