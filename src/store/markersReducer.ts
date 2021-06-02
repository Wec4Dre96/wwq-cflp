import {
  ORDER_MARKER,
  STORE_MARKER,
  FACTORY_MARKER,
  SingleMarkerProps,
  ADD_ORDER,
  ADD_STORE,
  ADD_FACTORY,
  REMOVE_ORDER,
  REMOVE_STORE,
  REMOVE_FACTORY,
  MOVE_ORDER,
  MOVE_STORE,
  MOVE_FACTORY,
  keyGenerator,
  EDIT_ORDER,
  EDIT_FACTORY,
  EDIT_STORE,
  SET_USERINFO,
  COMPANY_GET_ORDERS,
  INIT_CLIENT_ORDERS,
  ORDER_TYPES,
  clientUpdateOrder,
  SAVE_TEMP_SNAPSHOT,
} from "../common";
import { clientAddOrder, clientDeleteOrder } from "../common";

export const initialState = {
  position: { latitude: 37.7577, longitude: -122.4376 },
  orders: { type: ORDER_MARKER, detail: [] as SingleMarkerProps[] },
  stores: { type: STORE_MARKER, detail: [] as SingleMarkerProps[] },
  factories: { type: FACTORY_MARKER, detail: [] as SingleMarkerProps[] },
  tempSnapShot: {} as any,
  demandDisplay: { detail: [] },
  currentCompanyProduct: {
    productName: "",
    proId: "",
  },
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case ADD_ORDER:
      const newOrder = {
        key: keyGenerator(),
        type: ORDER_MARKER,
        latitude: action.latitude,
        longitude: action.longitude,
        productName: action.productName,
        quantity: action.quantity,
      };
      // 在服务器增加订单
      clientAddOrder({
        ...newOrder,
        date: newOrder.key,
        demand: newOrder.quantity,
        clientId: JSON.parse(sessionStorage.getItem("userInfo") || "")?.id,
      }).then((res) => {
        console.log("res", res);
      });
      const newOrdersDetail = [...state.orders.detail, newOrder];
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: newOrdersDetail,
        },
      };
    case ADD_STORE:
      const newStoresDetail = [
        ...state.stores.detail,
        {
          key: keyGenerator(),
          type: STORE_MARKER,
          latitude: action.latitude,
          longitude: action.longitude,
          productName: action.productName,
          quantity: action.quantity,
        },
      ];
      return {
        ...state,
        stores: {
          type: STORE_MARKER,
          detail: newStoresDetail,
        },
      };
    case ADD_FACTORY:
      const newFactoriesDetail = [
        ...state.factories.detail,
        {
          key: keyGenerator(),
          type: FACTORY_MARKER,
          latitude: action.latitude,
          longitude: action.longitude,
          productName: action.productName,
          quantity: action.quantity,
          cost: action.cost,
        },
      ];
      return {
        ...state,
        factories: {
          type: FACTORY_MARKER,
          detail: newFactoriesDetail,
        },
      };
    case REMOVE_ORDER:
      const newRemoveOrders = [...state.orders.detail];
      const removeOrderKey = newRemoveOrders.findIndex(
        (mk) => mk.key === action.key
      );
      // 删除服务器订单
      clientDeleteOrder(state.orders.detail[removeOrderKey].key);
      newRemoveOrders.splice(removeOrderKey, 1);
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: newRemoveOrders,
        },
      };
    case REMOVE_STORE:
      const newRemoveStores = [...state.stores.detail];
      newRemoveStores.splice(
        newRemoveStores.findIndex((mk) => mk.key === action.key),
        1
      );
      return {
        ...state,
        stores: {
          type: STORE_MARKER,
          detail: newRemoveStores,
        },
      };
    case REMOVE_FACTORY:
      const newRemoveFactories = [...state.factories.detail];
      newRemoveFactories.splice(
        newRemoveFactories.findIndex((mk) => mk.key === action.key),
        1
      );
      return {
        ...state,
        factories: {
          type: FACTORY_MARKER,
          detail: newRemoveFactories,
        },
      };
    case MOVE_ORDER:
      console.log("action", action);
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: action.detail,
        },
      };
    case MOVE_STORE:
      return {
        ...state,
        stores: {
          type: STORE_MARKER,
          detail: action.detail,
        },
      };
    case MOVE_FACTORY:
      return {
        ...state,
        factories: {
          type: FACTORY_MARKER,
          detail: action.detail,
        },
      };
    case EDIT_ORDER:
      // action.key 原key
      const changedOrderNewKey = keyGenerator();
      const newUserMarker = {
        key: changedOrderNewKey,
        type: action.markerType,
        latitude: action.latitude,
        longitude: action.longitude,
        productName: action.productName,
        quantity: action.quantity,
      };
      const newUserDetail = [...state?.orders?.detail];
      const replaceUserIndex = newUserDetail.findIndex(
        (mk) => mk.key === action.key
      );
      newUserDetail.splice(replaceUserIndex, 1, newUserMarker);
      console.log("action", action);

      clientUpdateOrder({
        date: changedOrderNewKey,
        longitude: action.longitude,
        latitude: action.latitude,
        demand: action.quantity,
        key: action.key,
        newKey: changedOrderNewKey,
        productName: action.productName,
      });
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: newUserDetail,
        },
      };
    case EDIT_FACTORY:
      const newFactoryMarker = {
        key: action.key,
        type: action.markerType,
        latitude: action.latitude,
        longitude: action.longitude,
        productName: action.productName,
        quantity: action.quantity,
      };
      const newFactoryDetail = [...state?.factories?.detail];
      const replaceFactoryIndex = newFactoryDetail.findIndex(
        (mk) => mk.key === action.key
      );
      newFactoryDetail.splice(replaceFactoryIndex, 1, newFactoryMarker);
      return {
        ...state,
        factories: {
          type: FACTORY_MARKER,
          detail: newFactoryDetail,
        },
      };
    case EDIT_STORE:
      const newStoreMarker = {
        key: action.key,
        type: action.markerType,
        latitude: action.latitude,
        longitude: action.longitude,
        productName: action.productName,
        quantity: action.quantity,
      };
      const newStoreDetail = [...state?.stores?.detail];
      const replaceStoreIndex = newStoreDetail.findIndex(
        (mk) => mk.key === action.key
      );
      newStoreDetail.splice(replaceStoreIndex, 1, newStoreMarker);
      return {
        ...state,
        stores: {
          type: STORE_MARKER,
          detail: newStoreDetail,
        },
      };
    case COMPANY_GET_ORDERS:
      console.log("action.data", action.data);
      const newCompanyGetOrders = action?.data.map((it: any) => {
        return {
          key: it.key,
          type: ORDER_MARKER,
          latitude: it.latitude,
          longitude: it.longitude,
          productName: it.productName,
          quantity: it.demand,
        };
      });
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: newCompanyGetOrders,
        },
        currentCompany: {
          proId: action.data[0].proId,
          productName: action.data[0].productName,
        },
      };
    case INIT_CLIENT_ORDERS:
      console.log("init params", action);
      const initClientOrders = action?.data.map((it: any) => {
        return {
          key: it.key,
          type: ORDER_MARKER,
          latitude: it.latitude,
          longitude: it.longitude,
          productName: it.productName,
          quantity: it.demand,
        };
      });
      console.log("initClientOrders", initClientOrders);
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: initClientOrders,
        },
      };
    case SAVE_TEMP_SNAPSHOT:
      return {
        ...state,
        tempSnapShot: action.data,
      };
    default:
      throw new Error();
  }
};
