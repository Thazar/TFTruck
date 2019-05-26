import { NbMenuItem } from '@nebular/theme';
import { Title } from '@angular/platform-browser';
import { link } from 'fs';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Główna',
    icon: 'fa fa-th',
    link: '/pages/home',
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Truck',
    icon: 'fa fa-truck',
    data: {
      permission: 'view',
      resource: 'admin'
    },
    children: [
      {
      title: 'Mapa',
      link: '/pages/truck/mapa'
      }
    ],
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
