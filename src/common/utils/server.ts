import { BASE_URL, MAPBOX_TOKEN } from "../constants";
import axios from "axios";

const request = axios.create({
  baseURL: BASE_URL,
});

// const BASE_URL =
//   "https://api.mapbox.com/directions/v5/mapbox/walking";

// 做一层封装
export const getPathDirections = (startCo: any, endCo: any) => {
  return request({
    method: "get",
    url: `${startCo.longitude},${startCo.latitude};${endCo.longitude},${endCo.latitude}`,
    params: {
      geometries: "geojson",
      access_token: MAPBOX_TOKEN,
    },
  });
};

// 用户信息处理
export const registerUserInfo = async (userInfo: any) => {
  try {
    const res = await request({
      method: "post",
      url: "passport/register",
      data: userInfo,
    });
    return res.data;
  } catch (e) {
    console.log("注册接口错误", e);
  }
};

export const getUserInfo = async (params: any) => {
  try {
    const res = await request({
      method: "post",
      url: "passport/login",
      data: params,
    });
    return res.data;
  } catch (e) {
    return {};
  }
};

// order相关操作
export const clientAddOrder = async (rqsParams: any) => {
  try {
    const res = await request({
      method: "post",
      url: "order",
      data: {
        ...rqsParams,
        data: rqsParams.key,
        productName: rqsParams.productType,
      },
    });
    return res.data;
  } catch (e) {
    console.log("clientAddOrder挂了", e);
  }
};

export const clientDeleteOrder = async (orderKey: string) => {
  try {
    const res = await request({
      method: "delete",
      url: `order/${orderKey}`,
      data: {
        orderId: orderKey,
      }
    });
    return res.data;
  } catch (e) {
    console.log("clientDeleteOrder挂了", e);
  }}

export const getAllClientOrder = async (clientId: string) => {
  try {
    const res = await request({
      method: "post",
      url: `order/client/${clientId}`,
    });
    return res.data;
  } catch (e) {
    console.log("getAllClientOrder挂了", e);
  }
};

export const companyGetOrders = async (productType: string) => {
  try {
    const res = await request({
      method: "get",
      url: `product/${productType}`,
    });
    return res.data;
  } catch (e) {
    console.log("companyGetOrders挂了", e);
  }
}

export const companyGetTypeOrders = async (productName: any) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://8.140.172.186:8080/product/${productName}`,
    });
    return res.data;
  } catch (e) {
    return {};
  }
}
