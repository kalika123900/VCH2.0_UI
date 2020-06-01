module.exports = [
  {
    key: 'my-account',
    name: 'My Account',
    icon: 'ios-person-outline',
    child: [
      {
        key: 'my-profile',
        name: 'My Profile',
        icon: 'ios-person-outline',
        link: '/student/profile',
      },
      {
        key: 'edit-details',
        name: 'Edit Details',
        icon: 'ios-create-outline',
        link: '/student/edit-details',
      },
      {
        key: 'settings',
        name: 'Settings',
        icon: 'ios-options-outline',
        link: '/student/settings',
      },
      {
        key: 'signout',
        name: 'Sign Out',
        icon: 'ios-log-in',
        link: '/student/signout',
      }
    ]
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'ios-home-outline',
    link: '/student',
  },
  {
    key: 'messages',
    name: 'Messages',
    icon: 'ios-chatbubbles-outline',
    link: '/student/messages',
  },
  {
    key: 'opportunities',
    name: 'Opportunities',
    icon: 'ios-information-circle-outline',
    link: '/student/opportunities',
  }
];
