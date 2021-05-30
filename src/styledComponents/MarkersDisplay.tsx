import styled from "styled-components";
import { Layout, Modal, Drawer } from "antd";

export const DisplayWrapper = styled.div`
  width: 310px;
  z-index: 100;
  position: absolute;

  .ant-menu-inline-collapsed {
    width: 46px;
  }
  .ant-btn {
    margin-right: 4px;
    opacity: 0.88;
  }
`;

export const StyledMarkerModal = styled(Modal)`
  width: 300px !important;
  .ant-modal-close-x {
    width: 46px;
    height: 46px;
  }
  .ant-input-number {
    width: 100% !important;
  }
`;

export const ListWrapper = styled.div`
  max-height: 166px;
  background: #ffffff;
  overflow: auto;
  .ant-list-item {
    position: relative;
  }
`;

export const OperatorButtonWrapper = styled.div`
  display: flex;
  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    line-height: 14px;
    margin-right: 2px;
  }
  .ant-btn > .anticon {
    line-height: 0px;
  }
  path {
    fill: #ffffff;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 25px;
  margin-left: 4px;
  svg {
    transition-duration: 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const TagWrapper = styled.div`
  display: flex;
`;

export const IconGroup = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  right: 5px;
  align-items: flex-end;
`;

export const PositionText = styled.div`
  display: flex;
  flex-flow: column;
`;

export const StyledHeader = styled(Layout.Header)`
  height: 32px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  .ant-btn:hover {
    &:hover {
      color: #40a9ff;
      border-color: #40a9ff;
    }
  }
  .ant-btn:focus {
    color: black;
    border-color: black;
  }
`;

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-mask {
    /* opacity: 0 !important; */
    background-color: rgba(0, 0, 0, 0);
  }
  .anticon-rollback {
    position: absolute;
    right: 5px;
    margin-bottom: 2px;
    transition-duration: 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
`;
