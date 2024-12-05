import React, { CSSProperties, useEffect, useState } from "react";
import DownArrowSVG from "../svgs/DownArrowSVG";
import UpArrowSVG from "../svgs/UpArrowSVG";
import EmptyCircle from "../svgs/EmptyCircle";

type Style = CSSProperties;

interface EquityBarProps {
  data: number;
  compare: number;
}

function EquityBar(props: EquityBarProps) {
  const { data, compare } = props;
  const [compareColor, setCompareColor] =
    useState<string>("rgb(240, 240, 250)");
  const [titleColor, setTitleColor] = useState<string>("black");
  const [currPos, setCurrPos] = useState<string>("0px");
  const [compPos, setCompPos] = useState<string>("0px");
  const [arrowComponent, setArrowComponent] = useState(<div></div>);

  useEffect(() => {
    if (data > compare && compare !== 0) {
      setCompareColor("rgb(255, 160, 160)");
      setTitleColor("red");
      setArrowComponent(<DownArrowSVG style={{ color: "red" }} />);
    } else if (data < compare && compare !== 0) {
      setCompareColor("rgb(160, 255, 160)");
      setTitleColor("green");
      setArrowComponent(<UpArrowSVG style={{ color: "green" }} />);
    } else {
      setTitleColor("black");
      setArrowComponent(<EmptyCircle />);
    }

    if (compare !== 0) {
      const comp = String(((compare - 0.41) / (0.88 - 0.41)) * 200) + "px";
      setCompPos(comp);
    }
    const curr = String(((data - 0.41) / (0.88 - 0.41)) * 200) + "px";
    setCurrPos(curr);
  }, [data, compare]);
  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {arrowComponent}
        <p style={{ color: titleColor, fontWeight: "bold", fontSize: 16 }}>
          Equity
        </p>
      </div>
      <div style={styles.barContainer}>
        <p style={{ fontSize: 10 }}>less equitable</p>
        <div style={styles.equityBar}>
          <div
            style={{
              ...styles.equityMark,
              backgroundColor: compareColor,
              left: compPos,
            }}
          ></div>
          <div
            style={{
              ...styles.equityMark,
              backgroundColor: "black",
              left: currPos,
            }}
          ></div>
        </div>
        <p style={{ fontSize: 10 }}>more equitable</p>
      </div>
    </div>
  );
}

export default EquityBar;

const styles = {
  container: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  } as Style,
  equityBar: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: 200,
    border: "2px solid black",
    marginLeft: "1rem",
    marginRight: "1rem",
    position: "relative",
  } as Style,
  barContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as Style,
  equityMark: {
    height: "100%",
    width: 5,
    position: "absolute",
  } as Style,
};
