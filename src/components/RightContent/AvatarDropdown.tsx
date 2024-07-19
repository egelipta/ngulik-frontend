/* eslint-disable @typescript-eslint/no-use-before-define */
//@ts-nocheck
// import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Form, Spin, message } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.nickname}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const updatePassword = async () => {
    try {
      const values = await form.validateFields();
      const { newPassword } = values;

      const userId = currentUser.id;
      if (userId) {
        // Panggil API untuk mendapatkan data pengguna
        const userData = await userUpdateApiV1AdminUserchangePassPut({
          id: userId,
          username: currentUser?.username,
          password: newPassword,
          // user_status: currentUser?.user_status,
          // user_phone: currentUser?.user_status,
        });
        // Tampilkan pesan sukses atau navigasi ke halaman lain jika diperlukan
        message.success('Password berhasil diubah!');

        // Log user data to the console or display it in an alert
        console.log('User Data:', userData);

        setDrawerVisible(false);
      } else {
        message.error('User ID not found.');
      }
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  /**
   * Exit login and save the current url
   */
  const loginOut = async () => {
    // await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** This method will jump to the position where the redirect parameter is located */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          console.log('LOGOUT');
          localStorage.clear();
          setInitialState((s: any) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      } else if (key === 'changePassword') {
        setDrawerVisible(true);
      } else {
        history.push(`/account/${key}`);
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser } = initialState;

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: 'Account',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'changePassword',
      icon: <SettingOutlined />,
      label: 'Change Password',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  return (
    <div>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>

      <DrawerForm
        form={form}
        title="Change Password"
        width={400}
        drawerProps={{
          destroyOnClose: true,
          mask: true,
          onClose: () => setDrawerVisible(false),
        }}
        open={drawerVisible}
        onFinish={updatePassword}
        submitter={{ searchConfig: { submitText: 'Save' } }}
      >
        <ProFormText.Password
          width="md"
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please enter a new password',
            },
          ]}
        />

        <ProFormText.Password
          width="md"
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match');
              },
            }),
          ]}
        />
      </DrawerForm>
    </div>
  );
};
