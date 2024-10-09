import React from 'react'
import ExceedanceBucket from './ExceedanceBucket'

function MetricsBlock({wyt, ds, compare}) {
    const styles = {
        deliverybox: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
        },
        coreblock: {
            backgroundColor: "rgb(240, 240, 250)",
            margin: "5px",
            padding: "10px",
            display: "block",
        },
        headerText: {
            textAlign: "center",
            margin: "10px",
            fontWeight: "bold",
        }
    }

    if (wyt === "dry") {
        return (
            <div style={styles.coreblock}>
                <p style={styles.headerText}>North of Delta Deliveries</p>
                <div style={styles.deliverybox}>
                    <ExceedanceBucket title="Agriculture Deliveries" data={ds.dry_del_ag_n} compare={compare.dry_del_ag_n} w={100} h={100}></ExceedanceBucket>
                    <ExceedanceBucket title="City Deliveries" data={ds.dry_del_mi_n} compare={compare.dry_del_mi_n} w={100} h={100}></ExceedanceBucket>
                </div>
                <p style={styles.headerText}>South of Delta Deliveries</p>
                <div style={styles.deliverybox}>
                    <ExceedanceBucket title="Agriculture Deliveries" data={ds.dry_del_ag_s} compare={compare.dry_del_ag_s} w={100} h={100}></ExceedanceBucket>
                    <ExceedanceBucket title="City Deliveries" data={ds.dry_del_mi_s} compare={compare.dry_del_mi_s} w={100} h={100}></ExceedanceBucket>
                </div>
            </div>
        )    
    } else {
        return (
            <div style={styles.coreblock}>
                <p style={styles.headerText}>North of Delta Deliveries</p>
                <div style={styles.deliverybox}>
                    <ExceedanceBucket title="Agriculture Deliveries" data={ds.wet_del_ag_n} compare={compare.wet_del_ag_n} w={100} h={100}></ExceedanceBucket>
                    <ExceedanceBucket title="City Deliveries" data={ds.wet_del_mi_n} compare={compare.wet_del_mi_n} w={100} h={100}></ExceedanceBucket>
                </div>
                <p style={styles.headerText}>North of Delta Deliveries</p>
                <div style={styles.deliverybox}>
                    <ExceedanceBucket title="Agriculture Deliveries" data={ds.wet_del_ag_s} compare={compare.wet_del_ag_s} w={100} h={100}></ExceedanceBucket>
                    <ExceedanceBucket title="City Deliveries" data={ds.wet_del_mi_s} compare={compare.wet_del_mi_s} w={100} h={100}></ExceedanceBucket>
                </div>
            </div>

        )
    
    }

}

export default MetricsBlock