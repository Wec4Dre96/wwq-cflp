import React from "react";
import {
  ORDER_MARKER,
  STORE_MARKER,
  SingleMarkerProps,
  MOVE_ORDER,
  MOVE_FACTORY,
  MOVE_STORE,
} from "../common";
import { Marker } from "react-map-gl";
import { UserIcon, StoreIcon, FactoryIcon } from "../assets";

const CustomizedMarkers = (props: any) => {
  const { type, detail, markersDispatch } = props;

  let icon: JSX.Element | null = null;
  let moveType = "";
  if (type === ORDER_MARKER) {
    icon = <UserIcon />;
    moveType = MOVE_ORDER;
  } else if (type === STORE_MARKER) {
    icon = <StoreIcon />;
    moveType = MOVE_STORE;
  } else {
    icon = <FactoryIcon />;
    moveType = MOVE_FACTORY;
  }

  const handOnDragEnd = (event: any, mk: any) => {
    const newMarker = {
      key: mk.key,
      type: mk.type,
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
      productType: mk.productType,
      quantity: mk.quantity,
      cost: mk.cost,
    };
    const newDetail = [...detail];
    const replaceIndex = newDetail.findIndex((item) => item.key === mk.key);
    newDetail.splice(replaceIndex, 1, newMarker);
    markersDispatch({ type: moveType, detail: newDetail });
  };

  return (
    <>
      {detail?.map((mk: SingleMarkerProps) => {
        return (
          <Marker
            key={mk.key}
            longitude={mk.longitude}
            latitude={mk.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable
            onDragEnd={(event) => {
              handOnDragEnd(event, mk);
            }}
          >
            {icon}
          </Marker>
        );
      })}
    </>
  );
};

export default CustomizedMarkers;
