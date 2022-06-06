const routes = [
  {
    name: 'openApp',
    path: '/openApp',
    component: () => import('/@/views/openApp/OpenApp'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('/@/views/login/Login'),
  },
  {
    name: 'schedule',
    path: '/schedule',
    component: () => import('/@/views/schedule/Schedule'),
  },
];

export default routes;
