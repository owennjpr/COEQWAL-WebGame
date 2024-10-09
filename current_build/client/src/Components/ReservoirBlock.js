import React, { useEffect } from 'react'
import ExceedanceBucket from './ExceedanceBucket'

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
                <div style={{position: "absolute", top: 0, left: 350}}>
                    <ExceedanceBucket title="Trinity Level" data={ds.dry_s_trinity} compare={compare.dry_s_trinity} w={120} h={120}></ExceedanceBucket>
                </div>
                <div style={{position: "absolute", top: 0, left: 550}}>
                <   ExceedanceBucket title="Shasta Level" data={ds.dry_s_shasta} compare={compare.dry_s_shasta} w={120} h={120}></ExceedanceBucket>
                </div>

                <div style={{position: "absolute", top: 200, left: 550}}>
                <ExceedanceBucket title="Oroville Level" data={ds.dry_s_oroville} compare={compare.dry_s_oroville} w={120} h={120}></ExceedanceBucket>
                </div>

                <div style={{position: "absolute", top: 475, left: 15}}>
                <ExceedanceBucket title="Folsom Level" data={ds.dry_s_folsom} compare={compare.dry_s_folsom} w={100} h={100}></ExceedanceBucket>
                </div>

                <div style={{position: "absolute", top: 650, left: 15}}>
                <ExceedanceBucket title="New Melones Level" data={ds.dry_s_newmelones} compare={compare.dry_s_newmelones} w={100} h={100}></ExceedanceBucket>
                </div>
                
                <div style={{position: "absolute", top: 670, left: 200}}>
                <ExceedanceBucket title="Millerton Level" data={ds.dry_s_millerton} compare={compare.dry_s_millerton} w={80} h={80}></ExceedanceBucket>
                </div>
            </div>
        )   
    } else {
        return (
            <div style={styles.coreblock}>
                <ExceedanceBucket title="Trinity Level" data={ds.wet_s_trinity} compare={compare.wet_s_trinity} w={100} h={100}></ExceedanceBucket>
                <ExceedanceBucket title="Shasta Level" data={ds.wet_s_shasta} compare={compare.wet_s_shasta} w={100} h={100}></ExceedanceBucket>
                <ExceedanceBucket title="Oroville Level" data={ds.wet_s_oroville} compare={compare.wet_s_oroville} w={100} h={100}></ExceedanceBucket>
                <ExceedanceBucket title="Folsom Level" data={ds.wet_s_folsom} compare={compare.wet_s_folsom} w={100} h={100}></ExceedanceBucket>
                <ExceedanceBucket title="New Melones Level" data={ds.wet_s_newmelones} compare={compare.wet_s_newmelones} w={100} h={100}></ExceedanceBucket>
                <ExceedanceBucket title="Millerton Level" data={ds.wet_s_millerton} compare={compare.wet_s_millerton} w={100} h={100}></ExceedanceBucket>
            </div>

        )
    }
}

export default ReservoirBlock