import React from 'react'
import DeltaSalinityBar from './DeltaSalinityBar'
import EquityBar from './EquityBar'

function MetricsBlock({wyt, ds, compare}) {
    const styles = {
        deliverybox: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
        },
        coreblock: {
            backgroundColor: "rgb(240, 240, 250)",
            marginTop: "5px",
            marginBottom: "5px",
            padding: "10px",
            display: "block",
        },
        headerText: {
            textAlign: "center",
            margin: "10px",
            fontWeight: "bold",
        }
    }

    if (ds === undefined || compare === undefined) {
        return (
            <div style={styles.coreblock} />
        )
    } else {
        if (wyt === "dry") {
            return (
                <div style={styles.coreblock}>
                    {/* <p style={styles.headerText}>North of Delta Deliveries</p>
                    <div style={styles.deliverybox}>
                        <ExceedanceBucket title="Agriculture Deliveries" data={ds.dry_del_ag_n} compare={compare.dry_del_ag_n} w={100} h={100}></ExceedanceBucket>
                        <ExceedanceBucket title="City Deliveries" data={ds.dry_del_mi_n} compare={compare.dry_del_mi_n} w={100} h={100}></ExceedanceBucket>
                    </div>
                    <p style={styles.headerText}>South of Delta Deliveries</p>
                    <div style={styles.deliverybox}>
                        <ExceedanceBucket title="Agriculture Deliveries" data={ds.dry_del_ag_s} compare={compare.dry_del_ag_s} w={100} h={100}></ExceedanceBucket>
                        <ExceedanceBucket title="City Deliveries" data={ds.dry_del_mi_s} compare={compare.dry_del_mi_s} w={100} h={100}></ExceedanceBucket>
                    </div> */}
                    
                    <DeltaSalinityBar title="Delta Salinity" data={ds.dry_x2_prv} compare={compare.dry_x2_prv} w={40} h={300} />
                    <EquityBar data={ds.dry_equity} compare={compare.dry_equity_value}/>
                </div>
            )    
        } else {
            return (
                <div style={styles.coreblock}>
                    {/* <p style={styles.headerText}>North of Delta Deliveries</p>
                    <div style={styles.deliverybox}>
                        <ExceedanceBucket title="Agriculture Deliveries" data={ds.wet_del_ag_n} compare={compare.wet_del_ag_n} w={100} h={100}></ExceedanceBucket>
                        <ExceedanceBucket title="City Deliveries" data={ds.wet_del_mi_n} compare={compare.wet_del_mi_n} w={100} h={100}></ExceedanceBucket>
                    </div>
                    <p style={styles.headerText}>South of Delta Deliveries</p>
                    <div style={styles.deliverybox}>
                        <ExceedanceBucket title="Agriculture Deliveries" data={ds.wet_del_ag_s} compare={compare.wet_del_ag_s} w={100} h={100}></ExceedanceBucket>
                        <ExceedanceBucket title="City Deliveries" data={ds.wet_del_mi_s} compare={compare.wet_del_mi_s} w={100} h={100}></ExceedanceBucket>
                    </div> */}
                    <DeltaSalinityBar title="Delta Salinity" data={ds.wet_x2_prv} compare={compare.wet_x2_prv} w={40} h={300} />
                    <EquityBar data={ds.wet_equity} compare={compare.wet_equity_value}/>
                </div>
    
            )
        
        }
    
    }

}

export default MetricsBlock