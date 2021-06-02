import axios from "axios";
import { MAPBOX_TOKEN } from "..";

export const keyGenerator = () => {
  return String(Date.now());
};

export const coordinatesTransfer = (totalMarkers: any) => {
  const orders = totalMarkers?.orders?.detail.map((order: any) => {
    return {
      latitude: order.latitude,
      longitude: order.longitude,
      productName: order.productName,
      quantity: order.quantity,
      time: order.key,
    };
  });
  const factories = totalMarkers?.factories?.detail.map((factory: any) => {
    return {
      latitude: factory.latitude,
      longitude: factory.longitude,
      productName: factory.productName,
      capacity: factory.quantity,
      cost: factory.cost,
    };
  });
  return {
    orders,
    factories,
    tempSnapshot: totalMarkers.tempSnapshot,
  };
};

export const getDetailDirections = async (totalMarkers: any) => {
  // const { tempSnapshot, orders, factories } = coordinatesTransfer(totalMarkers);
  // const { tempSnapshot, orders, factories } = totalMarkers;
  // console.log("totalMarkers", totalMarkers);
  console.log('看看totalMarkers', totalMarkers);
  const { tempSnapshot } = totalMarkers;
  const { clients, facilities, isSelected, quantity } = tempSnapshot;
  const requestArray: any = [];
  const resData: any = [];

  facilities?.forEach((ts: any, facIndex: any) => {
    if (isSelected[facIndex]) {
      clients.forEach((te: any, ordIndex: any) => {
        console.log("coordinate", ordIndex, facIndex);
        console.log("=> quantity", quantity[ordIndex][facIndex]);
        if (quantity[ordIndex][facIndex]) {
          const pathStr = `${ts.longitude},${ts.latitude};${te.longitude},${te.latitude}`;
          console.log("pathStr", pathStr);
          requestArray.push(
            axios({
              method: "get",
              url: `https://api.mapbox.com/directions/v5/mapbox/walking/${pathStr}`,
              params: {
                geometries: "geojson",
                access_token: MAPBOX_TOKEN,
              },
            })
          );
        }
      });
    }
  });

  // 先把临时average保存下来
  const tempAverage = [] as any;
  // 再根据average去适配quantity矩阵
  const pathMarkers = [] as any;
  await Promise.all(requestArray).then((res) => {
    res.forEach((item: any) => {
      const tempCoor = item.data.routes[0].geometry.coordinates;
      resData.push(tempCoor);
      const tempLength = tempCoor.length;
      tempAverage.push(
        getAverage(tempCoor[tempLength - 1], tempCoor[tempLength - 2])
      );
    });
  });
  facilities?.forEach((outer: any, oIndex: any) => {
    if (isSelected[oIndex]) {
      clients.forEach((inner: any, iIndex: any) => {
        if (quantity[iIndex][oIndex]) {
          // 工厂 + 订单对应点位存在
          pathMarkers.push(
            tempAverage.splice(0, 1).concat(quantity[iIndex][oIndex])
          );
        }
      });
    }
  });
  console.log("看看最终的tempAverage", tempAverage);
  console.log("看看最终的pathMarkers", pathMarkers);
  return {
    pathData: resData,
    pathMarkers: pathMarkers,
  };
};

const getAverage = (p1: any, p2: any) => {
  const newFirst = (p1[0] + p2[0]) / 2;
  const newSecond = (p1[1] + p2[1]) / 2;
  return [newFirst, newSecond];
};

// company来根据productType获取历史记录
// client进入地图默认请求并挂载历史记录
export const getHistories = async (email: string, productName?: string) => {
  if (productName) {
    // company查询历史
  } else {
    // client全量加载
  }
  return null;
};

// company用来保存历史记录
export const companySaveHistory = (email: string, factories: Array<any>) => {
  return null;
};

// // 回滚
// export const historyRollBack = (
//   markersDispatch: Function,
//   factoriesDetail: any,
//   ordersDetail: any
// ) => {};

export * from "./server";
