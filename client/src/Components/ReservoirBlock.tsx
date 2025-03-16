import React, { CSSProperties } from "react";
import ExceedanceBucket from "./ExceedanceBucket";
import { CompareState, DataState } from "../types";

type Style = CSSProperties;

interface ReservoirBlockProps {
  wyt: string;
  ds: DataState;
  compare: CompareState;
}

const resSize = "9vmin";

function ReservoirBlock(props: ReservoirBlockProps) {
  const { wyt, ds, compare } = props;

  if (ds === undefined || compare === undefined) {
    return <div style={styles.coreblock} />;
  } else {
    return (
      <div style={styles.coreblock}>
        <img
          src="/Map_of_California_outline_small.png"
          style={styles.map}
          alt="map of california"
        />
        <div style={styles.reservoirGrid}>
          <ExceedanceBucket
            title="Trinity Level"
            data_wet={ds.wet_s_trinity}
            data_dry={ds.dry_s_trinity}
            compare_wet={compare.wet_s_trinity}
            compare_dry={compare.dry_s_trinity}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>
          <ExceedanceBucket
            title="Shasta"
            data_wet={ds.wet_s_shasta}
            data_dry={ds.dry_s_shasta}
            compare_wet={compare.wet_s_shasta}
            compare_dry={compare.dry_s_shasta}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>

          <ExceedanceBucket
            title="Oroville"
            data_wet={ds.wet_s_oroville}
            data_dry={ds.dry_s_oroville}
            compare_wet={compare.wet_s_oroville}
            compare_dry={compare.dry_s_oroville}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>

          <ExceedanceBucket
            title="Folsom"
            data_wet={ds.wet_s_folsom}
            data_dry={ds.dry_s_folsom}
            compare_wet={compare.wet_s_folsom}
            compare_dry={compare.dry_s_folsom}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>

          <ExceedanceBucket
            title="New Melones"
            data_wet={ds.wet_s_newmelones}
            data_dry={ds.dry_s_newmelones}
            compare_wet={compare.wet_s_newmelones}
            compare_dry={compare.dry_s_newmelones}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>

          <ExceedanceBucket
            title="Millerton"
            data_wet={ds.wet_s_millerton}
            data_dry={ds.dry_s_millerton}
            compare_wet={compare.wet_s_millerton}
            compare_dry={compare.dry_s_millerton}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>
        </div>
        <div style={{ position: "absolute", top: "2%", left: "10%" }}>
          <ExceedanceBucket
            title="Agriculture Deliveries N"
            data_wet={ds.wet_del_ag_n}
            data_dry={ds.dry_del_ag_n}
            compare_wet={compare.wet_del_ag_n}
            compare_dry={compare.dry_del_ag_n}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>
        </div>
        <div style={{ position: "absolute", top: "20%", left: "15%" }}>
          <ExceedanceBucket
            title="City Deliveries N"
            data_wet={ds.wet_del_mi_n}
            data_dry={ds.dry_del_mi_n}
            compare_wet={compare.wet_del_mi_n}
            compare_dry={compare.dry_del_mi_n}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>
        </div>
        <div style={{ position: "absolute", top: "40%", left: "25%" }}>
          <ExceedanceBucket
            title="Agriculture Deliveries S"
            data_wet={ds.wet_del_ag_s}
            data_dry={ds.dry_del_ag_s}
            compare_wet={compare.wet_del_ag_s}
            compare_dry={compare.dry_del_ag_s}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>
        </div>
        <div style={{ position: "absolute", top: "60%", left: "40%" }}>
          <ExceedanceBucket
            title="City Deliveries S"
            data_wet={ds.wet_del_mi_s}
            data_dry={ds.dry_del_mi_s}
            compare_wet={compare.wet_del_mi_s}
            compare_dry={compare.dry_del_mi_s}
            w={resSize}
            h={resSize}
          ></ExceedanceBucket>
        </div>
      </div>
    );
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
    maxWidth: "70min",
    height: "70vmin",
  } as Style,
  reservoirGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: "1rem",
    position: "absolute",
    top: 0,
    left: "50%",
  } as Style,
};
