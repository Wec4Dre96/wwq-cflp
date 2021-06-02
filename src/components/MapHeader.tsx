import { useState, useReducer, useEffect } from "react";
import { Button, Empty, List, Divider, Input, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingTwoTone,
  FireTwoTone,
  RollbackOutlined,
  BankTwoTone,
} from "@ant-design/icons";
import {
  ADD_ORDER,
  ADD_FACTORY,
  SingleHistoryRecord,
  COMPANY_TENANT,
  ADD_STORE,
  CLIENT_SAVE_HISTORY,
  FACTORIES_SAVE_HISTORY,
  CLIENT_TENANT,
  SAVE_HISTORY,
  companyGetTypeOrders,
  COMPANY_GET_ORDERS,
} from "../common";
import {
  StyledHeader,
  OperatorButtonWrapper,
  ButtonsWrapper,
  StyledDrawer,
} from "../styledComponents";
import { historiesReducer, historiesInitialState } from "../store";
// import { userInfo } from "node:os";

const MapHeader = ({
  collapsed,
  userInfo,
  factoriesDetail,
  ordersDetail,
  toggleCollapsed,
  handleOpenAddModal,
  handleShowPath,
  markersDispatch,
}: {
  collapsed: Boolean;
  userInfo: any;
  factoriesDetail: Object;
  ordersDetail: Object;
  toggleCollapsed: Function;
  handleOpenAddModal: Function;
  handleShowPath: Function;
  markersDispatch: Function;
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [histories, historyDispatch] = useReducer(
    historiesReducer,
    historiesInitialState
  );
  const [companySearch, setCompanySearch] = useState('');
  // TODO: showPath后用来做快照前的缓存, 因为show path在上一层, 这个可能要提到上一层
  // const [tempDetail, setTempDetail] = useState<Array<any>>([]);

  const handleHistorySave = () => {
    // TODO: 历史记录区分保存，可能不会提供client的历史记录能力
    // if (userInfo.userType === CLIENT_TENANT) {
    //   historyDispatch({
    //     type: CLIENT_SAVE_HISTORY,
    //     userType: userInfo.userType,
    //     detail: ordersDetail,
    //   });
    // } else if (userInfo.userType === COMPANY_TENANT)
    //   historyDispatch({
    //     type: FACTORIES_SAVE_HISTORY,
    //     userType: userInfo.userType,
    //     detail: factoriesDetail,
    //   });
    return null;
  };

  useEffect(() => {
    // TODO: 如果是client则直接挂载orders（的histories）, 是否需要用户保留历史记录存疑
    // company需要手动查询产品类型
    // if (userInfo.userType === CLIENT_TENANT) {
    //   const temp = getHistories(userInfo.email);
    //   setTempDetail(temp);
    // }
  }, []);

  return (
    <>
      <StyledHeader>
        <OperatorButtonWrapper>
          <ButtonsWrapper>
            <Button type="primary" onClick={() => toggleCollapsed()}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            {userInfo?.tenantType === COMPANY_TENANT ? (
              <>
                <Button
                  type="primary"
                  onClick={() => handleOpenAddModal(ADD_FACTORY)}
                >
                  <SettingTwoTone />
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  handleOpenAddModal(ADD_ORDER);
                }}
              >
                <FireTwoTone />
              </Button>
            )}
          </ButtonsWrapper>
        </OperatorButtonWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          {userInfo.tenantType === COMPANY_TENANT ? (
            <>
              <Input
                style={{ marginRight: "6px" }}
                onChange={e => {
                  const { value } = e.target;
                  setCompanySearch(value);
                }}
                onPressEnter={async () => {
                  const res = await companyGetTypeOrders(companySearch);
                  console.log('res', res);
                  if (res.status === 200 && res.data.length > 0) {
                    markersDispatch({ type: COMPANY_GET_ORDERS, data: res.data});
                  } else {
                    message.warning('No such order~');
                  }
                }}
              />
              <Button
                style={{ marginRight: "6px" }}
                onClick={() => {
                  handleShowPath();
                }}
              >
                Show Path
              </Button>
              <Button
                style={{ marginRight: "6px" }}
                onClick={() => {
                  handleShowPath(true);
                }}
              >
                Clear
              </Button>
            </>
          ) : null}
          <Button
            onClick={() => {
              console.log("save snapshot");
              // TODO: historyDispatch({ type: SAVE_HISTORY, userType: userInfo.userType, detail:  });
              // historyDispatch({ type: SAVE_HISTORY, detail: "test" });
            }}
          >
            Snapshot
          </Button>
        </div>
        <div style={{ lineHeight: "32px", color: "white" }}>
          {userInfo?.name}
        </div>

        <div style={{ display: "flex" }}>
          {/* <div>{userInfo?.username}</div> */}
          <Button onClick={() => setDrawerVisible(true)}>History</Button>
        </div>
      </StyledHeader>
      <StyledDrawer
        visible={drawerVisible}
        closable={true}
        onClose={() => setDrawerVisible(false)}
      >
        {histories.length > 0 ? (
          <List size="large">
            <div>
              Histories
              <div>(Unsaved changes will be cleared.)</div>
            </div>
            <Divider style={{ marginTop: "5px" }} />
            <Input
              onPressEnter={(values) => {
                console.log("values", values);
              }}
              id="factories-search"
            />
            {histories.map((item) => (
              <div
                key={item.time}
                style={{ display: "flex", alignItems: "center" }}
              >
                <List.Item>
                  <div>{item.time}</div>
                  <div>{item?.productName}</div>
                </List.Item>
                <RollbackOutlined
                  onClick={() => {
                    console.log("rollback history", item);
                    // TODO: 回滚, 在这重设orders/factories信息, 可能不需要historyRollBack单独设置函数
                    // TODO: 对于client来说, 默认显示所有自己所有的点，做个保留
                    // const tempHistories = await historyRollBack(userInfo?.email, item.productName);
                    // if (userInfo.userType === CLIENT_TENANT) {
                    //   markersDispatch({ type: CLIENT_ROLLBACK, detail: tempHistories });
                    // } else {
                    //   markersDispatch({ type: COMPANY_ROLLBACK, detail: tempHistories });
                    // }
                  }}
                />
              </div>
            ))}
          </List>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </StyledDrawer>
    </>
  );
};

export default MapHeader;
