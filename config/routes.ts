/**
 * @name umi's routing configuration
 * @description only supports path, component, routes, redirect, wrappers, name, icon configuration
 * @param path path only supports two placeholder configurations, the first is in the form of dynamic parameter :id, and the second is * wildcard, which can only appear at the end of the routing string.
 * @param component configures the React component path used for rendering after id and path match. It can be an absolute path or a relative path. If it is a relative path, it will be searched starting from src/pages.
 * @param routes Configure sub-routes, usually used when you need to add layout components to multiple paths.
 * @param redirect configure route jump
 * @param wrappers Configure the packaging component of the routing component. Through the packaging component, you can combine more functions into the current routing component. For example, it can be used for routing-level permission verification.
 * @param name Configure the title of the route. By default, the value of menu.xxxx in the internationalization file menu.ts is read. If the name is configured as login, the value of menu.login in menu.ts is read as the title.
 * @param icon Configure the icon of the route. For the value, please refer to https://ant.design/components/icon-cn. Pay attention to removing the style suffix and capitalization. If you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward. or StepBackward, if you want to configure the icon as <UserOutlined />, the value should be user or User
 * @doc https://umijs.org/docs/guides/routes
 */

export default [
  {
    path: '/user',
    layout: false,
    access: 'user_m',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
        footerRender: false,
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/gantt-task',
  //   name: 'gantt',
  //   icon: 'OrderedListOutlined',
  //   component: './GanttTask',
  // },

  {
    path: '/heat-map',
    name: 'heat-map',
    icon: 'HeatMapOutlined',
    component: './HeatMap',
  },

  {
    path: '/gantt-task',
    name: 'gantt',
    icon: 'UnorderedListOutlined',
    // access: 'user_m',
    routes: [
      {
        name: 'data-task',
        path: '/gantt-task/index',
        access: 'user_m',
        component: './GanttTask/index',
      },
      {
        name: 'gantt-chart',
        path: '/gantt-task/task',
        access: 'user_m',
        component: './GanttTask/task',
      },
      // {
      //   name: 'TABLE',
      //   path: '/gantt-task/table',
      //   access: 'user_m',
      //   component: './GanttTask/table',
      // },
    ],
  },

  {
    path: '/data-center',
    name: 'datacenter',
    icon: 'DatabaseOutlined',
    // access: 'user_m',
    routes: [
      {
        name: 'datarack',
        path: '/data-center/index',
        // access: 'user_m',
        component: './DataCenter/index',
      },
      {
        name: 'viewrack',
        path: '/data-center/view',
        // access: 'user_m',
        component: './DataCenter/Components/rack-views',
      },
      {
        name: 'riset',
        path: '/data-center/riset',
        // access: 'user_m',
        component: './DataCenter/riset',
      },
    ],
  },
  {
    path: '/workflow-editor',
    name: 'workfloweditor',
    icon: 'CreditCardOutlined',
    component: './WorkFlowEditor',
  },
  {
    path: '/admin',
    name: 'user',
    icon: 'user',
    access: 'user_m',
    routes: [
      {
        name: 'user-management',
        path: '/admin/index',
        access: 'user_m',
        component: './User/User',
      },
      {
        name: 'role-management',
        path: '/admin/role',
        access: 'role_m',
        component: './User/Role',
      },
      {
        name: 'table-user',
        path: '/admin/table-user',
        access: 'user_m',
        component: './User/User/table-user',
      },
      {
        path: '/admin/set/access',
        component: './User/Access',
      },
      {
        component: './404',
      },
    ],
  },

  // {
  //   path: '/three-js',
  //   name: 'THREE JS',
  //   icon: 'InboxOutlined',
  //   component: './ThreeJS',
  // },
  // {
  //   path: '/echarts',
  //   name: 'eCharts',
  //   icon: 'PieChartOutlined',
  //   component: './ECharts',
  // },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
