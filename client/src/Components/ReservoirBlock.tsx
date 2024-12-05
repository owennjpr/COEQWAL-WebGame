import React, { CSSProperties } from "react";
import ExceedanceBucket from "./ExceedanceBucket";
import { CompareState, DataState } from "../types";

type Style = CSSProperties;

interface ReservoirBlockProps {
  wyt: string;
  ds: DataState;
  compare: CompareState;
}

function ReservoirBlock(props: ReservoirBlockProps) {
  const { wyt, ds, compare } = props;

  if (ds === undefined || compare === undefined) {
    return <div style={styles.coreblock} />;
  } else {
    if (wyt === "dry") {
      return (
        <div style={styles.coreblock}>
          <img
            src="/Map_of_California_outline_small.png"
            style={styles.map}
            alt="map of california"
          />
          <div style={{ position: "absolute", top: 10, left: 325 }}>
            <ExceedanceBucket
              title="Trinity Level"
              data={ds.dry_s_trinity}
              compare={compare.dry_s_trinity}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 10, left: 450 }}>
            <ExceedanceBucket
              title="Shasta Level"
              data={ds.dry_s_shasta}
              compare={compare.dry_s_shasta}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 10, left: 575 }}>
            <ExceedanceBucket
              title="Oroville Level"
              data={ds.dry_s_oroville}
              compare={compare.dry_s_oroville}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 150, left: 325 }}>
            <ExceedanceBucket
              title="Folsom Level"
              data={ds.dry_s_folsom}
              compare={compare.dry_s_folsom}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 150, left: 450 }}>
            <ExceedanceBucket
              title="New Melones Level"
              data={ds.dry_s_newmelones}
              compare={compare.dry_s_newmelones}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 150, left: 575 }}>
            <ExceedanceBucket
              title="Millerton Level"
              data={ds.dry_s_millerton}
              compare={compare.dry_s_millerton}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 10, left: 50 }}>
            <ExceedanceBucket
              title="Agriculture Deliveries"
              data={ds.dry_del_ag_n}
              compare={compare.dry_del_ag_n}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 175, left: 120 }}>
            <ExceedanceBucket
              title="City Deliveries"
              data={ds.dry_del_mi_n}
              compare={compare.dry_del_mi_n}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 350, left: 200 }}>
            <ExceedanceBucket
              title="Agriculture Deliveries"
              data={ds.dry_del_ag_s}
              compare={compare.dry_del_ag_s}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 475, left: 350 }}>
            <ExceedanceBucket
              title="City Deliveries"
              data={ds.dry_del_mi_s}
              compare={compare.dry_del_mi_s}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
        </div>
      );
    } else {
      return (
        <div style={styles.coreblock}>
          <img
            src="/Map_of_California_outline_small.png"
            style={styles.map}
            alt="map of california"
          />
          <div style={{ position: "absolute", top: 10, left: 325 }}>
            <ExceedanceBucket
              title="Trinity Level"
              data={ds.wet_s_trinity}
              compare={compare.wet_s_trinity}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 10, left: 450 }}>
            <ExceedanceBucket
              title="Shasta Level"
              data={ds.wet_s_shasta}
              compare={compare.wet_s_shasta}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 10, left: 575 }}>
            <ExceedanceBucket
              title="Oroville Level"
              data={ds.wet_s_oroville}
              compare={compare.wet_s_oroville}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 150, left: 325 }}>
            <ExceedanceBucket
              title="Folsom Level"
              data={ds.wet_s_folsom}
              compare={compare.wet_s_folsom}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 150, left: 450 }}>
            <ExceedanceBucket
              title="New Melones Level"
              data={ds.wet_s_newmelones}
              compare={compare.wet_s_newmelones}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 150, left: 575 }}>
            <ExceedanceBucket
              title="Millerton Level"
              data={ds.wet_s_millerton}
              compare={compare.wet_s_millerton}
              w={75}
              h={75}
            ></ExceedanceBucket>
          </div>

          <div style={{ position: "absolute", top: 10, left: 50 }}>
            <ExceedanceBucket
              title="Agriculture Deliveries"
              data={ds.wet_del_ag_n}
              compare={compare.wet_del_ag_n}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 175, left: 120 }}>
            <ExceedanceBucket
              title="City Deliveries"
              data={ds.wet_del_mi_n}
              compare={compare.wet_del_mi_n}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 350, left: 200 }}>
            <ExceedanceBucket
              title="Agriculture Deliveries"
              data={ds.wet_del_ag_s}
              compare={compare.wet_del_ag_s}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
          <div style={{ position: "absolute", top: 475, left: 350 }}>
            <ExceedanceBucket
              title="City Deliveries"
              data={ds.wet_del_mi_s}
              compare={compare.wet_del_mi_s}
              w={75}
              h={100}
            ></ExceedanceBucket>
          </div>
        </div>
      );
    }
  }
}

export default ReservoirBlock;
const styles = {
  coreblock: {
    backgroundColor: "rgb(240, 240, 250)",
    marginTop: "5px",
    marginBottom: "5px",
    padding: "10px",
    display: "block",
    position: "relative",
  } as Style,
  map: {
    width: "100%",
  } as Style,
};
