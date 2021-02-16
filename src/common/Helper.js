import React from 'react';
import Color from './Color.js';
import { faHome, faEnvelope, faUsers, faPalette, faShieldAlt, faHandshake, faShare } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

export default {
  company: 'Increment Technologies',
  APP_NAME: '@SIML_',
  APP_NAME_BASIC: 'SIML',
  APP_EMAIL: 'support@traceag.com.au',
  APP_WEBSITE: 'support@traceag.com.au',
  APP_HOST: 'com.siml',
  pusher: {
    broadcast_type: 'pusher',
    channel: 'runway',
    notifications: 'App\\Events\\Notifications',
    orders: 'App\\Events\\Orders',
    typing: 'typing',
    messages: 'App\\Events\\Message',
    messageGroup: 'App\\Events\\MessageGroup',
    rider: 'App\\Events\\Rider',
  },
  DrawerMenu: [
    {
      title: 'Homepage',
      route: 'Homepage',
      icon: faHome,
      borderBottom: false
    },
    {
      title: 'Messages',
      route: 'Messenger',
      icon: faComment,
      borderBottom: false
    },
    {
      title: 'Connections',
      route: 'Connections',
      icon: faUsers,
      borderBottom: false
    },
    {
      title: 'Theme Settings',
      route: 'Settings',
      icon: faPalette,
      borderBottom: false
    },
    {
      title: 'Share Profile',
      route: 'share',
      icon: faShare,
      borderBottom: true
    },
    {
      title: 'Terms & Conditions',
      route: 'TermsAndConditions',
      icon: faHandshake,
      borderBottom: false
    },
    {
      title: 'Privacy Policy',
      route: 'Privacy',
      icon: faShieldAlt,
      borderBottom: false
    }
  ],
  tutorials: [
    // {
    //   key: 1,
    //   title: 'Welcome to Agicord!',
    //   text: 'Delivering food and more to your doorstep!',
    //   icon: null,
    //   // image: require('assets/logo.png'),
    //   colors: [Color.primary, Color.lightGray],
    // },
  ],
  referral: {
    message:
      `Share the benefits of <<popular products>> with your friends and family. ` +
      `Give them ₱100 towards their first purchase when they confirm your invite. ` +
      `You’ll get ₱100 when they do!`,
    emailMessage: "I'd like to invite you on RunwayExpress!",
  },
  categories: [
    {
      type: 'Asian',
    },
    {
      type: 'American',
    },
    {
      type: 'Beverages',
    },
  ],
  retrieveDataFlag: 1,
  validateEmail(email) {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  },
};
