module.exports = [
  {
    key: 'home',
    name: 'Home',
    icon: 'ios-home-outline',
    child: [
      {
        key: 'landing_page',
        name: 'Landing Page',
        title: true,
      },
      {
        key: 'corporate',
        name: 'Corporate',
        link: '/',
        badge: 'Hot',
        icon: 'ios-globe-outline'
      },
      {
        key: 'creative',
        name: 'Creative',
        link: '/landing-creative',
        icon: 'ios-desktop-outline'
      },
      {
        key: 'dashboard',
        name: 'Dashboard',
        title: true,
      },
      {
        key: 'personal',
        name: 'Personal',
        link: '/app',
        icon: 'ios-contact-outline'
      },
      {
        key: 'crm',
        name: 'CRM',
        link: '/app/crm-dashboard',
        icon: 'ios-card-outline'
      },
      {
        key: 'crypto',
        name: 'Cryptocurrency',
        link: '/app/crypto-dashboard',
        icon: 'ios-medal-outline'
      },
      {
        key: 'dashboard_widgets',
        name: 'Dashboard Widgets',
        title: true,
      },
      {
        key: 'infographics_wdiget',
        name: 'Infographics',
        link: '/app/widgets/infographics',
        icon: 'ios-card'
      },
      {
        key: 'status_widget',
        name: 'Status',
        link: '/app/widgets/status',
        icon: 'ios-notifications-outline'
      },
      {
        key: 'mini_apps_widget',
        name: 'Mini Apps',
        link: '/app/widgets/mini-apps',
        icon: 'ios-information-circle-outline'
      },
      {
        key: 'analytics_widget',
        name: 'Analytics',
        link: '/app/widgets/analytics',
        icon: 'ios-analytics-outline'
      },
      {
        key: 'info_updates_widget',
        name: 'Info & Updates',
        link: '/app/widgets/info-updates',
        icon: 'ios-information-circle-outline'
      },
      {
        key: 'layout_settings',
        name: 'Layout',
        title: true,
      },
      {
        key: 'grid',
        name: 'Grid',
        link: '/app/layouts/grid',
        icon: 'ios-apps-outline'
      },
      {
        key: 'application_layout',
        name: 'App Layout',
        link: '/app/layouts/app-layout',
        icon: 'ios-photos-outline'
      },
      {
        key: 'responsive',
        name: 'Responsive',
        link: '/app/layouts/responsive',
        icon: 'ios-phone-portrait'
      }
    ]
  },
  {
    key: 'apps',
    name: 'Applications',
    icon: 'ios-appstore-outline',
    child: [
      {
        key: 'communication_apps',
        name: 'Communication',
        title: true,
      },
      {
        key: 'contact',
        name: 'Contact',
        link: '/app/pages/contact',
        icon: 'ios-contact-outline'
      },
      {
        key: 'email',
        name: 'Email',
        link: '/app/pages/email',
        badge: '2',
        icon: 'ios-mail-outline'
      },
      {
        key: 'social_apps',
        name: 'Social',
        title: true,
      },
      {
        key: 'timeline',
        name: 'Timeline',
        link: '/app/pages/timeline',
        icon: 'ios-people-outline'
      },
      {
        key: 'chat',
        name: 'Chat',
        link: '/app/pages/chat',
        badge: '4',
        icon: 'ios-chatbubbles-outline'
      },
      {
        key: 'ecommerce_app',
        name: 'Ecommerce',
        title: true,
      },
      {
        key: 'Itemlist',
        name: 'Product Catalogues',
        link: '/app/pages/ecommerce',
        icon: 'ios-apps-outline'
      },
      {
        key: 'item_detail',
        name: 'Product Detail',
        link: '/app/pages/product-detail',
        icon: 'ios-card'
      },
      {
        key: 'checkout',
        name: 'Checkout Page',
        link: '/app/pages/checkout',
        icon: 'ios-cart-outline'
      },
      {
        key: 'dynamic_invoice',
        name: 'Dynamic Invoice',
        link: '/app/pages/invoice',
        icon: 'ios-document-outline'
      },
      {
        key: 'productivity_app',
        name: 'Productivity',
        title: true,
      },
      {
        key: 'calendar',
        name: 'Calendar',
        link: '/app/pages/calendar',
        icon: 'ios-calendar-outline'
      },
      {
        key: 'task',
        name: 'Task Board',
        link: '/app/pages/taskboard',
        icon: 'ios-checkmark-circle-outline'
      },
    ]
  },
  {
    key: 'pages',
    name: 'Pages',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'account_page',
        name: 'Auth Page',
        title: true,
      },
      {
        key: 'login',
        name: 'Login',
        link: '/login',
        icon: 'ios-person-outline'
      },
      {
        key: 'login2',
        name: 'Login Ver.2',
        link: '/login-v2',
        icon: 'ios-contact-outline'
      },
      {
        key: 'login3',
        name: 'Login Ver.3',
        link: '/login-v3',
        icon: 'ios-contact-outline'
      },
      {
        key: 'register',
        name: 'Register',
        link: '/register',
        icon: 'ios-key-outline'
      },
      {
        key: 'register2',
        name: 'Register Ver.2',
        link: '/register-v2',
        icon: 'ios-key-outline'
      },
      {
        key: 'register3',
        name: 'Register Ver.3',
        link: '/register-v3',
        icon: 'ios-key-outline'
      },
      {
        key: 'reset',
        name: 'Reset Password',
        link: '/reset-password',
        icon: 'ios-undo-outline'
      },
      {
        key: 'lock',
        name: 'Lock Screen',
        link: '/lock-screen',
        icon: 'ios-lock-outline'
      },
      {
        key: 'generic_page',
        name: 'Generic',
        title: true,
      },
      {
        key: 'user_profile',
        name: 'User Profile',
        link: '/app/pages/user-profile',
        icon: 'ios-person-outline'
      },
      {
        key: 'blank',
        name: 'Blank Page',
        link: '/app/pages/blank-page',
        icon: 'ios-document-outline'
      },
      {
        key: 'pricing',
        name: 'Pricing Page',
        link: '/app/pages/pricing',
        icon: 'ios-archive-outline'
      },
      {
        key: 'gallery',
        name: 'Photo Gallery',
        link: '/app/pages/photo-gallery',
        icon: 'ios-images-outline'
      },
      {
        key: 'settings',
        name: 'Settings',
        link: '/app/pages/settings',
        icon: 'ios-options-outline'
      },
      {
        key: 'help_support',
        name: 'Help & Support',
        link: '/app/pages/help-support',
        icon: 'ios-help-circle-outline'
      },
      {
        key: 'maintenance',
        name: 'Maintenance',
        link: '/maintenance',
        icon: 'ios-build-outline'
      },
      {
        key: 'coming_soon',
        name: 'Coming Soon',
        link: '/coming-soon',
        icon: 'ios-bonfire-outline'
      },
      {
        key: 'blog',
        name: 'Blog',
        title: true,
      },
      {
        key: 'blog_list',
        name: 'Blog Home',
        link: '/blog',
        icon: 'ios-home-outline'
      },
      {
        key: 'blog_detail',
        name: 'Article',
        link: '/blog/article',
        icon: 'ios-list-box-outline'
      },
      {
        key: 'errors',
        name: 'Errors',
        title: true,
      },
      {
        key: 'not_found_page',
        name: 'Not Found Page',
        link: '/app/pages/not-found',
        icon: 'ios-warning-outline'
      },
      {
        key: 'error_page',
        name: 'Error Page',
        link: '/app/pages/error',
        icon: 'ios-warning-outline'
      },
    ]
  },
  {
    key: 'tables',
    name: 'Tables',
    icon: 'ios-grid-outline',
    child: [
      {
        key: 'common_table',
        name: 'Common Table',
        title: true,
      },
      {
        key: 'basic_table',
        name: 'Basic',
        link: '/app/tables/basic-table',
        icon: 'ios-grid-outline'
      },
      {
        key: 'data_table',
        name: 'Data Tables',
        link: '/app/tables/data-table',
        icon: 'ios-cube-outline'
      },
      {
        key: 'table_playground',
        name: 'Table Playgound',
        link: '/app/tables/table-playground',
        icon: 'ios-list-box-outline'
      },
      {
        key: 'redux_table',
        name: 'Redux Table',
        title: true,
      },
      {
        key: 'editable_cell',
        name: 'Table Edit',
        link: '/app/tables/editable-cell',
        icon: 'ios-cube-outline'
      },
      {
        key: 'tree_table',
        name: 'Tree Table',
        link: '/app/tables/tree-table',
        icon: 'ios-git-merge'
      },
    ]
  },
  {
    key: 'forms',
    name: 'Forms Buttons',
    icon: 'ios-list-box-outline',
    child: [
      {
        key: 'buttons_collections',
        name: 'Button Collections',
        title: true,
      },
      {
        key: 'buttons',
        name: 'Buttons',
        link: '/app/forms/buttons',
        icon: 'ios-game-controller-a-outline'
      },
      {
        key: 'toggle_button',
        name: 'Toggle Button',
        link: '/app/forms/toggle-button',
        icon: 'ios-switch-outline'
      },
      {
        key: 'dial_button',
        name: 'Dial Button',
        link: '/app/forms/dial-button',
        icon: 'ios-add-circle-outline'
      },
      {
        key: 'text_input',
        name: 'Text Input',
        title: true,
      },
      {
        key: 'textfields',
        name: 'Textfields',
        link: '/app/forms/textfields',
        icon: 'ios-list-box-outline'
      },
      {
        key: 'autocomplete',
        name: 'Autocomplete & Tag',
        link: '/app/forms/autocomplete',
        icon: 'ios-list'
      },
      {
        key: 'datetimepicker',
        name: 'Date Time Picker',
        link: '/app/forms/date-time-picker',
        icon: 'ios-calendar-outline'
      },
      {
        key: 'reduxform',
        name: 'Redux Form',
        link: '/app/forms/reduxform',
        icon: 'ios-list-box-outline'
      },
      {
        key: 'selection',
        name: 'Selection',
        title: true,
      },
      {
        key: 'checkbox_radio',
        name: 'Checkbox & Radio',
        link: '/app/forms/checkbox-radio',
        icon: 'ios-checkbox-outline'
      },
      {
        key: 'switches',
        name: 'Switches',
        link: '/app/forms/switches',
        icon: 'ios-switch-outline'
      },
      {
        key: 'selectbox',
        name: 'Select',
        link: '/app/forms/selectbox',
        icon: 'ios-menu-outline'
      },
      {
        key: 'advanced_input',
        name: 'Advanced Input',
        title: true,
      },
      {
        key: 'slider',
        name: 'Slider Range',
        link: '/app/forms/slider-range',
        icon: 'ios-options-outline'
      },
      {
        key: 'upload',
        name: 'Upload',
        link: '/app/forms/upload',
        icon: 'ios-cloud-upload-outline'
      },
      {
        key: 'ratting',
        name: 'Ratting',
        link: '/app/forms/ratting',
        icon: 'ios-star-half'
      },
      {
        key: 'texteditor',
        name: 'WYSIWYG Editor',
        link: '/app/forms/wysiwyg-editor',
        icon: 'ios-create-outline'
      },
    ]
  },
  {
    key: 'ui',
    name: 'UI Collection',
    icon: 'ios-flower-outline',
    child: [
      {
        key: 'material_content',
        name: 'Block Container',
        title: true,
      },
      {
        key: 'card_papper',
        name: 'Card & Papper',
        link: '/app/ui/card-papper',
        icon: 'ios-card-outline'
      },
      {
        key: 'accordion',
        name: 'Accordion',
        link: '/app/ui/accordion',
        icon: 'ios-menu-outline'
      },
      {
        key: 'material_navigation',
        name: 'Navigation',
        title: true,
      },
      {
        key: 'tab',
        name: 'Tabs Navigation',
        link: '/app/ui/tabs',
        icon: 'ios-folder-outline'
      },
      {
        key: 'drawer_menu',
        name: 'Menu & Drawer',
        link: '/app/ui/drawer-menu',
        icon: 'ios-settings-outline'
      },
      {
        key: 'breadcrumbs',
        name: 'Breadcrumbs',
        link: '/app/ui/breadcrumbs',
        icon: 'ios-arrow-dropright'
      },
      {
        key: 'paginations',
        name: 'Paginations',
        link: '/app/ui/paginations',
        icon: 'ios-arrow-round-forward'
      },
      {
        key: 'steppers',
        name: 'Steppers',
        link: '/app/ui/steppers',
        icon: 'ios-glasses-outline'
      },
      {
        key: 'material_popup',
        name: 'Popup',
        title: true,
      },
      {
        key: 'dialog_modal',
        name: 'Dialog & Modal',
        link: '/app/ui/dialog-modal',
        icon: 'ios-glasses-outline'
      },
      {
        key: 'popover_tooltip',
        name: 'Popover & Tooltip',
        link: '/app/ui/popover-tooltip',
        icon: 'ios-photos-outline'
      },
      {
        key: 'material_notif',
        name: 'Notification',
        title: true,
        icon: 'ios-information-circle-outline'
      },
      {
        key: 'badges',
        name: 'Badges',
        link: '/app/ui/badges',
        icon: 'ios-bookmark-outline'
      },
      {
        key: 'snackbar',
        name: 'Messages',
        link: '/app/ui/snackbar',
        icon: 'ios-notifications-outline'
      },
      {
        key: 'material_dividers',
        name: 'Dividers',
        title: true,
      },
      {
        key: 'list_divider',
        name: 'List & Divider',
        link: '/app/ui/list',
        icon: 'ios-menu'
      },
      {
        key: 'custom_dividers',
        name: 'Custom Dividers',
        link: '/app/ui/dividers',
        icon: 'ios-menu-outline'
      },
      {
        key: 'material_image',
        name: 'Images',
        title: true,
      },
      {
        key: 'avatars',
        name: 'Avatars',
        link: '/app/ui/avatars',
        icon: 'ios-contact-outline'
      },
      {
        key: 'image_gird',
        name: 'Image Grid Gallery',
        link: '/app/ui/image-grid',
        icon: 'ios-apps-outline'
      },
      {
        key: 'slider_carousel',
        name: 'Slider & Carousel',
        link: '/app/ui/slider-carousel',
        icon: 'ios-images-outline'
      },
      {
        key: 'material_font_icon',
        name: 'Fonts & Icons',
        title: true,
      },
      {
        key: 'typography',
        name: 'Typography',
        link: '/app/ui/typography',
        icon: 'ios-create-outline'
      },
      {
        key: 'icons',
        name: 'Material Icons',
        link: '/app/ui/icons',
        icon: 'ios-heart-outline'
      },
      {
        key: 'ionicons',
        name: 'Ion Icons',
        link: '/app/ui/ionicons',
        icon: 'ios-ionic-outline'
      },
      {
        key: 'utilities',
        name: 'Utility',
        title: true,
      },
      {
        key: 'progress',
        name: 'Progress & Spinners',
        link: '/app/ui/progress',
        icon: 'ios-glasses-outline'
      },
      {
        key: 'tags',
        name: 'Tags',
        link: '/app/ui/tags',
        icon: 'ios-pricetag-outline'
      },
    ]
  },
  {
    key: 'charts',
    name: 'Charts',
    icon: 'ios-pie-outline',
    child: [
      {
        key: 'svg_chart',
        name: 'SVG Chart',
        title: true,
      },
      {
        key: 'line_charts',
        name: 'Line',
        link: '/app/charts/line-charts',
        icon: 'ios-pulse-outline'
      },
      {
        key: 'bar_charts',
        name: 'Bar',
        link: '/app/charts/bar-charts',
        icon: 'ios-stats-outline'
      },
      {
        key: 'area_charts',
        name: 'Area',
        link: '/app/charts/area-charts',
        icon: 'ios-analytics-outline'
      },
      {
        key: 'pie_charts',
        name: 'Pie & Doughnut',
        link: '/app/charts/pie-charts',
        icon: 'ios-pie-outline'
      },
      {
        key: 'radar_charts',
        name: 'Radar',
        link: '/app/charts/radar-charts',
        icon: 'ios-ionic-outline'
      },
      {
        key: 'scatter_charts',
        name: 'Scatter',
        link: '/app/charts/scatter-charts',
        icon: 'ios-sunny-outline'
      },
      {
        key: 'compossed_charts',
        name: 'Compossed',
        link: '/app/charts/compossed-chart',
        icon: 'ios-stats-outline'
      },
      {
        key: 'canvas_chart',
        name: 'Canvas Chart',
        title: true,
      },
      {
        key: 'doughnut_pie',
        name: 'Doughnut & Pie',
        link: '/app/charts/doughnut-pie-charts',
        icon: 'ios-pie-outline'
      },
      {
        key: 'bar_canvas_chart',
        name: 'Bar Direction',
        link: '/app/charts/bar-direction-charts',
        icon: 'ios-stats-outline'
      },
      {
        key: 'line_canvas_chart',
        name: 'Line and Scatter',
        link: '/app/charts/line-scatter-charts',
        icon: 'ios-sunny-outline'
      },
      {
        key: 'area_canvas_chart',
        name: 'Area Filled',
        link: '/app/charts/area-filled-charts',
        icon: 'ios-analytics-outline'
      },
      {
        key: 'radar_canvas_chart',
        name: 'Radar and Polar',
        link: '/app/charts/radar-polar-chart',
        icon: 'ios-ionic-outline'
      },
    ]
  },
  {
    key: 'maps',
    name: 'Maps',
    icon: 'ios-navigate-outline',
    child: [
      {
        key: 'google_map',
        name: 'Google Map',
        title: true,
      },
      {
        key: 'map_marker',
        name: 'Map Marker',
        link: '/app/maps/map-marker',
        icon: 'ios-pin-outline'
      },
      {
        key: 'map_direction',
        name: 'Map Direction',
        link: '/app/maps/map-direction',
        icon: 'ios-arrow-dropright'
      },
      {
        key: 'map_searchbox',
        name: 'Map with Searchbox',
        link: '/app/maps/map-searchbox',
        icon: 'ios-search-outline'
      },
      {
        key: 'map_traffic',
        name: 'Traffic Indicator',
        link: '/app/maps/map-traffic',
        icon: 'ios-car-outline'
      },
      {
        key: 'street_view',
        name: 'Street View',
        link: '/app/maps/street-view',
        icon: 'ios-eye-outline'
      },
    ]
  },
  {
    key: 'menu_levels',
    name: 'Menu Levels',
    multilevel: true,
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'level_1',
        name: 'Level 1',
        link: '/#'
      },
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            link: '/#'
          },
          {
            key: 'sub_menu_2',
            name: 'Sub Menu 2',
            link: '/#'
          },
        ]
      },
    ]
  }
];
