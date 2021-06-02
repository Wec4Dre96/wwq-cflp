import { Marker } from "react-map-gl";

const DemandDisplay = (props: any) => {
  const { detail } = props;

  console.log('看看detail', detail);
  return (
    <>
      {detail?.map((mk: any, index: any) => {
        return (
          <Marker
            className="demand-display-marker"
            key={`${mk[0][0] * index}`}
            longitude={mk[0][0]}
            latitude={mk[0][1]}
            offsetTop={-20}
            offsetLeft={-10}
            draggable={false}
          >
            {mk[1]}
          </Marker>
        );
      })}
    </>
  );
};

export default DemandDisplay;
