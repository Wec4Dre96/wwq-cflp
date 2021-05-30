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
} from "../common";
import { clientAddOrder, clientDeleteOrder } from "../common";

export const initialState = {
  position: { latitude: 37.7577, longitude: -122.4376 },
  orders: { type: ORDER_MARKER, detail: [] as SingleMarkerProps[] },
  stores: { type: STORE_MARKER, detail: [] as SingleMarkerProps[] },
  factories: { type: FACTORY_MARKER, detail: [] as SingleMarkerProps[] },
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
        productType: action.productType,
        quantity: action.quantity,
      };
      // 在服务器增加订单
      clientAddOrder({
        ...newOrder,
        clientId: JSON.parse(sessionStorage.getItem("userInfo") || "")?.id,
        date: newOrder.key,
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
          productType: action.productType,
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
          productType: action.productType,
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
      const newUserMarker = {
        key: action.key,
        type: action.markerType,
        latitude: action.latitude,
        longitude: action.longitude,
        productType: action.productType,
        quantity: action.quantity,
      };
      const newUserDetail = [...state?.orders?.detail];
      const replaceUserIndex = newUserDetail.findIndex(
        (mk) => mk.key === action.key
      );
      newUserDetail.splice(replaceUserIndex, 1, newUserMarker);
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
        productType: action.productType,
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
        productType: action.productType,
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
      const newCompanyGetOrders = action?.data?.data.map((it: any) => {
        return {
          key: it.key,
          type: ORDER_MARKER,
          latitude: it.latitude,
          longitude: it.longitude,
          pruductType: it.productType,
          quantity: it.demand,
        };
      });
      return {
        ...state,
        orders: {
          type: ORDER_MARKER,
          detail: newCompanyGetOrders,
        },
      };
    default:
      throw new Error();
  }
};
