import { createGlobalStyle } from "styled-components";
import NSBlack from "./NSBlack.otf";
import NSBold from "./NSBold.otf";
import NSMedium from "./NSMedium.otf";
import NSRegular from "./NSRegular.otf";
import Gotham from "./Gotham.otf";

export default createGlobalStyle`
    @font-face {
        font-family: "NSBold";
        src: url(${NSBold}) format('opentype');
    }
    @font-face {
      font-family: "NSBlack";
      src: url(${NSBlack}) format('opentype');
    }
    @font-face {
        font-family: "NSRegular";
        src: url(${NSRegular}) format('opentype');
    }
    @font-face {
        font-family: "NSMedium";
        src: url(${NSMedium}) format('opentype');
    }
    @font-face {
      font-family: "Aharoni";
      src: url(${Gotham}) format('opentype');
    }
`;
