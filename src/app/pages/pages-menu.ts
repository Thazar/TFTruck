import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Główna',
    icon: 'nb-home',
    link: '/pages/home',
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Mapa',
    icon: 'nb-location',
    link: '/pages/mapa',
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
