module.exports = [
  {
    key: 'my-account',
    name: 'My Account',
    child: [
      {
        key: 'edit-details',
        name: 'Edit Details',
        link: '/client/edit-details',
      },
      {
        key: 'settings',
        name: 'Settings',
        link: '/client/settings',
      },
      {
        key: 'seat-management',
        name: 'Seat Management',
        link: '/client/seat-management',
      },
      {
        key: 'signout',
        name: 'Sign Out',
        link: '/client/signout',
      },
    ]
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    link: '/client',
  },
  {
    key: 'campaigns',
    name: 'Campaigns',
    child: [
      {
        key: 'my-campaigns',
        name: 'My Campaigns',
        link: '/client/campaign-management',
      },
      {
        key: 'create-campaign',
        name: 'Create Campaign',
        link: '/client/campaigns',
      },
    ]
  },
  {
    key: 'bulk-emails',
    name: 'Bulk Emails',
    child: [
      {
        key: 'my-bulkEmails',
        name: 'My Bulk Emails',
        link: '/client/email-management',
      },
      {
        key: 'create-bulkEmail',
        name: 'New Bulk Email',
        link: '/client/bulk-emails',
      },
    ]
  },
  {
    key: 'explore',
    name: 'Explore',
    link: '/client/explore',
  },
  {
    key: 'messages',
    name: 'Messages',
    link: '/client/messages',
  }
];
