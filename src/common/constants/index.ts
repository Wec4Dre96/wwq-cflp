export const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid3V3ZW5xaS1kZXBwIiwiYSI6ImNrbWE2cDJodzB6Z24yc28yeWxiZHd2aGwifQ.sW0Dt7X0RXnp5IZ7LTC_Aw";
export const POSITION_CHANGE = "positionChange";

export const FACTORY_MARKER = "factoryMarker";
export const STORE_MARKER = "storeMarker";
export const ORDER_MARKER = "userMarker";

export const ADD_MARKER = "addMarker";
export const ADD_ORDER = "addUser";
export const ADD_STORE = "addStore";
export const ADD_FACTORY = "addFactory";
export const REMOVE_ORDER = "removeUser";
export const REMOVE_STORE = "removeStore";
export const REMOVE_FACTORY = "removeFactory";
export const MOVE_ORDER = "moveUser";
export const MOVE_STORE = "moveStore";
export const MOVE_FACTORY = "moveFactory";
export const EDIT_ORDER = "editUser";
export const EDIT_STORE = "editStore";
export const EDIT_FACTORY = "editFactory";

export const COMPANY_TENANT = "company";
export const CLIENT_TENANT = "client";

export const CLIENT_SAVE_HISTORY = "clientSaveHistory";
export const FACTORIES_SAVE_HISTORY = "factoriesSaveHistory";

export const ADD_TYPES = [ADD_ORDER, ADD_FACTORY, ADD_STORE];
export const EDIT_TYPES = [EDIT_ORDER, EDIT_STORE, EDIT_FACTORY];

export const ORDER_TYPES = [ADD_ORDER, EDIT_ORDER];
export const FACTORY_TYPES = [ADD_FACTORY, EDIT_FACTORY];

export const SAVE_HISTORY = "saveHistory";
export const BASE_URL = "http://8.140.172.186:8080";

export const USER_INFO = "userInfo";
export const SET_USERINFO = "setUserInfo";

export const COMPANY_GET_ORDERS = 'companyGetOrders';
export const INIT_CLIENT_ORDERS = 'initClientOrders';

export const SAVE_TEMP_SNAPSHOT = 'saveTempSnapshot';
export const SAVE_SNAPSHOT = 'saveSnapshot';
export const SET_DEMAND_DISPLAY = 'setDemandDisplay';

export const CLEAN_MARKERS = 'cleanMarkers';
export const SNAPSHOT_ROLLBACK = 'snapshotRollback';

// const res = await axios({
//   url: "https://qctz2d.fn.thelarkcloud.com/getPaths",
//   method: "get",
//   params: {
//     pointsStr:
//       "116.47133481200402,39.87523429950629;116.47133481200402,39.88307019003369",
//   },
// });
// console.log("看看res", res);
// console.log("清空路径");
// setCurrentPaths([]);

// getPathDirections(
//   {
//     longitude: 116.47133481200402,
//     latitude: 39.87523429950629,
//   },
//   {
//     longitude: 116.47133481200402,
//     latitude: 39.88307019003369,
//   }
// ).then((res) => {
//   const newPaths = [...currentPaths];
//   res.data.data.routes.forEach((path: any) => {
//     newPaths.push(path);
//   });
//   console.log("重设路径");
//   setCurrentPaths(newPaths);
// });

// });
// const geojson = {
//   type: "Feature",
//   properties: {},
//   geometry: {
//     type: "LineString",
//     coordinates: [
//       [116.47133481200402, 39.87523429950629],
//       [116.47133481200402, 39.88307019003369],
//       [116.47933481200402, 39.88307019003369],
//     ],
//   },
// };
// mapInstance.addLayer({
//   id: "route1",
//   type: "line",
//   source: {
//     type: "geojson",
//     data: geojson,
//   },
//   layout: {
//     "line-join": "round",
//     "line-cap": "round",
//   },
//   paint: {
//     "line-color": "#3887be",
//     "line-width": 5,
//     "line-opacity": 0.75,
//   },
// });
// mapInstance.addSource("route1", {
//   type: "geojson",
//   data: {
//     type: "Feature",
//     properties: {},
//     geometry: {
//       type: "LineString",
//       coordinates: [
//         [116.47133481200402, 39.87523429950629],
//         [116.47133481200402, 39.88307019003369],
//         [116.47933481200402, 39.88307019003369],
//       ],
//     },
//   },
// });
// mapInstance.addSource("route2", {
//   type: "geojson",
//   data: {
//     type: "Feature",
//     properties: {},
//     geometry: {
//       type: "LineString",
//       coordinates: [
//         [116.47133481200402, 39.87523429950629],
//         [116.47133481200402, 39.88307019003369],
//         [116.47933481200402, 39.89307019003369],
//       ],
//     },
//   },
// });
// mapInstance.addLayer({
//   id: "route1",
//   type: "line",
//   source: "route1",
//   layout: {
//     "line-join": "round",
//     "line-cap": "round",
//   },
//   paint: {
//     "line-color": "blue",
//     "line-width": 4,
//   },
// });
// mapInstance.addLayer({
//   id: "route2",
//   type: "line",
//   source: "route2",
//   layout: {
//     "line-join": "round",
//     "line-cap": "round",
//   },
//   paint: {
//     "line-color": "blue",
//     "line-width": 4,
//   },
// });

// 绘制路径前的点位信息
// const a = {
//   order: [
//     {'longitude', 'latitude', 'quantity', 'productName', 'time'},
//     {'longitude', 'latitude', 'quantity', 'productName', 'time'},
//     {'longitude', 'latitude', 'quantity', 'productName', 'time'},
//   ],
//   factories: [
//     {'longitude', 'latitude', 'capacity', 'productName', 'cost'},
//     {'longitude', 'latitude', 'capacity', 'productName', 'cost'},
//     {'longitude', 'latitude', 'capacity', 'productName', 'cost'},
//   ],
// }

// company保存订单
// const factories = [
//     {'longitude', 'latitude', 'capacity', 'productName', 'cost'},
//     {'longitude', 'latitude', 'capacity', 'productName', 'cost'},
//     {'longitude', 'latitude', 'capacity', 'productName', 'cost'},
//   ]
// {
//   code: ;
//   data: {
//     factories: [];
//     time: ;
//   }
// }
// 用户个人的orders
// company分析后的factories: 



// 公司只保存factories

// 并发请求
// const p1 = axios({
//   method: "post",
//   url: "http://8.140.172.186:8080/passport/login",
//   data: {
//     pwd: "123456",
//     userInput: "abc@sina.com",
//   },
// });

// const p2 = axios({
//   method: "post",
//   url: "http://8.140.172.186:8080/passport/login",
//   data: {
//     pwd: "123",
//     userInput: "alice@sina.com",
//   },
// });
// Promise.all([p1, p2]).then((res) => console.log(res));
