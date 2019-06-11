import { NbMenuItem } from '@nebular/theme';
import { Title } from '@angular/platform-browser';
import { link } from 'fs';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Główna',
    icon: 'fas fa-home',
    link: '/pages/home',
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Truck & Cargo',
    group: true,
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Truck',
    icon: 'fas fa-truck',
    link: '/pages/truck/mapa',
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Cargo',
    icon: 'fas fa-truck-loading',
    link: '#',
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'System',
    group: true,
    data: {
      permission: 'view',
      resource: 'admin'
    },
  },
  {
    title: 'Auth',
    icon: 'fas fa-user-lock',
    data: {
      permission: 'view',
      resource: 'admin'
    },
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/sign-up',
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
