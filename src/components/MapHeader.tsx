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
  SAVE_SNAPSHOT,
  CLEAN_MARKERS,
  SNAPSHOT_ROLLBACK,
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
  totalMarkers,
  collapsed,
  userInfo,
  factoriesDetail,
  ordersDetail,
  toggleCollapsed,
  handleOpenAddModal,
  handleShowPath,
  markersDispatch,
}: {
  totalMarkers: any;
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
  const [companySearch, setCompanySearch] = useState("");

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
                onChange={(e) => {
                  const { value } = e.target;
                  setCompanySearch(value);
                }}
                onPressEnter={async () => {
                  const res = await companyGetTypeOrders(companySearch);
                  // console.log("res", res);
                  if (res.status === 200 && res.data.length > 0) {
                    markersDispatch({
                      type: COMPANY_GET_ORDERS,
                      data: res.data,
                    });
                  } else {
                    message.warning("No such order~");
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
                Clear Path
              </Button>
              <Button
                style={{ marginRight: "6px" }}
                onClick={() => {
                  markersDispatch({ type: CLEAN_MARKERS });
                  handleShowPath(true);
                }}
              >
                Clear All
              </Button>
            </>
          ) : null}
          <Button
            onClick={() => {
              console.log("save snapshot");
              // TODO: historyDispatch({ type: SAVE_SNAPSHOT, userType: userInfo.userType, detail:  });
              historyDispatch({
                type: SAVE_SNAPSHOT,
                totalMarkers: totalMarkers,
                id: userInfo.id,
              });
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
        {(histories as Array<any>).length > 0 ? (
          <List size="large">
            <div>
              Histories
              <div>(Unsaved changes will be cleared.)</div>
            </div>
            <Divider style={{ marginTop: "5px" }} />
            <Input onPressEnter={(values) => {}} id="factories-search" />
            {(histories as Array<any>).map((item: any) => (
              <div
                key={item.time}
                style={{ display: "flex", alignItems: "center" }}
              >
                <List.Item
                  style={{
                    flexFlow: "column",
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  <div>{new Date(Number(item.time)).toUTCString()} </div>
                  <div>Type: {item?.productName}</div>
                  <div>Description: {item?.description}</div>
                </List.Item>
                <RollbackOutlined
                  onClick={() => {
                    console.log("rollback history", item);
                    markersDispatch({
                      type: SNAPSHOT_ROLLBACK,
                      detail: item.detail,
                      productName: item.productName,
                    });
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
