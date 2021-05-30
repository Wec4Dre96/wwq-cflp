import { CLIENT_TENANT, COMPANY_TENANT } from "./../common/constants/index";
import {
  SAVE_HISTORY,
  CLIENT_SAVE_HISTORY,
  FACTORIES_SAVE_HISTORY,
  SingleHistoryRecord,
} from "../common";

export const initialState = [
  {
    time: "12314",
    detail: "factories的数组 []",
    productType: "test",
  },
] as SingleHistoryRecord[];

export const reducer = (state: any, action: any) => {
  console.log("看看action", action);
  switch (action.type) {
    case CLIENT_SAVE_HISTORY:
      // TODO: 用户为client时，存储其orders信息
      console.log("You saved your orders ");

      // 同时需要保存一份本地历史供给company回溯
      const newClientHistories = [...state];
      newClientHistories.push({
        time: new Date().toLocaleString(),
        detail: "client history test",
      });
      return newClientHistories;
    case FACTORIES_SAVE_HISTORY:
      // TODO: 用户为company时，存储其factories信息
      console.log("You saved your histories ");

      // TODO: 同时需要保存一份本地历史供给company回溯
      // const newFactoriesHistories = state.concat(action.detail);
      const newFactoriesHistories = [...state];
      newFactoriesHistories.push({
        time: new Date().toLocaleString(),
        detail: "factories history test",
        productType: "test",
      });
      return newFactoriesHistories;
    // TODO: 是否需要QUERY_HISTORY存疑
    case SAVE_HISTORY:
      const newHistories = [...state];
      newHistories.push({
        time: new Date().toLocaleString(),
        detail: "factories history test",
        productType: "test",
      });
      return newHistories;
    default:
      throw new Error();
  }
};
