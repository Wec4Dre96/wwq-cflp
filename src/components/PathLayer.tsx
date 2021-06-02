import { Layer, Source } from "react-map-gl";

const PathLayer = ({ currentPaths }: { currentPaths: Array<any> }) => {
  // console.log("接受到的paths", currentPaths);
  return (
    <>
      {currentPaths.length &&
        currentPaths.map((path, index) => {
          return (
            <Source
              id={String(path[0][0] * index)}
              key={String(path[0][0] * index)}
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: path,
                },
              }}
            >
              <Layer
                id={String(path[0][0] * index)}
                type="line"
                paint={{
                  "line-color": "#abcccc",
                  "line-width": 4,
                }}
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
              />
            </Source>
          );
        })}
    </>
  );
};

export default PathLayer;
