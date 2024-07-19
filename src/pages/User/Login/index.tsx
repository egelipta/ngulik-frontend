import { Footer } from '@/components';
import { getCaptcha, login } from '@/services/user/api';
import { dlog } from '@/util';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
// import { values } from 'lodash';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<any>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('account');
  const [countDown] = useState(60);

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();
  let login_status = '';
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.AccountLogin) => {
    try {
      // Login
      if (values.mobile) {
        values.mobile = '62' + values.mobile;
      }
      const msg = await login({ ...values });
      if (msg.code === -1) {
        message.warning(msg.message);
        return;
      } else if (msg.code === 200) {
        localStorage.setItem('Authorization', msg.data.token);
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'login successful!',
        });
        login_status = 'logged';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        setUserLoginState(msg.data);
        return;
      } else {
        login_status = 'error';
      }
      console.log(msg);
      // If you fail, set the user error message
      setUserLoginState(msg.data);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
      console.log(userLoginState);
    }
  };

  const tabItem = [
    {
      key: 'account',
      label: 'Akun',
      children: '',
    },
    {
      key: 'mobile',
      label: 'WhatsApp',
      children: '',
    },
  ];

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'Login page',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          actions={
            [
              // <FormattedMessage
              //   key="loginWith"
              //   id="pages.login.loginWith"
              //   defaultMessage="Other login methods"
              // />,
              // <ActionIcons key="icons" />,
            ]
          }
          onFinish={async (values) => {
            await handleSubmit(values as API.AccountLogin);
          }}
        >
          <Tabs activeKey={type} onChange={setType} items={tabItem}></Tabs>
          {login_status === 'error' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: 'Account or password error',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: 'username: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="please enter user name!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: 'password',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="Please enter the password!"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  addonBefore: '+62',
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: 'phone number',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="Please enter phone number!"
                      />
                    ),
                  },
                ]}
                convertValue={(value) => {
                  dlog('Login', value);
                  return value;
                  // if (value === undefined || value === null) {
                  //   return '';
                  // }
                  // else if (value.length > 11){
                  //   return nomorPonsel(value);
                  // } else {
                  //   return '';
                  // }
                }}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: 'please enter verification code',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: 'get verification code',
                    })}`;
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: 'get verification code',
                  });
                }}
                name="captcha"
                phoneName="mobile"
                countDown={countDown}
                // rules={[
                //   {
                //     required: true,
                //     message: (
                //       <FormattedMessage
                //         id="pages.login.captcha.required"
                //         defaultMessage="please enter verification code!"
                //       />
                //     ),
                //   },
                //   { len: 6, message: 'please enter verification code!' },
                // ]}
                onGetCaptcha={async (phone: string) => {
                  let wa = '62' + phone;
                  const result = await getCaptcha({ phone_number: wa });
                  if (result.code !== 200) {
                    message.info(result.message);
                    throw new Error(result.message);
                  }
                  message.success(result.message);
                }}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="auto login" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage
                id="pages.login.forgotPassword"
                defaultMessage="forget the password"
              />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
