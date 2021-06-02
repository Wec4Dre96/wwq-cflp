import { Marker } from "react-map-gl";

const DemandDisplay = (props: any) => {
  const { detail } = props;

  return (
    <>
      {detail?.map((mk: any) => {
        return (
          <Marker
            className="demand-display-marker"
            key={mk.key}
            longitude={mk.longitude}
            latitude={mk.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable={false}
          >
            {mk.demand}
          </Marker>
        );
      })}
    </>
  );
};

export default DemandDisplay;
