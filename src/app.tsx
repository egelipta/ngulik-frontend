import { AvatarDropdown, AvatarName, Footer, SelectLang } from '@/components';
import { currentUser as queryCurrentUser } from '@/services/user/api';
// import { LinkOutlined } from '@ant-design/icons';
import LinkOutlined from '@ant-design/icons/lib/icons/LinkOutlined';

import {
  PageLoading,
  type Settings as LayoutSettings,
  SettingDrawer,
} from '@ant-design/pro-components';
// import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { Link, history } from '@umijs/max';
import { Avatar, Button, Result } from 'antd';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: USER.UserInfo;
  loading?: boolean;
  fetchUserInfo?: () => Promise<USER.UserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // If it is not a login page, execute
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// Api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    actionsRender: () => [<SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.header_img,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        if (avatarChildren) {
          return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
        } else {
          console.log('Avatar kosong');
          return <Avatar>{_.src}</Avatar>;
        }
      },
    },
    waterMarkProps: {
      // content: initialState?.currentUser?.name,
      content: '',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // If you do not log in, redirect to login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI Docs</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // menuHeaderRender: <Button>MenuHeader</Button>,
    // Customized page 403
    // unAccessible: <div>unAccessible</div>,
    unAccessible: (
      <Result
        status="403"
        title="403"
        subTitle="Maaf, Anda tidak berwenang mengakses halaman ini"
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            Kembali
          </Button>
        }
      />
    ),

    // Add a loading state
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                console.log('settings:', settings.toString());
                // setInitialState((preInitialState: any) => ({
                //   ...preInitialState,
                //   settings,
                // }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request Configuration, you can configure error processing
 * It provides a unified network request and error processing solution based on AXIOS and Ahooks.
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};

let locale = localStorage.getItem('umi_locale');

if (locale !== 'id-ID' && locale !== 'en-US') {
  locale = 'id-ID';
  localStorage.setItem('umi_locale', locale);
}
console.log('Current locale:', locale);

