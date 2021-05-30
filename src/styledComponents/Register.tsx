import styled from 'styled-components';
import { Modal } from 'antd';

export const LoginPageContainer = styled.div`
  margin: 0px;
  outline: none;
  padding: 0px;
  width: auto;
  min-height: 640px;
`;

export const LoginPageContentContainer = styled.div`
  padding-bottom: 112px;
  padding-top: 72px;
  background: #f0f2f5;
`;

export const LoginPageContent = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px 0;
  position: relative;
  width: 980px;
`;

export const LogoContainer = styled.div`
  margin-right: 0;
  padding-right: 32px;
  width: 580px;
  /* max-width: 580px; */
`;

export const LogoText = styled.h2`
  font-size: 29px;
  font-weight: normal;
  line-height: 32px;
  width: 500px;
`;

export const LoginFormContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export const LoginFormContent = styled.div`
  height: 456px;
  width: 396px;
`;

export const LoginFormWrapper = styled.div`
  padding: 18px 0px 24px 0px;
  text-align: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  margin: 40px 0 0;
  width: 396px;
  background: #ffffff;
  .ant-input {
    border-radius: 6px;
    font-size: 18px;
    padding: 14px 16px;
    width: 364px;
    height: 52px;
  }
  .login-form-button {
    height: 48px;
    background-color: #1877f2;
    width: 364px;
    padding: 0 16px;
    line-height: 48px;
    font-size: 21px;
    border-radius: 6px;
  }
  .register-button {
    height: 48px;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    line-height: 48px;
    padding: 0 16px;
    background-color: #42b72a;
  }
`;

export const LoginFormBottomText = styled.div`
  border-top: none;
  color: #1c1e21;
  font-size: 15px;
  padding-top: 0;
  font-weight: normal;
  margin-top: 28px;
  text-align: center;
`;

export const StyledModal = styled(Modal)`
  input {
    height: 42px;
    background: #f5f6f7 !important;
  }
  .ant-input {
    background: #f5f6f7 !important;
  }
  .ant-col {
    max-width: 100%;
  }
  .ant-input-group-wrapper {
    width: 399px;
  }
  #register_email {
    width: 399px;
  }
  .ant-modal-body {
    padding: 16px;
  }
  .ant-input-password,
  .ant-input {
    /* height: 42px; */
    /* padding: 0 0 0 11px !important; */
    font-size: 16px;
    line-height: 16px;
    /* background: transparent; */
    border-radius: 5px;
    margin: 0px;
    color: #1c1e21;
  }
  .ant-input-affix-wrapper {
    width: 399px;
    background: #f5f6f7 !important;
  }
  .ant-input-password {
    padding: 0 11px 0 11px !important;
  }
  .first-name, .last-name {
    width: 194px;
  }
  .first-name {
    /* margin-right: 8px; */
  }
`;
