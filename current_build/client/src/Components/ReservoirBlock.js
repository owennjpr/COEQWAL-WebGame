import React, { useEffect } from 'react'
import ExceedanceBucket from './ExceedanceBucket'
import DeltaSalinityBar from './DeltaSalinityBar'

function ReservoirBlock({wyt, ds, compare}) {
    
    useEffect(() => {
        console.log(ds)
    }, [ds])

    const styles = {
        coreblock: {
            backgroundColor: "rgb(240, 240, 250)",
            margin: "5px",
            padding: "10px",
            display: "block",
            position: "relative",
        },
        map: {
            width: "100%",
        },
    }

    if (wyt === "dry") {
        return (
            <div style={styles.coreblock}>
                <img src="/Map_of_California_outline_small.png" style={styles.map} alt='map of california' />
                <div style={{position: "absolute", top: 10, left: 50}}>
                    <ExceedanceBucket title="Trinity Level" data={ds.dry_s_trinity} compare={compare.dry_s_trinity} w={75} h={75}></ExceedanceBucket>
                </div>
                <div style={{position: "absolute", top: 50, left: 175}}>
                <   ExceedanceBucket title="Shasta Level" data={ds.dry_s_shasta} compare={compare.dry_s_shasta} w={75} h={75}></ExceedanceBucket>
                </div>

                <div style={{position: "absolute", top: 175, left: 100}}>
                <ExceedanceBucket title="Oroville Level" data={ds.dry_s_oroville} compare={compare.dry_s_oroville} w={75} h={75}></ExceedanceBucket>
                </div>

                <div style={{position: "absolute", top: 250, left: 200}}>
                <ExceedanceBucket title="Folsom Level" data={ds.dry_s_folsom} compare={compare.dry_s_folsom} w={75} h={75}></ExceedanceBucket>
                </div>

                <div style={{position: "absolute", top: 375, left: 250}}>
                <ExceedanceBucket title="New Melones Level" data={ds.dry_s_newmelones} compare={compare.dry_s_newmelones} w={75} h={75}></ExceedanceBucket>
                </div>
                
                <div style={{position: "absolute", top: 500, left: 350}}>
                <ExceedanceBucket title="Millerton Level" data={ds.dry_s_millerton} compare={compare.dry_s_millerton} w={75} h={75}></ExceedanceBucket>
                </div>
                <div style={{position: "absolute", top: 450, left: 30}}>
                <DeltaSalinityBar title="Delta Salinity" data={ds.dry_x2_prv} compare={compare.dry_x2_prv} w={40} h={300} />
                </div>
            </div>
        )   
    } else {
        return (
            <div style={styles.coreblock}>
            <img src="/Map_of_California_outline_small.png" style={styles.map} alt='map of california' />
            <div style={{position: "absolute", top: 10, left: 50}}>
                <ExceedanceBucket title="Trinity Level" data={ds.wet_s_trinity} compare={compare.wet_s_trinity} w={75} h={75}></ExceedanceBucket>
            </div>
            <div style={{position: "absolute", top: 50, left: 175}}>
            <   ExceedanceBucket title="Shasta Level" data={ds.wet_s_shasta} compare={compare.wet_s_shasta} w={75} h={75}></ExceedanceBucket>
            </div>

            <div style={{position: "absolute", top: 175, left: 100}}>
            <ExceedanceBucket title="Oroville Level" data={ds.wet_s_oroville} compare={compare.wet_s_oroville} w={75} h={75}></ExceedanceBucket>
            </div>

            <div style={{position: "absolute", top: 250, left: 200}}>
            <ExceedanceBucket title="Folsom Level" data={ds.wet_s_folsom} compare={compare.wet_s_folsom} w={75} h={75}></ExceedanceBucket>
            </div>

            <div style={{position: "absolute", top: 375, left: 250}}>
            <ExceedanceBucket title="New Melones Level" data={ds.wet_s_newmelones} compare={compare.wet_s_newmelones} w={75} h={75}></ExceedanceBucket>
            </div>
            
            <div style={{position: "absolute", top: 500, left: 350}}>
            <ExceedanceBucket title="Millerton Level" data={ds.wet_s_millerton} compare={compare.wet_s_millerton} w={75} h={75}></ExceedanceBucket>
            </div>
            <div style={{position: "absolute", top: 450, left: 30}}>
            <DeltaSalinityBar title="Delta Salinity" data={ds.wet_x2_prv} compare={compare.wet_x2_prv} w={40} h={300} />
            </div>
        </div>
        )
    }
}

export default ReservoirBlock