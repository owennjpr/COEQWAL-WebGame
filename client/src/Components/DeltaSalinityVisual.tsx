import React, { useState, useEffect } from "react";
import DownArrowSVG from "../svgs/DownArrowSVG";
import UpArrowSVG from "../svgs/UpArrowSVG";
import EmptyCircle from "../svgs/EmptyCircle";

interface DeltaSalinityProps {
  title: string;
  data_wet: { val: number; prob: string }[];
  data_dry: { val: number; prob: string }[];
  compare_wet: number;
  compare_dry: number;
  w: string;
  h: string;
}

function DeltaSalinityVisual(props: DeltaSalinityProps) {
  const { title, data_wet, data_dry, compare_wet, compare_dry, w, h } = props;
  const [dryBarHeights, setDryBarHeights] = useState("1fr");
  const [dryTiers, setDryTiers] = useState("white");
  const [wetBarHeights, setWetBarHeights] = useState("1fr");
  const [wetTiers, setWetTiers] = useState("white");

  const [titleColor, setTitleColor] = useState("black");
  const [arrowComponent, setArrowComponent] = useState(<div></div>);

  useEffect(() => {
    let heights = "";
    for (let i = 4; i >= -1; i--) {
      if (i === 4) {
        heights += String(100 - data_wet[i].val) + "fr ";
      } else if (i === -1) {
        heights += String(data_wet[0].val - 60) + "fr ";
      } else {
        heights += String(data_wet[i].val - data_wet[i + 1].val) + "fr ";
      }
    }

    setWetBarHeights(heights);

    const scalar = 0.6;
    const adj = 21;
    let scaledValues = [
      data_wet[4].val * scalar + adj,
      data_wet[3].val * scalar + adj,
      data_wet[2].val * scalar + adj,
      data_wet[1].val * scalar + adj,
    ];

    let tier = "linear-gradient(90deg, #ff6676 0%, ";
    tier += `#ff6676 ${String(scaledValues[0])}%,
           #ffad86 ${String(scaledValues[0])}%, `;
    tier += `#ffad86, ${String(scaledValues[1])}%,
           #ffdc86 ${String(scaledValues[1])}%, `;
    tier += `#ffdc86 ${String(scaledValues[2])}%, 
           #e8eb86 ${String(scaledValues[2])}%, `;
    tier += `#e8eb86 ${String(scaledValues[3])}%, 
           #88c9A8 ${String(scaledValues[3])}%,
           #88c9A8 100%)`;

    setWetTiers(tier);

    if (compare_wet === -1) {
      setTitleColor("red");
      setArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>);
    } else if (compare_wet === 1) {
      setTitleColor("green");
      setArrowComponent(<DownArrowSVG style={styles.downArrow}></DownArrowSVG>);
    } else {
      setTitleColor("black");
      setArrowComponent(<EmptyCircle></EmptyCircle>);
    }

    heights = "";
    for (let i = 4; i >= -1; i--) {
      if (i === 4) {
        heights += String(100 - data_dry[i].val) + "fr ";
      } else if (i === -1) {
        heights += String(data_dry[0].val - 60) + "fr ";
      } else {
        heights += String(data_dry[i].val - data_dry[i + 1].val) + "fr ";
      }
    }

    setDryBarHeights(heights);

    scaledValues = [
      data_dry[4].val * scalar + adj,
      data_dry[3].val * scalar + adj,
      data_dry[2].val * scalar + adj,
      data_dry[1].val * scalar + adj,
    ];

    tier = "linear-gradient(90deg, #ff6656 0%, ";
    tier += `#ff6656 ${String(scaledValues[0])}%,
           #ffad56 ${String(scaledValues[0])}%, `;
    tier += `#ffad56, ${String(scaledValues[1])}%,
           #ffdc56 ${String(scaledValues[1])}%, `;
    tier += `#ffdc56 ${String(scaledValues[2])}%, 
           #e8eb56 ${String(scaledValues[2])}%, `;
    tier += `#e8eb56 ${String(scaledValues[3])}%, 
           #88c978 ${String(scaledValues[3])}%,
           #88c978 100%)`;

    setDryTiers(tier);

    if (compare_dry === -1) {
      setTitleColor("red");
      setArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>);
    } else if (compare_dry === 1) {
      setTitleColor("green");
      setArrowComponent(<DownArrowSVG style={styles.downArrow}></DownArrowSVG>);
    } else {
      setTitleColor("black");
      setArrowComponent(<EmptyCircle></EmptyCircle>);
    }
  }, [data_wet, data_dry, compare_wet, compare_dry]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {arrowComponent}
        <p style={{ color: titleColor, fontWeight: "bold" }}>{title}</p>
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            ...styles.gradientBox,
            // background: wetTiers,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "42%",
              background: wetTiers,
              borderBottom: "black 2px solid",
            }}
          ></div>
          <div
            style={{ width: "100%", height: "58%", background: dryTiers }}
          ></div>
          <img
            src="/NumberedDeltaOutline.png"
            style={{
              ...styles.image,
              position: "absolute",
              transition: "opacity 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.93";
            }}
            alt="map of california delta"
          />
        </div>
        <div style={styles.deltaSalinityBar}>
          <div style={styles.salinityContainer}>
            <div style={styles.barContainer}>
              <div
                style={{
                  height: h,
                  width: w,
                  border: "2px solid black",
                  borderBottomRightRadius: "2rem",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: wetBarHeights,
                  }}
                >
                  <div style={styles.p0deltaWet}></div>
                  <div style={styles.p10deltaWet}></div>
                  <div style={styles.p30deltaWet}></div>
                  <div style={styles.p50deltaWet}></div>
                  <div style={styles.p70deltaWet}></div>
                  <div style={styles.p90deltaWet}></div>
                </div>
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: dryBarHeights,
                  }}
                >
                  <div style={styles.p0deltaDry}></div>
                  <div style={styles.p10deltaDry}></div>
                  <div style={styles.p30deltaDry}></div>
                  <div style={styles.p50deltaDry}></div>
                  <div style={styles.p70deltaDry}></div>
                  <div style={styles.p90deltaDry}></div>
                </div>
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
    height: "100%",
  },

  salinityContainer: {
    display: "grid",
    gridTemplateColumns: "0.9fr 0.55fr 0.5fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    height: "100%",
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
  },
  p0deltaWet: {
    backgroundColor: "#88c9A8",
  },

  p10deltaWet: {
    backgroundColor: "#88c9A8",
  },

  p30deltaWet: {
    backgroundColor: "#e8eb86",
  },

  p50deltaWet: {
    backgroundColor: "#ffdc86",
  },

  p70deltaWet: {
    backgroundColor: "#ffad86",
  },

  p90deltaWet: {
    backgroundColor: "#ff6676",
  },
  p0deltaDry: {
    backgroundColor: "#88c978",
  },

  p10deltaDry: {
    backgroundColor: "#88c978",
  },

  p30deltaDry: {
    backgroundColor: "#e8eb56",
  },

  p50deltaDry: {
    backgroundColor: "#ffdc56",
  },

  p70deltaDry: {
    backgroundColor: "#ffad56",
  },

  p90deltaDry: {
    backgroundColor: "#ff6656",
  },
  downArrow: {
    color: "green",
  },
  upArrow: {
    color: "red",
  },
  gradientBox: {
    width: "100%",
    height: "100%",
    border: "2px solid black",
    borderTopLeftRadius: "2rem",
    borderBottomLeftRadius: "2rem",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.93,
  },
};

export default DeltaSalinityVisual;
