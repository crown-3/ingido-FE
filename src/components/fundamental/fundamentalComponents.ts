import styled from "styled-components";

function FontVariation(fontFamily: string) {
  return styled.div<{
    fontSize: number;
    color: string;
  }>`
    font-family: ${fontFamily};
    font-size: ${(props) => props.fontSize}px;
    color: ${(props) => props.color};
  `;
}

const txt = {
  NSBoldContainer: FontVariation("NSBold"),
  NSBlackContainer: FontVariation("NSBlack"),
  NSRegularContainer: FontVariation("NSRegular"),
  NSMediumContainer: FontVariation("NSMedium"),
  GothamContainer: FontVariation("Gotham"),
};

const FullPageCentreWrap = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullPageJustifyWrap = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FullPageWrap = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  height: 100vh;
  width: 100vw;
`;

export const FDMT = {
  txt,
  FullPageCentreWrap,
  FullPageJustifyWrap,
  FullPageWrap
};
