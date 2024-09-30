import React, {useState, useEffect} from 'react'
import ExceedanceBucket from './ExceedanceBucket'

function MetricsBlock({wyt, ds, compare}) {

    if (wyt === "dry") {
        return (
            <div>
                <h4>North of Delta Deliveries</h4>
                <ExceedanceBucket title="Agriculture Deliveries" data={ds.dry_del_ag_n} compare={compare.dry_del_ag_n}></ExceedanceBucket>
                <ExceedanceBucket title="City Deliveries" data={ds.dry_del_mi_n} compare={compare.dry_del_mi_n}></ExceedanceBucket>
                <h4>South of Delta Deliveries</h4>
                <ExceedanceBucket title="Agriculture Deliveries" data={ds.dry_del_ag_s} compare={compare.dry_del_ag_s}></ExceedanceBucket>
                <ExceedanceBucket title="City Deliveries" data={ds.dry_del_mi_s} compare={compare.dry_del_mi_s}></ExceedanceBucket>
            </div>
        )    
    } else {
        return (
            <div>
                <h4>North of Delta Deliveries</h4>
                <ExceedanceBucket title="Agriculture Deliveries" data={ds.wet_del_ag_n} compare={compare.wet_del_ag_n}></ExceedanceBucket>
                <ExceedanceBucket title="City Deliveries" data={ds.wet_del_mi_n} compare={compare.wet_del_mi_n}></ExceedanceBucket>
                <h4>South of Delta Deliveries</h4>
                <ExceedanceBucket title="Agriculture Deliveries" data={ds.wet_del_ag_s} compare={compare.wet_del_ag_s}></ExceedanceBucket>
                <ExceedanceBucket title="City Deliveries" data={ds.wet_del_mi_s} compare={compare.wet_del_mi_s}></ExceedanceBucket>
            </div>

        )
    
    }

}

export default MetricsBlock