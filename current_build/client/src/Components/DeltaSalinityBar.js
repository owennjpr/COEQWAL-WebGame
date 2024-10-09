import React, {useState, useEffect} from 'react'
import DownArrowSVG from '../svgs/DownArrowSVG';
import UpArrowSVG from '../svgs/UpArrowSVG';
import EmptyCircle from '../svgs/EmptyCircle';


function DeltaSalinityBar({title, data, compare, w, h}) {
    const [barHeights, setBarHeights] = useState("1fr");
    const [titleColor, setTitleColor] = useState("black");
    const [arrowComponent, setArrowComponent] = useState(<div></div>)

    

    useEffect(() => {
        let heights = ""
        for (let i = 4; i >= -1; i--) {
            if (i === 4) {
                heights += String(100 - data[i].val) + "fr "
            } else if (i === -1) {
                heights += String(data[0].val - 60) + "fr "
            } else {
                heights += String(data[i].val - data[i+1].val) + "fr "
            }
        }

        console.log(data)
        setBarHeights(heights)

        if (compare === -1) {
            setTitleColor("red");
            setArrowComponent(<UpArrowSVG style={styles.upArrow}></UpArrowSVG>)
        } else if (compare === 1) {
            setTitleColor("green");
            setArrowComponent(<DownArrowSVG style={styles.downArrow}></DownArrowSVG>)
        } else {
            setTitleColor("black");
            setArrowComponent(<EmptyCircle></EmptyCircle>)

        }

    }, [data, compare]);

  return (
    <div style={styles.deltaSalinityBar}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
            {arrowComponent}
            <p style={{color: titleColor, fontWeight: "bold"}}>{title}</p>
        </div>
        <div style={styles.salinityContainer}>
            <div style={styles.barContainer}>
                <div style={{display: "grid", height: h, width: w, border: "2px solid black", gridTemplateColumns: "1fr", gridTemplateRows: barHeights}}>
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
  )
}

const styles = {
    deltaSalinityBar: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        marginBottom: "30px"
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
        marginRight: "2px"
    },
    measureText: {
        fontSize: "10px"
    },
    barContainer: {
        gridRow: "1 / -1",
        marginTop: "5px"
    },
    p0delta: {
        backgroundColor: "white"
    },
    
    p10delta: {
        backgroundColor: "rgb(255, 213, 0)"
    },
    
    p30delta: {
        backgroundColor: "rgb(255, 255, 0)"
    },
    
    p50delta: {
        backgroundColor: "rgb(187, 255, 0)"
    },
    
    p70delta: {
        backgroundColor: "rgb(120, 255, 0)"
    },
    
    p90delta: {
        backgroundColor: "rgb(0, 255, 0)"
    },
    downArrow: {
        color: "green",
    },
    upArrow: {
        color: "red",
    }
};

export default DeltaSalinityBar
