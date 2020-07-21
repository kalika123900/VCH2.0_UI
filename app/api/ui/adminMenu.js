module.exports = [
  {
    key: 'home',
    name: 'Home',
    icon: 'ios-home-outline',
    link: '/admin',
  },
  {
    key: 'edit-details',
    name: 'Edit Details',
    icon: 'ios-create-outline',
    link: '/admin/edit-details',
  },
  {
    key: 'campaign-management',
    name: 'Campaign Management',
    icon: 'ios-navigate-outline',
    link: '/admin/campaign-management',
  },
  {
    key: 'seat-management',
    name: 'Seat Management',
    icon: 'ios-person-add-outline',
    link: '/admin/seat-management',
  },
  {
    key: 'student-management',
    name: 'Student Management',
    icon: 'ios-people-outline',
    child: [
      {
        key: 'student-review',
        name: 'Student Review',
        icon: 'ios-person-outline',
        link: '/admin/student-review',
      },
      {
        key: 'student-signups',
        name: 'Student Signups',
        icon: 'ios-people-outline',
        link: '/admin/student-signups',
      }
    ]
  },
  {
    key: 'client-management',
    name: 'Client Management ',
    icon: 'ios-cog-outline',
    child: [
      {
        key: 'edit-client-tokens',
        name: 'Client Tokens',
        icon: 'ios-person-outline',
        link: '/admin/client-tokens',
      },
      {
        key: 'client-profile',
        name: 'Client Profiles',
        icon: 'ios-people-outline',
        link: '/admin/client-profiles',
      },
      {
        key: 'company-profile',
        name: 'Company Profile',
        icon: 'ios-color-filter-outline',
        link: '/admin/company-profile',
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
