import React from "react";
import {
  ORDER_MARKER,
  STORE_MARKER,
  SingleMarkerProps,
  MOVE_ORDER,
  MOVE_FACTORY,
  MOVE_STORE,
  keyGenerator,
  clientUpdateOrder,
  COMPANY_TENANT,
  FACTORY_MARKER,
  CLIENT_TENANT,
} from "../common";
import { Marker, Popup } from "react-map-gl";
import { UserIcon, StoreIcon, FactoryIcon } from "../assets";
import { mixin } from "lodash";

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

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");

  const handOnDragEnd = (event: any, mk: any) => {
    if (userInfo?.tenantType === COMPANY_TENANT && mk.type === FACTORY_MARKER) {
      // company修改factory
      const newMarker = {
        key: mk.type,
        type: mk.type,
        latitude: event.lngLat[1],
        longitude: event.lngLat[0],
        productName: mk.productName,
        quantity: mk.quantity,
        cost: mk.cost,
      };
      const newDetail = [...detail];
      const replaceIndex = newDetail.findIndex((item) => item.key === mk.key);
      newDetail.splice(replaceIndex, 1, newMarker);
      markersDispatch({ type: moveType, detail: newDetail });
    } else if (userInfo?.tenantType === CLIENT_TENANT) {
      // client修改order;
      const newMarkerKey = keyGenerator();
      const newMarker = {
        key: newMarkerKey,
        type: mk.type,
        latitude: event.lngLat[1],
        longitude: event.lngLat[0],
        productName: mk.productName,
        quantity: mk.quantity,
        cost: mk.cost,
      };
      const newDetail = [...detail];
      const replaceIndex = newDetail.findIndex((item) => item.key === mk.key);
      newDetail.splice(replaceIndex, 1, newMarker);
      markersDispatch({ type: moveType, detail: newDetail });
      if (mk.type === ORDER_MARKER) {
        clientUpdateOrder({
          date: newMarkerKey,
          longitude: event.lngLat[0],
          latitude: event.lngLat[1],
          demand: mk.quantity,
          key: mk.key,
          newKey: newMarkerKey,
          productName: mk.productName,
        });
      }
    }
  };

  const isDraggable =
    (type === ORDER_MARKER && userInfo.tenantType === CLIENT_TENANT) ||
    (type === FACTORY_MARKER && userInfo.tenantType === COMPANY_TENANT);

  return (
    <>
      {detail?.map((mk: SingleMarkerProps) => {
        return (
          <>
            <Popup
              key={`${mk.key}@Popup`}
              longitude={mk.longitude}
              latitude={mk.latitude}
              offsetTop={-20}
              closeButton={false}
            >
              <div>{mk.productName}</div>
              <div>quantity: {mk.quantity}</div>
              {(mk as any).cost ? <div>cost: {(mk as any).cost}</div> : null}
            </Popup>
            <Marker
              key={mk.key}
              longitude={mk.longitude}
              latitude={mk.latitude}
              offsetTop={-20}
              offsetLeft={-10}
              draggable={isDraggable}
              onDragEnd={(event) => {
                handOnDragEnd(event, mk);
              }}
            >
              {icon}
            </Marker>
          </>
        );
      })}
    </>
  );
};

export default CustomizedMarkers;
