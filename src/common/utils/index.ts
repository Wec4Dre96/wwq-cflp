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
  };
};

export const getDetailDirections = async (totalMarkers: any) => {
  const { orders, factories } = coordinatesTransfer(totalMarkers);
  const requestArray: any = [];
  const resData: any = [];
  factories.forEach((ts: any) => {
    orders.forEach((te: any) => {
      const pathStr = `${ts.longitude},${ts.latitude};${te.longitude},${te.latitude}`;
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
    });
  });
  await Promise.all(requestArray).then((res) => {
    res.forEach((item: any) => {
      resData.push(item.data.routes[0].geometry.coordinates);
    });
  });
  return resData;
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

// client用来保存订单
export const clientSaveHistory = (userInfo: any, orders: Array<any>) => {
  return null;
};

// // 回滚
// export const historyRollBack = (
//   markersDispatch: Function,
//   factoriesDetail: any,
//   ordersDetail: any
// ) => {};

export * from "./server";
