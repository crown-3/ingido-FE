import styled from "styled-components";

interface FillProps {
  fill: string;
  size: number;
}

interface FillProps2 {
  p: string;
  s: string;
  size: number;
  rotate: boolean;
}

export function Arrow({ fill, size }: FillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      height={`${size}px`}
      width={`${size}px`}
      style={{ transform: "rotate(180deg)" }}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

export function Account({ fill, size }: FillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
      </g>
    </svg>
  );
}

export function Add({ fill, size }: FillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

export function Remove({ fill, size }: FillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
}

export function Search({ fill, size }: FillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

export function Clear({ fill, size }: FillProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );
}

const Clicker = styled.div`
  z-index: 10;
  position: relative;
  :active {
    top: 12px;
  }
`;

export function IngidoBtn({ p, s, size, rotate }: FillProps2) {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "0 5px" }}>
      <Clicker>
        <svg
          width={size}
          height={size}
          viewBox="0 0 94 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `rotate(${rotate ? "0" : "180deg"})`,
            cursor: "pointer",
            zIndex: "10",
          }}
        >
          <rect width={size} height={size} rx="20" fill={s} />
          <path d="M47 22L75.5788 71.5H18.4212L47 22Z" fill={p} />
        </svg>
      </Clicker>
      <div
        style={{
          width: "94px",
          height: "94px",
          borderRadius: "17px",
          boxShadow: `0 0 0 4px ${s} inset`,
          backgroundColor: p,
          position: "relative",
          top: "-84px",
        }}
      ></div>
    </div>
  );
}
