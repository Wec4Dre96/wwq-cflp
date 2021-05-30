import { useState, useCallback } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import {
  LoginPageContainer,
  LoginPageContent,
  LoginPageContentContainer,
  LogoContainer,
  LoginFormContainer,
  LoginFormContent,
  LoginFormWrapper,
  LoginFormBottomText,
  LogoText,
} from "../styledComponents";
import RegisterModal from "./RegisterModal";
import { USER_INFO, getUserInfo, SET_USERINFO } from "../common";
// import { Redirect } from "react-router";
// import WuwenqiLogo from "../assets/WechatIMG418.jpeg";

const LoginPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = useCallback(async (values) => {
    console.log("values", values);
    const res = await getUserInfo({
      userinput: values.userinput,
      pwd: values.pwd,
    });
    console.log(res);
    if (!res.data) {
      message.warning("Please check your username or password!");
    } else {
      console.log("res.data", res.data);
      window.sessionStorage.setItem(USER_INFO, JSON.stringify(res.data));

      setTimeout(() => (window.location.href = "/application"), 0);
      // return <Redirect to="/login" />;
      // return <Redirect to='/application' />
    }
  }, []);

  return (
    <LoginPageContainer>
      <div>
        <LoginPageContentContainer>
          <LoginPageContent>
            <LogoContainer>
              <div style={{ padding: "112px 0 16px" }}>
                <img
                  style={{ width: "auto", height: "106px", margin: "-28px" }}
                  // src={WuwenqiLogo}
                  // src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                  alt="logo"
                />
              </div>
              <LogoText>CFLP-CFLP-CFLP-CFLP</LogoText>
            </LogoContainer>
            <LoginFormContainer>
              <LoginFormContent>
                <LoginFormWrapper>
                  {/* 登陆表单 */}
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{}}
                    onFinish={async (values) => {
                      await onFinish(values);
                    }}
                  >
                    <Form.Item
                      name="userinput"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input placeholder="email or phone number" type="text" />
                    </Form.Item>
                    <Form.Item
                      name="pwd"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log in
                      </Button>
                    </Form.Item>
                    <a
                      className="login-form-forgot"
                      href="https://www.baidu.com/"
                    >
                      Forgot password ?
                    </a>
                    <Divider />
                    {/* 注册弹窗 */}
                    <Button
                      type="primary"
                      htmlType="button"
                      className="register-button"
                      onClick={() => {
                        setModalVisible(true);
                      }}
                    >
                      Register now
                    </Button>
                  </Form>
                  {/* 登陆表单下面的文字 */}
                </LoginFormWrapper>
                <LoginFormBottomText>info</LoginFormBottomText>
              </LoginFormContent>
            </LoginFormContainer>
          </LoginPageContent>
        </LoginPageContentContainer>
      </div>
      <RegisterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </LoginPageContainer>
  );
};

export default LoginPage;
