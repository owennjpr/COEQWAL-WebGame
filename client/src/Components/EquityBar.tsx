import React, { CSSProperties, useEffect, useState } from "react";
import DownArrowSVG from "../svgs/DownArrowSVG";
import UpArrowSVG from "../svgs/UpArrowSVG";
import EmptyCircle from "../svgs/EmptyCircle";

type Style = CSSProperties;

interface EquityBarProps {
  data_dry: number;
  data_wet: number;
  compare_dry: number;
  compare_wet: number;
  w?: string;
  h?: string;
}

function EquityBar(props: EquityBarProps) {
  const {
    data_dry,
    data_wet,
    compare_dry,
    compare_wet,
    w = "50px",
    h = "300px",
  } = props;
  const [compareDryColor, setCompareDryColor] =
    useState<string>("rgb(240, 240, 250)");
  const [compareWetColor, setCompareWetColor] =
    useState<string>("rgb(240, 240, 250)");

  const [currDryPos, setCurrDryPos] = useState<string>("0%");
  const [currWetPos, setCurrWetPos] = useState<string>("0%");
  const [compDryPos, setCompDryPos] = useState<string>("0%");
  const [compWetPos, setCompWetPos] = useState<string>("0%");
  const [arrowComponentDry, setArrowComponentDry] = useState(<div></div>);
  const [arrowComponentWet, setArrowComponentWet] = useState(<div></div>);

  useEffect(() => {
    if (data_dry > compare_dry && compare_dry !== 0) {
      setCompareDryColor("rgb(254, 182, 182)");
      setArrowComponentDry(
        <DownArrowSVG style={{ ...styles.arrow, right: 5, color: "red" }} />
      );
    } else if (data_dry < compare_dry && compare_dry !== 0) {
      setCompareDryColor("rgb(119, 219, 119)");
      setArrowComponentDry(
        <UpArrowSVG style={{ ...styles.arrow, right: 5, color: "green" }} />
      );
    } else {
      setArrowComponentDry(
        <EmptyCircle style={{ ...styles.arrow, right: 5 }} />
      );
    }

    if (compare_dry !== 0) {
      const comp = String(((compare_dry - 0.41) / (0.88 - 0.41)) * 100) + "%";
      setCompDryPos(comp);
    }
    let curr = String(((data_dry - 0.41) / (0.88 - 0.41)) * 100) + "%";
    setCurrDryPos(curr);

    if (data_wet > compare_wet && compare_wet !== 0) {
      setCompareWetColor("rgb(254, 182, 182)");
      setArrowComponentWet(
        <DownArrowSVG style={{ ...styles.arrow, left: 5, color: "red" }} />
      );
    } else if (data_wet < compare_wet && compare_wet !== 0) {
      setCompareWetColor("rgb(119, 219, 119)");
      setArrowComponentWet(
        <UpArrowSVG style={{ ...styles.arrow, left: 5, color: "green" }} />
      );
    } else {
      setArrowComponentWet(
        <EmptyCircle style={{ ...styles.arrow, left: 5 }} />
      );
    }

    if (compare_wet !== 0) {
      const comp = String(((compare_wet - 0.41) / (0.88 - 0.41)) * 100) + "%";
      setCompWetPos(comp);
    }
    curr = String(((data_wet - 0.41) / (0.88 - 0.41)) * 100) + "%";
    setCurrWetPos(curr);
  }, [data_dry, compare_dry, data_wet, compare_wet]);

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
        <p style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
          Equity
        </p>
      </div>
      <div style={styles.barContainer}>
        <p style={{ fontSize: 10 }}>more equitable</p>
        <div style={{ ...styles.equityBar, height: h, width: w }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgb(210, 255, 228)",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgb(255, 247, 212)",
            }}
          />

          <div
            style={{
              ...styles.equityMark,
              backgroundColor: compareDryColor,
              bottom: compDryPos,
              right: 0,
            }}
          />
          <div
            style={{
              ...styles.equityMark,
              backgroundColor: "black",
              bottom: currDryPos,
              right: 0,
            }}
          />
          <div
            style={{
              ...styles.equityMark,
              backgroundColor: compareWetColor,
              bottom: compWetPos,
            }}
          />
          <div
            style={{
              ...styles.equityMark,
              backgroundColor: "black",
              bottom: currWetPos,
            }}
          />
          {arrowComponentDry}
          {arrowComponentWet}
        </div>
        <p style={{ fontSize: 10 }}>less equitable</p>
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
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    border: "2px solid black",
    borderRadius: "0.5rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    position: "relative",
    overflow: "hidden",
  } as Style,
  barContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as Style,
  equityMark: {
    height: "5px",
    width: "50%",
    position: "absolute",
  } as Style,
  arrow: {
    position: "absolute",
    bottom: 10,
  } as Style,
};
