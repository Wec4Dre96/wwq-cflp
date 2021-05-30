import React from "react";
import { FACTORY_MARKER, STORE_MARKER, ORDER_MARKER } from "../common";
import CustomizedMarkers from "./CustomizedMarkers";

const MarkerLayer = (props: any) => {
  const { totalMarkers, markersDispatch } = props;
  return (
    <>
      <CustomizedMarkers
        type={ORDER_MARKER}
        detail={totalMarkers.orders?.detail}
        markersDispatch={markersDispatch}
      />
      {/* <CustomizedMarkers
        type={STORE_MARKER}
        detail={totalMarkers.stores?.detail}
        markersDispatch={markersDispatch}
      /> */}
      <CustomizedMarkers
        type={FACTORY_MARKER}
        detail={totalMarkers.factories?.detail}
        markersDispatch={markersDispatch}
      />
    </>
  );
};

export default MarkerLayer;
