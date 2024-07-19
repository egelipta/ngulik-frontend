// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  esbuildMinifyIIFE: true,
  /**
   * @name Open the HASH mode
   * @description Let the product after Build contain the Hash suffix.It is usually used to release and avoid browser loading cache.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Compatibility settings
   * @description Setting IE11 is not necessarily perfect, you need to check all the dependencies you use
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name The configuration of the routing, the files not introduced in the route will not compile
   * @description Only support Path, Component, Routes, Redirect, Wrappers, Title configuration
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Configuration of theme
   * @description Although it is called the theme, it is actually just a variable settings for LESS
   * @doc Antd's theme settings https://ant.design/docs/react/customize-theme-cn
   * @doc UMI's theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // If you don't want ConfigProvide to dynamically set the theme, you need to set this to default
    // Only set to VARIABLE

    'root-entry-name': 'variable',

    token: {
      theme: { '@primary-color': '#1DA57A' },
      colorPrimary: '#00B96B',
      borderRadius: 0,
    },
  },
  /**
   * @name moment International configuration
   * @description If there is no requirement for internationalization, the bag size of the JS can be reduced after opening
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: false,
  /**
   * @name Proxy configuration
   * @description You can allow your local server to represent your server so that you can access the data of the server
   * @see It should be noted that the following agents can only be used in local development, and it cannot be used after Build.
   * @doc Agent introduction https://umijs.org/docs/guides/proxy
   * @doc Proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name Quick hot update configuration
   * @description A good hot update component, you can retain the state when updated
   */
  fastRefresh: true,
  //============== The following are the plugin configuration of MAX ===============
  /**
   * @name Data stream plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data stream, you can use it to share data between plugins
   * @description It can be used to store some global data, such as user information, or some global status. The global initial state is created at the beginning of the entire UMI project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'FRONTEND',
  layout: {
    navTheme: 'dark',
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs plugin
   * @description Replace the moment in the project to dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration', 'relativeTime', 'weekday'],
  },
  /**
   * @name International plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'id-ID',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name antd plugin
   * @description Builtin Babel Import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  // Ubah warna tema halaman login
  // antd: {
  //   theme: {
  //     token: {
  //       colorPrimary: 'blue',
  //       borderRadius: 2,
  //     },
  //   },
  //   configProvider: {
  //     theme: 'dark',
  //     components: {
  //       Menu: {
  //         itemSelectedColor: 'red',
  //       },
  //     },
  //   },
  // },
  /**
   * @name Network request configuration
   * @description It provides a unified network request and error processing solution based on AXIOS and Ahooks.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name Permission plugin
   * @description Based on the initialState permissions plugin, you must first open the initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name <head> Extravagant script
   * @description Configure the additional SCRIPT in <head>
   */
  headScripts: [
    // Solve the problem of the white screen when loading for the first time
    { src: '/scripts/loading.js', async: true },
  ],
  //================ Pro plugin configuration =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI Configuration of plugin
   * @description Generate Serve and Mock based on the specifications of OpenAPI, which can reduce many model code
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // Or use the online version
      schemaPath: 'http://127.0.0.1:8888/openapi.json',
      // schemaPath: join(__dirname, 'openapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'http://127.0.0.1:8888/openapi.json',
      // schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'pjvms',
      mock: false,
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
