module.exports = [
  {
    key: 'my-account',
    name: 'My Account',
    icon: 'ios-person-outline',
    child: [
      {
        key: 'edit-details',
        name: 'Edit Details',
        icon: 'ios-create-outline',
        link: '/client/edit-details',
      },
      {
        key: 'settings',
        name: 'Settings',
        icon: 'ios-options-outline',
        link: '/client/settings',
      },
      {
        key: 'contacts',
        name: 'Contacts',
        icon: 'ios-person-add-outline',
        link: '/client/contacts',
      },
      {
        key: 'company-profile',
        name: 'Company Profile',
        icon: 'ios-people-outline',
        link: '/client/company-profile',
      },
      {
        key: 'seat-management',
        name: 'Seat Management',
        icon: 'ios-person-add-outline',
        link: '/client/seat-management',
      },
      {
        key: 'help-support',
        name: 'Help & Support',
        icon: 'ios-information-circle-outline',
        link: '/help-support',
      },
      {
        key: 'signout',
        name: 'Sign Out',
        icon: 'ios-log-in',
        link: '/client/signout',
      },
    ]
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'ios-home-outline',
    link: '/client',
  },
  {
    key: 'campaigns',
    name: 'Campaigns',
    icon: 'ios-navigate-outline',
    child: [
      {
        key: 'my-campaigns',
        name: 'My Campaigns',
        icon: 'ios-archive-outline',
        link: '/client/campaign-management',
      },
      {
        key: 'create-campaign',
        name: 'Create Campaign',
        icon: 'ios-create-outline',
        link: '/client/campaigns',
      },
    ]
  },
  {
    key: 'bulk-emails',
    name: 'Bulk Emails',
    icon: 'ios-mail-outline',
    child: [
      {
        key: 'my-bulkEmails',
        name: 'My Bulk Emails',
        icon: 'ios-archive-outline',
        link: '/client/email-management',
      },
      {
        key: 'create-bulkEmail',
        name: 'New Bulk Email',
        icon: 'ios-send-outline',
        link: '/client/bulk-emails',
      },
    ]
  },
  {
    key: 'explore',
    name: 'See All Candidates',
    icon: 'ios-search-outline',
    link: '/client/explore',
  },
  {
    key: 'messages',
    name: 'Messages',
    icon: 'ios-chatbubbles-outline',
    link: '/client/messages',
  }
];
