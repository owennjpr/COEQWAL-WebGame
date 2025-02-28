import React, { useState, useEffect } from "react";
import DownArrowSVG from "../svgs/DownArrowSVG";
import UpArrowSVG from "../svgs/UpArrowSVG";
import EmptyCircle from "../svgs/EmptyCircle";

interface DeltaSalinityProps {
  title: string;
  data: { val: number; prob: string }[];
  compare: number;
  w: string;
  h: string;
}

function DeltaSalinityVisual(props: DeltaSalinityProps) {
  const { title, data, compare, w, h } = props;
  const [barHeights, setBarHeights] = useState("1fr");
  const [tiers, setTiers] = useState("white");
  const [titleColor, setTitleColor] = useState("black");
  const [arrowComponent, setArrowComponent] = useState(<div></div>);

  useEffect(() => {
    let heights = "";
    for (let i = 4; i >= -1; i--) {
      if (i === 4) {
        heights += String(100 - data[i].val) + "fr ";
      } else if (i === -1) {
        heights += String(data[0].val - 60) + "fr ";
      } else {
        heights += String(data[i].val - data[i + 1].val) + "fr ";
      }
    }

    setBarHeights(heights);

    console.log(data[0].val);
    console.log(data[1].val);
    console.log(data[2].val);
    console.log(data[3].val);
    console.log(data[4].val);

    const scalar = 0.6;
    const adj = 21;
    const scaledValues = [
      data[4].val * scalar + adj,
      data[3].val * scalar + adj,
      data[2].val * scalar + adj,
      data[1].val * scalar + adj,
    ];

    // 70: 64.46
    // 80: 80.10
    //~89: 91.37

    console.log(scaledValues);

    let tier = "linear-gradient(90deg, #ff0000 0%, ";
    tier += `#ff4600 ${String(scaledValues[0])}%,
           #ff7900 ${String(scaledValues[0])}%, `;
    tier += `#ff9c00, ${String(scaledValues[1])}%,
           #ffc200 ${String(scaledValues[1])}%, `;
    tier += `#ffdc00 ${String(scaledValues[2])}%, 
           #fffe00 ${String(scaledValues[2])}%, `;
    tier += `#e8eb00 ${String(scaledValues[3])}%, 
           #17db03 ${String(scaledValues[3])}%,
           #00c900 100%)`;

    console.log(tier);
    setTiers(tier);

    if (compare === -1) {
      setTitleColor("red");
      setArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>);
    } else if (compare === 1) {
      setTitleColor("green");
      setArrowComponent(<DownArrowSVG style={styles.downArrow}></DownArrowSVG>);
    } else {
      setTitleColor("black");
      setArrowComponent(<EmptyCircle></EmptyCircle>);
    }
  }, [data, compare]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {arrowComponent}
        <p style={{ color: titleColor, fontWeight: "bold" }}>{title}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            ...styles.gradientBox,
            background: tiers,
            marginTop: "5px",
          }}
        >
          <img
            src="/NumberedDeltaOutline.png"
            style={styles.image}
            alt="map of california delta"
          />
        </div>
        <div style={styles.deltaSalinityBar}>
          <div style={styles.salinityContainer}>
            <div style={styles.barContainer}>
              <div
                style={{
                  display: "grid",
                  height: h,
                  width: w,
                  border: "2px solid black",
                  gridTemplateColumns: "1fr",
                  gridTemplateRows: barHeights,
                }}
              >
                <div style={styles.p0delta}></div>
                <div style={styles.p10delta}></div>
                <div style={styles.p30delta}></div>
                <div style={styles.p50delta}></div>
                <div style={styles.p70delta}></div>
                <div style={styles.p90delta}></div>
              </div>
            </div>
            <div style={styles.measureBar}> </div>
            <div style={styles.measureText}> 100km </div>
            <div style={styles.measureBar}> </div>
            <div style={styles.measureText}> 90km </div>
            <div style={styles.measureBar}> </div>
            <div style={styles.measureText}> 80km </div>
            <div style={styles.measureBar}> </div>
            <div style={styles.measureText}> 70km </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  deltaSalinityBar: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },

  salinityContainer: {
    display: "grid",
    gridTemplateColumns: "0.9fr 0.55fr 0.5fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  },
  measureBar: {
    backgroundColor: "black",
    height: "5%",
    marginTop: "5px",
    marginRight: "2px",
  },
  measureText: {
    fontSize: "10px",
  },
  barContainer: {
    gridRow: "1 / -1",
    marginTop: "5px",
  },
  p0delta: {
    backgroundColor: "#88c988",
  },

  p10delta: {
    backgroundColor: "#88c988",
  },

  p30delta: {
    backgroundColor: "#e8eb66",
  },

  p50delta: {
    backgroundColor: "#ffdc66",
  },

  p70delta: {
    backgroundColor: "#ffad66",
  },

  p90delta: {
    backgroundColor: "#ff6666",
  },
  downArrow: {
    color: "green",
  },
  upArrow: {
    color: "red",
  },
  gradientBox: {
    width: "60vmin",
    height: "40vmin",
    border: "2px solid black",
    background: "rgb(255,0,0)",
  },
  image: {
    width: "60vmin",
    height: "40vmin",
    opacity: 0.98,
  },
};

export default DeltaSalinityVisual;
