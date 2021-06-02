import { useState, useEffect } from "react";
import { Menu, List, message } from "antd";
import {
  SettingTwoTone,
  FireTwoTone,
  MinusOutlined,
  AimOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  DisplayMarkers,
  REMOVE_ORDER,
  REMOVE_FACTORY,
  ADD_TYPES,
  EDIT_TYPES,
  EDIT_ORDER,
  EDIT_FACTORY,
  CLIENT_TENANT,
  ADD_ORDER,
  ADD_FACTORY,
  ADD_STORE,
  ORDER_TYPES,
  FACTORY_TYPES,
  getDetailDirections,
  getAllClientOrder,
  COMPANY_TENANT,
  INIT_CLIENT_ORDERS,
  SAVE_TEMP_SNAPSHOT,
  SET_DEMAND_DISPLAY,
  companyGetPointsPair,
} from "../common";
import {
  DisplayWrapper,
  ListWrapper,
  IconWrapper,
  IconGroup,
  PositionText,
} from "../styledComponents";
import MapHeader from "./MapHeader";
import { ViewportProps } from "react-map-gl";
import MarkerModal from "./MarkerModal";
import FactoryModal from "./FactoryModal";

const { SubMenu } = Menu;

const MarkersDisplay = ({
  currentViewport,
  onViewportChange,
  totalMarkers,
  markersDispatch,
  setCurrentPaths,
  userInfo,
}: {
  currentViewport: ViewportProps;
  onViewportChange: Function;
  totalMarkers: DisplayMarkers;
  markersDispatch: Function;
  setCurrentPaths: Function;
  userInfo: any;
}) => {
  const { orders, factories } = totalMarkers;
  const [collapsed, setCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<any>({
    latitude: 0,
    longitude: 0,
    productName: "",
    quantity: 0,
    cost: 0,
  });
  const [currentOperatorType, setCurrentOperatorType] = useState("");
  const [currentItem, setCurrentItem] = useState<any>({});
  // 另外通过pathVisible判断是否可以保存快照
  const [pathVisible, setPathVisible] = useState(false);

  // client用户登录时，初始化订单信息
  useEffect(() => {
    if (userInfo?.tenantType === CLIENT_TENANT) {
      getAllClientOrder(userInfo.id).then((res) => {
        if (res.status === 200) {
          markersDispatch({ type: INIT_CLIENT_ORDERS, data: res.data });
        } else {
          message.warning("You do not have any order~");
        }
      });
    }
  }, [markersDispatch, userInfo.id, userInfo?.tenantType]);

  // viewport变换时, 监听窗口中心的经纬度
  useEffect(() => {
    setCurrentDetail({
      latitude: currentViewport.latitude || 37,
      longitude: currentViewport.longitude || -122,
      productName: "",
      quantity: 0,
      cost: 0,
    });
  }, [currentViewport.latitude, currentViewport.longitude]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 新增marker, 只需要提供ADD的类型
  const handleOpenAddModal = (addType: string) => {
    setCurrentOperatorType(addType);
    if (addType === ADD_ORDER) {
      setCurrentDetail({
        longitude: currentViewport.longitude || 0,
        latitude: currentViewport.latitude || 0,
        productName: "",
        quantity: 0,
      });
    } else if (addType === ADD_FACTORY) {
      setCurrentDetail({
        longitude: currentViewport.longitude || 0,
        latitude: currentViewport.latitude || 0,
        productName: "",
        cost: 0,
      });
    }
    setModalVisible(true);
  };

  // 弹出修改modal的前置操作，将operator类型设为EDIT_xxx
  const handleEditMarker = (item: any, operatorType: string) => {
    // 修改现有的, 所以需要item的信息
    setCurrentItem(item);
    setCurrentOperatorType(operatorType);
    if (operatorType === EDIT_ORDER) {
      setCurrentDetail({
        longitude: item.longitude || 0,
        latitude: item.latitude || 0,
        productName: item.productName || "",
        quantity: item.quantity || 0,
      });
    } else if (operatorType === EDIT_FACTORY) {
      setCurrentDetail({
        longitude: item.longitude || 0,
        latitude: item.latitude || 0,
        productName: item.productName || "",
        cost: item?.cost || 0,
      });
    }
    setModalVisible(true);
  };

  // 弹窗的确认放在父层上面
  const handleModalOk = (
    // mkType: string,
    longitude: number,
    latitude: number,
    productName: string,
    quantity: number,
    cost?: number
  ) => {
    // 把modal需要的值传进去
    // 打开modal
    // 添加新的marker,
    if (ADD_TYPES.includes(currentOperatorType)) {
      if (currentOperatorType === ADD_STORE) {
        markersDispatch({
          type: currentOperatorType,
          longitude: longitude,
          latitude: latitude,
          productName: productName,
          quantity: quantity,
        });
      } else {
        markersDispatch({
          type: currentOperatorType,
          longitude: longitude,
          latitude: latitude,
          productName: productName,
          quantity: quantity,
          cost: cost,
        });
      }
    } else if (EDIT_TYPES.includes(currentOperatorType)) {
      // 修改现有的marker， 等价于move marker
      if (currentOperatorType === EDIT_ORDER) {
        markersDispatch({
          type: currentOperatorType,
          key: currentItem.key,
          markerType: currentItem.type,
          longitude: longitude,
          latitude: latitude,
          productName: productName,
          quantity: quantity,
        });
      } else {
        markersDispatch({
          type: currentOperatorType,
          key: currentItem.key,
          markerType: currentItem.type,
          longitude: longitude,
          latitude: latitude,
          productName: productName,
          quantity: quantity,
          cost: cost,
        });
      }
    }
    setModalVisible(false);
  };

  const handleMarkersRemove = (type: string, mkKey: string) => {
    markersDispatch({ type: type, key: mkKey });
  };

  const handleShowPath = async (clear: boolean = false) => {
    console.log("操作路径");
    if (clear === true) {
      // 已有路径，清空路径
      console.log("clear", clear);
      setCurrentPaths([]);
      setPathVisible(false);
    } else {
      if (!pathVisible) {
        console.log("路径绘制中");
        // 这里将calculate获取到的数据存到tempSnapshot内
        // 然后将数据存在pathMarkers中
        // let currentTempSnapshot;
        const pairPointsRes = await companyGetPointsPair(
          totalMarkers.factories.detail,
          totalMarkers.currentCompanyProduct.productName,
          totalMarkers.currentCompanyProduct.proId
        );
        // .then((res) => {
        //   // markersDispatch({ type: SAVE_TEMP_SNAPSHOT, tempSnapshot: res.data });
        //   // currentTempSnapshot = res?.data;
        //   console.log("tempSnapShot", res.data);
        // });
        markersDispatch({
          type: SAVE_TEMP_SNAPSHOT,
          tempSnapshot: pairPointsRes.data,
        });
        // 然后将数据转换数组
        console.log("看看外面的totalMarkers", totalMarkers);
        setTimeout(async () => {
          await getDetailDirections(totalMarkers).then((res) => {
            console.log("res", res);
            setCurrentPaths(res.pathData);
            markersDispatch({
              type: SET_DEMAND_DISPLAY,
              data: res.pathMarkers,
            });
          });
        }, 0);
        setPathVisible(true);
        console.log("路径绘制完成");
      } else {
        message.warning("Please empty first or save and then empty");
      }
    }
  };

  return (
    <>
      <MapHeader
        totalMarkers={totalMarkers}
        factoriesDetail={totalMarkers.factories.detail}
        ordersDetail={totalMarkers.orders.detail}
        collapsed={collapsed}
        userInfo={userInfo}
        toggleCollapsed={toggleCollapsed}
        handleOpenAddModal={handleOpenAddModal}
        handleShowPath={handleShowPath}
        markersDispatch={markersDispatch}
      />
      <DisplayWrapper>
        <Menu mode="inline" theme="dark" inlineCollapsed={collapsed}>
          <SubMenu key="sub" icon={<FireTwoTone />} title="Order Markers">
            <ListWrapper>
              <List
                bordered={true}
                size="small"
                dataSource={orders.detail}
                renderItem={(item) => (
                  <List.Item key={item.key}>
                    <PositionText>
                      <div>{`latitude: ${item.latitude}`}</div>
                      <div>{`longitude: ${item.longitude}`}</div>
                      <div>{`product type: ${item.productName}`}</div>
                      <div>{`quantity: ${item.quantity}`}</div>
                    </PositionText>
                    <IconGroup>
                      <IconWrapper>
                        <AimOutlined onClick={() => onViewportChange(item)} />
                      </IconWrapper>
                      {userInfo?.tenantType === CLIENT_TENANT ? (
                        <>
                          <IconWrapper>
                            <EditOutlined
                              onClick={() => handleEditMarker(item, EDIT_ORDER)}
                            />
                          </IconWrapper>
                          <IconWrapper>
                            <MinusOutlined
                              onClick={() =>
                                handleMarkersRemove(REMOVE_ORDER, item.key)
                              }
                            />
                          </IconWrapper>
                        </>
                      ) : null}
                    </IconGroup>
                  </List.Item>
                )}
              />
            </ListWrapper>
          </SubMenu>
          {userInfo?.tenantType === COMPANY_TENANT ? (
            <SubMenu
              key="sub1"
              icon={<SettingTwoTone />}
              title="Factory Markers"
            >
              <ListWrapper>
                <List
                  bordered={true}
                  size="small"
                  dataSource={factories.detail}
                  renderItem={(item) => (
                    <List.Item key={item.key}>
                      <PositionText>
                        <div>{`latitude: ${item.latitude}`}</div>
                        <div>{`longitude: ${item.longitude}`}</div>
                        <div>{`product type: ${item.productName}`}</div>
                        <div>{`quantity: ${item.quantity}`}</div>
                        <div>{`cost: ${item.cost}`}</div>
                      </PositionText>
                      <IconGroup>
                        <IconWrapper>
                          <EditOutlined
                            onClick={() => {
                              handleEditMarker(item, EDIT_FACTORY);
                            }}
                          />
                        </IconWrapper>
                        <IconWrapper>
                          <AimOutlined onClick={() => onViewportChange(item)} />
                        </IconWrapper>
                        <IconWrapper>
                          <MinusOutlined
                            onClick={() =>
                              handleMarkersRemove(REMOVE_FACTORY, item.key)
                            }
                          />
                        </IconWrapper>
                      </IconGroup>
                    </List.Item>
                  )}
                />
              </ListWrapper>
            </SubMenu>
          ) : null}
        </Menu>
        {userInfo?.tenantType === COMPANY_TENANT ? (
          <FactoryModal
            setModalVisible={setModalVisible}
            modalVisible={
              modalVisible && FACTORY_TYPES.includes(currentOperatorType)
            }
            currentDetail={currentDetail}
            handleModalOk={handleModalOk}
          />
        ) : (
          <MarkerModal
            setModalVisible={setModalVisible}
            modalVisible={
              modalVisible && ORDER_TYPES.includes(currentOperatorType)
            }
            currentDetail={currentDetail}
            handleModalOk={handleModalOk}
          />
        )}
      </DisplayWrapper>
    </>
  );
};

export default MarkersDisplay;
