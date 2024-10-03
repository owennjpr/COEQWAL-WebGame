import React, { useEffect, useState } from 'react'
import WarningSymbol from './svgs/WarningSymbol';


function WarningsBlock({warnings}) {
    const [warningList, setWarningList] = useState([]);

    const styles = {
        coreblock: {
            backgroundColor: "rgb(240, 240, 250)",
            margin: "5px",
            padding: "10px",
            display: "block",
        },
        warningBox: {
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            gap: 10,
            backgroundColor: "rgb(220, 220, 230)",
            margin: 10,
            paddingLeft: 10,
        },
        warnSymbol: {
            color: "rgb(220, 190, 0)",
        }, 
        headerText: {
            textAlign: "left",
            margin: "10px",
            marginBottom: "15px",
            fontWeight: "bold",
            fontSize: 20,
        }
    }

    useEffect(() => {
        let warn_iter = []
        if (warnings.deliveriesNODDry) { 
            warn_iter.push("warning dry year deliveries north")
        }
        if (warnings.deliveriesNODWet) {
            warn_iter.push("warning wet year deliveries north")
        }
        
        if (warnings.deliveriesSODDry) {
            warn_iter.push("warning dry year deliveries south")      
        }
            
        if (warnings.deliveriesSODWet) {
            warn_iter.push("warning wet year deliveries south")
        }
        
        if (warnings.deltaAlertDry) {
            warn_iter.push("warning delta dry years")
        }
        
        if (warnings.deltaAlertWet) {
            warn_iter.push("warning delta wet years")
        }
        
        if (warnings.deltaCriticalDry) {
            warn_iter.push("critical delta dry years")
        }
        
        if (warnings.deltaCriticalWet) {
            warn_iter.push("critical delta wet years")       
        }
        
        if (warnings.equityDry) {
            warn_iter.push("warning equity dry years")
        }
        
        if (warnings.equityWet) {
            warn_iter.push("warning equity wet years") 
        }
        
        if (warnings.reservoirsDry) {
            warn_iter.push("warning reservoirs dry years")
        }
        
        if (warnings.reservoirsWet) {
            warn_iter.push("warning reservoirs wet years")
        }

        setWarningList(warn_iter);
    }, [warnings])
    return (
        <div style={styles.coreblock}>
            <p style={styles.headerText}>Warnings</p>
            {warningList.map(item => {
                return (
                    <div style={styles.warningBox}> 
                        <WarningSymbol style={styles.warnSymbol} /> 
                        <p>{item}</p> 
                    </div>)
            })}
        </div>
    )
}

export default WarningsBlock