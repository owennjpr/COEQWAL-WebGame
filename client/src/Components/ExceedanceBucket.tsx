import React, { useState, useEffect } from "react";
import DownArrowSVG from "../svgs/DownArrowSVG";
import UpArrowSVG from "../svgs/UpArrowSVG";
import EmptyCircle from "../svgs/EmptyCircle";

interface ExceedanceBucketProps {
  title: string;
  data_wet: { val: number; prob: string }[];
  data_dry: { val: number; prob: string }[];
  compare_wet: number;
  compare_dry: number;
  w: string;
  h: string;
}

function ExceedanceBucket(props: ExceedanceBucketProps) {
  const { title, data_wet, data_dry, compare_wet, compare_dry, w, h } = props;
  console.log(title, data_wet, data_dry, compare_wet, compare_dry);
  const [wetBarHeights, setWetBarHeights] = useState("1fr");
  const [dryBarHeights, setDryBarHeights] = useState("1fr");

  const [dryArrowComponent, setDryArrowComponent] = useState(<div></div>);
  const [wetArrowComponent, setWetArrowComponent] = useState(<div></div>);

  useEffect(() => {
    let heights = "";
    for (let i = 4; i >= -1; i--) {
      if (i === 4) {
        heights += String(1 - data_wet[i].val) + "fr ";
      } else if (i === -1) {
        heights += String(data_wet[0].val) + "fr ";
      } else {
        heights += String(data_wet[i].val - data_wet[i + 1].val) + "fr ";
      }
    }

    setWetBarHeights(heights);

    heights = "";
    for (let i = 4; i >= -1; i--) {
      if (i === 4) {
        heights += String(1 - data_dry[i].val) + "fr ";
      } else if (i === -1) {
        heights += String(data_dry[0].val) + "fr ";
      } else {
        heights += String(data_dry[i].val - data_dry[i + 1].val) + "fr ";
      }
    }

    setDryBarHeights(heights);

    if (compare_wet === 1) {
      setWetArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>);
    } else if (compare_wet === -1) {
      setWetArrowComponent(
        <DownArrowSVG style={styles.downArrow}></DownArrowSVG>
      );
    } else {
      setWetArrowComponent(
        <EmptyCircle style={{ color: "white" }}></EmptyCircle>
      );
    }

    if (compare_dry === 1) {
      setDryArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>);
    } else if (compare_dry === -1) {
      setDryArrowComponent(
        <DownArrowSVG style={styles.downArrow}></DownArrowSVG>
      );
    } else {
      setDryArrowComponent(
        <EmptyCircle style={{ color: "white" }}></EmptyCircle>
      );
    }
  }, [data_wet, data_dry, compare_wet, compare_dry]);

  return (
    <div style={styles.percentExceedanceBucket}>
      <p
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 12,
          // lineHeight: "6px",
          marginTop: "1rem",
          marginBottom: 0,
        }}
      >
        {title}
      </p>

      <div style={styles.bucketContainer}>
        <div style={styles.barContainer}>
          <div
            style={{
              height: h,
              width: w,
              border: "2px solid black",
              borderRadius: "1rem 0px 1rem 1rem",
              display: "flex",
              flexDirection: "row",
              position: "relative",
              overflow: "hidden", // Prevent internal content from overflowing the rounded border
              background: "rgb(0, 50, 255)", // Optional: ensures no transparency at corners
            }}
          >
            <div
              style={{
                height: "100%",
                width: "50%",
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: wetBarHeights,
              }}
            >
              <div style={styles.p0bucket} />
              <div style={styles.p10bucket} />
              <div style={styles.p30bucket} />
              <div style={styles.p50bucket} />
              <div style={styles.p70bucket} />
              <div style={styles.p90bucket} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0.25rem",
                left: "1vmin",
              }}
            >
              {wetArrowComponent}
            </div>

            <div
              style={{
                height: "100%",
                width: "50%",
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: dryBarHeights,
              }}
            >
              <div style={styles.p0bucketDry} />
              <div style={styles.p10bucket} />
              <div style={styles.p30bucket} />
              <div style={styles.p50bucket} />
              <div style={styles.p70bucket} />
              <div style={styles.p90bucket} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0.25rem",
                right: "1vmin",
              }}
            >
              {dryArrowComponent}
            </div>
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
    alignItems: "start",
  },
  bucketContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 0.25fr 0.4fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  },
  measureBar: {
    backgroundColor: "black",
    height: "15%",
    marginTop: "5px",
    marginRight: "2px",
  },
  measureText: {
    fontSize: "12px",
  },
  barContainer: {
    gridRow: "1 / -1",
    marginTop: "5px",
  },
  p0bucket: {
    backgroundColor: "rgb(210, 255, 228)",
  },
  p0bucketDry: {
    backgroundColor: "rgb(255, 247, 212)",
  },

  p10bucket: {
    backgroundColor: "rgb(170, 200, 255)",
  },
  p30bucket: {
    backgroundColor: "rgb(130, 160, 255)",
  },
  p50bucket: {
    backgroundColor: "rgb(90, 120, 255)",
  },
  p70bucket: {
    backgroundColor: "rgb(50, 90, 255)",
  },
  p90bucket: {
    backgroundColor: "rgb(0, 50, 255)",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    paddingBottom: "0.2rem",
  },
  downArrow: {
    color: "rgb(255, 150, 150)",
  },
  upArrow: {
    color: "rgb(150, 255, 150)",
  },
};
export default ExceedanceBucket;
