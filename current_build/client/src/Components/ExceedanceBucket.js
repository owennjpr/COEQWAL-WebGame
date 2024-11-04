import React, { useState, useEffect } from "react";
import DownArrowSVG from "../svgs/DownArrowSVG";
import UpArrowSVG from "../svgs/UpArrowSVG";
import EmptyCircle from "../svgs/EmptyCircle";

function ExceedanceBucket({ title, data, compare, w, h }) {
  const [barHeights, setBarHeights] = useState("1fr");
  const [titleColor, setTitleColor] = useState("black");
  const [arrowComponent, setArrowComponent] = useState(<div></div>);

  useEffect(() => {
    let heights = "";
    for (let i = 4; i >= -1; i--) {
      if (i === 4) {
        heights += String(1 - data[i].val) + "fr ";
      } else if (i === -1) {
        heights += String(data[0].val) + "fr ";
      } else {
        heights += String(data[i].val - data[i + 1].val) + "fr ";
      }
    }

    setBarHeights(heights);

    if (compare === 1) {
      setTitleColor("green");
      setArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>);
    } else if (compare === -1) {
      setTitleColor("red");
      setArrowComponent(<DownArrowSVG style={styles.downArrow}></DownArrowSVG>);
    } else {
      setTitleColor("black");
      setArrowComponent(<EmptyCircle></EmptyCircle>);
    }
  }, [data, compare]);

  return (
    <div style={styles.percentExceedanceBucket}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {arrowComponent}
        <p
          style={{
            color: titleColor,
            fontWeight: "bold",
            fontSize: w / 6,
            backgroundColor: "rgb(240, 240, 250)",
          }}
        >
          {title}
        </p>
      </div>

      <div style={styles.bucketContainer}>
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
            <div style={styles.p0bucket}></div>
            <div style={styles.p10bucket}></div>
            <div style={styles.p30bucket}></div>
            <div style={styles.p50bucket}></div>
            <div style={styles.p70bucket}></div>
            <div style={styles.p90bucket}></div>
          </div>
        </div>
        <div style={styles.measureBar}> </div>
        <div style={styles.measureText}> 100% </div>
        <div style={styles.measureBar}> </div>
        <div style={styles.measureText}> 75% </div>
        <div style={styles.measureBar}> </div>
        <div style={styles.measureText}> 50%</div>
        <div style={styles.measureBar}> </div>
        <div style={styles.measureText}> 25% </div>
      </div>
    </div>
  );
}

const styles = {
  percentExceedanceBucket: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  bucketContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 0.25fr 0.4fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  },
  measureBar: {
    backgroundColor: "black",
    height: "10%",
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
  p0bucket: {
    backgroundColor: "white",
  },
  p10bucket: {
    backgroundColor: "rgb(170, 170, 255)",
  },
  p30bucket: {
    backgroundColor: "rgb(130, 130, 255)",
  },
  p50bucket: {
    backgroundColor: "rgb(90, 90, 255)",
  },
  p70bucket: {
    backgroundColor: "rgb(50, 50, 255)",
  },
  p90bucket: {
    backgroundColor: "rgb(0, 0, 255)",
  },
  downArrow: {
    color: "red",
  },
  upArrow: {
    color: "green",
  },
};
export default ExceedanceBucket;
