module.exports = [
  {
    key: 'home',
    name: 'Home',
    icon: 'ios-home-outline',
    link: '/admin',
  },
  {
    key: 'campaign-management',
    name: 'Campaign Management',
    icon: 'ios-contact-outline',
    link: '/admin/campaign-management',
  },
  {
    key: 'seat-management',
    name: 'Seat Management',
    icon: 'ios-chatbubbles-outline',
    link: '/admin/seat-management',
  },
  {
    key: 'student-review',
    name: 'Student Review',
    icon: 'ios-create-outline',
    link: '/admin/student-review',
  },
  {
    key: 'client-management',
    name: 'Client Management ',
    icon: 'ios-information-circle-outline',
    child: [
      {
        key: 'management',
        name: 'Management',
        title: true,
      },
      {
        key: 'edit-client-accounts',
        name: 'Client Accounts',
        link: '/admin/client-accounts',
      },
      {
        key: 'client-profile',
        name: 'Client Profiles',
        link: '/admin/client-profiles',
      }
    ]
  },
  {
    key: 'signout',
    name: 'Sign Out',
    icon: 'ios-log-in',
    link: '/admin/signout',
  }
];
