import React, { CSSProperties } from "react";
import ExceedanceBucket from "./ExceedanceBucket";
import { CompareState, DataState } from "../types";
import EquityBar from "./EquityBar";
import DeltaPopup from "./DeltaPopup";
import DeltaSalinityVisual from "./DeltaSalinityVisual";

type Style = CSSProperties;

interface DataBlockProps {
  ds: DataState;
  compare: CompareState;
}

const resSize = "9vmin";

function DataBlock(props: DataBlockProps) {
  const { ds, compare } = props;

  if (ds === undefined || compare === undefined) {
    return <div style={styles.coreblock} />;
  } else {
    return (
      <div
        style={{
          position: "relative",
          width: "fit-content",
          height: "fit-content",
          background: "#FFFFFF70",
          margin: 10,
          padding: 10,
          marginLeft: 5,
          marginRight: 5,
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 8px rgb(213, 213, 213)",
        }}
      >
        <img
          src="/Map_of_California_outline_small.png"
          style={{
            width: "fit-content",
            height: "80vmin",
            marginLeft: "5vmin",
            marginRight: "15vmin",
            // opacity: 0.6,
          }}
          alt="map of california"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplate: "repeat(7, 1fr) / repeat(7, 1fr) ",
          }}
        >
          {/* Reservoirs */}
          <div
            style={{
              gridColumnStart: 4,
              gridColumnEnd: 8,
              gridRowStart: 1,
              gridRowEnd: 4,
              width: "100%",
              height: "100%",
              // background: "violet",
              // opacity: 0.75,
            }}
          >
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
          </div>

          {/* Equity */}
          <div
            style={{
              gridColumnStart: 7,
              gridColumnEnd: 8,
              gridRowStart: 4,
              gridRowEnd: 8,
              width: "100%",
              height: "100%",
              // background: "orange",
              // opacity: 0.75,
            }}
          >
            <EquityBar
              data_dry={ds.dry_equity}
              data_wet={ds.wet_equity}
              compare_dry={compare.dry_equity_value}
              compare_wet={compare.wet_equity_value}
              w={"6vmin"}
              h="30vmin"
            />
          </div>

          {/* delta */}
          <div
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 3,
              gridRowStart: 5,
              gridRowEnd: 7,
              width: "100%",
              height: "100%",
              // background: "red",
              // opacity: 0.75,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DeltaPopup
              deltaVis={
                <DeltaSalinityVisual
                  title="Delta Salinity"
                  data_dry={ds.dry_x2_prv}
                  data_wet={ds.wet_x2_prv}
                  compare_dry={compare.dry_x2_prv}
                  compare_wet={compare.wet_x2_prv}
                  w={"50px"}
                  h={"100%"}
                />
              }
            />
          </div>

          {/* deliveries */}
          <div
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 4,
              gridRowStart: 1,
              gridRowEnd: 3,
              width: "100%",
              height: "100%",
              // background: "aqua",
              // opacity: 0.75,
              paddingLeft: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExceedanceBucket
              title="Agriculture Deliveries N"
              data_wet={ds.wet_del_ag_n}
              data_dry={ds.dry_del_ag_n}
              compare_wet={compare.wet_del_ag_n}
              compare_dry={compare.dry_del_ag_n}
              w={resSize}
              h={resSize}
            />
          </div>
          <div
            style={{
              gridColumnStart: 2,
              gridColumnEnd: 4,
              gridRowStart: 3,
              gridRowEnd: 5,
              width: "100%",
              height: "100%",
              // background: "purple",
              // opacity: 0.75,
              paddingLeft: "2rem",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
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
          <div
            style={{
              gridColumnStart: 3,
              gridColumnEnd: 5,
              gridRowStart: 5,
              gridRowEnd: 7,
              width: "100%",
              height: "100%",
              // background: "beige",
              // opacity: 0.75,
              paddingLeft: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <ExceedanceBucket
              title="Agriculture Deliveries S"
              data_wet={ds.wet_del_ag_s}
              data_dry={ds.dry_del_ag_s}
              compare_wet={compare.wet_del_ag_s}
              compare_dry={compare.dry_del_ag_s}
              w={resSize}
              h={resSize}
            />
          </div>
          <div
            style={{
              gridColumnStart: 5,
              gridColumnEnd: 7,
              gridRowStart: 5,
              gridRowEnd: 8,
              width: "100%",
              height: "100%",
              // background: "teal",
              // opacity: 0.75,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExceedanceBucket
              title="City Deliveries S"
              data_wet={ds.wet_del_mi_s}
              data_dry={ds.dry_del_mi_s}
              compare_wet={compare.wet_del_mi_s}
              compare_dry={compare.dry_del_mi_s}
              w={resSize}
              h={resSize}
            />
          </div>

          {/* {Array.apply(null, Array(49)).map(() => (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "red",
                opacity: 0.4,
              }}
            />
          ))} */}
        </div>
      </div>
    );
  }
}

export default DataBlock;

const styles = {
  coreblock: {
    width: "100%",
    height: "100%",
    margin: "5px",
    padding: "10px",
    display: "block",
    position: "relative",
  } as Style,
  gridItem: {
    gridColumnStart: 3,
    gridColumnEnd: 5,
    gridRowStart: 5,
    gridRowEnd: 7,
    width: "100%",
    height: "100%",
    background: "beige",
    opacity: 0.75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as Style,
  map: {
    display: "block",
    boxSizing: "border-box",
    width: "75vmin",
    height: "100%",
    marginLeft: "5%",
    marginRight: "10%",
    opacity: 0.6,
    background: "white",
  } as Style,
  reservoirGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: "1rem",
    marginLeft: "1rem",
  } as Style,
};
