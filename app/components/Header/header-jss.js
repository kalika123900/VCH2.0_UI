import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { gradientBgLight, gradientBgDark } from 'containers/Templates/appStyles-jss';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

const drawerWidth = 240;
const drawerBigWidth = 280;

const styles = theme => ({
  appBar: {
    background: 'rgba(0,0,0,0)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& $menuButton': {
      color: '#fff',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      zIndex: 10,
    },
    '&$left': {
      '& $menuButton': {
        marginLeft: 13,
      },
      '& $headerTitle': {
        left: theme.spacing(2),
      }
    },
    '&$leftBig': {
      '& $menuButton': {
        marginLeft: 30,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
          marginLeft: 13,
        },
      },
      '& $headerTitle': {
        left: theme.spacing(4),
      }
    },
    '&$right': {
      '& $menuButton': {
        marginRight: 13,
      },
      '& $headerTitle': {
        right: theme.spacing(2),
      },
      '& > div': {
        flexDirection: 'row-reverse'
      },
      '& $flex': {
        textAlign: 'left'
      }
    },
  },
  attachedbar: {
    position: 'relative',
    '& $menuButton': {
      margin: `0 ${theme.spacing(2)}px`
    },
    '& $wrapper': {
      [theme.breakpoints.down('lg')]: {
        border: `1px solid ${theme.palette.divider}`
      },
    }
  },
  floatingBar: {
    position: 'fixed'
  },
  appMenu: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(0.5)}px 0`,
    },
    [theme.breakpoints.up('lg')]: {
      background: fade(theme.palette.background.paper, 0.8),
    },
    color: theme.palette.text.primary
  },
  flex: {
    flex: 1,
    textAlign: 'right'
  },
  flexDefault: {
    flex: 1,
    textAlign: 'right'
  },
  left: {},
  leftBig: {},
  right: {},
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&$left': {
      '& $menuButton': {
        [theme.breakpoints.up('lg')]: {
          marginLeft: -20
        }
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    '&$leftBig': {
      '& $menuButton': {
        [theme.breakpoints.up('lg')]: {
          marginLeft: -20
        }
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: drawerBigWidth,
        width: `calc(100% - ${drawerBigWidth}px)`,
      },
    },
    '&$right': {
      '& $menuButton': {
        [theme.breakpoints.up('lg')]: {
          marginRight: -20
        }
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    '& $menuButton': {
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
      boxShadow: theme.glow.medium,
    },
    '& $headerAction': {
      marginLeft: theme.spacing(1)
    },
    '&$darker': {
      '& $menuButton': {
        color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      }
    }
  },
  menuButton: {},
  hide: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dark: {},
  light: {},
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 22,
    display: 'inline-block',
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '&$light': {
      background: fade(theme.palette.common.white, 0.2),
    },
    '&$dark': {
      background: theme.palette.type === 'dark' ? theme.palette.grey[700] : fade(theme.palette.common.white, 0.8),
      boxShadow: theme.shade.light,
      '& input': {
        color: theme.palette.grey[700],
      },
      '& input::placeholder': {
        color: theme.palette.grey[400],
        opacity: 1 /* Firefox */
      },
      '& input:-ms-input-placeholder': {
        color: theme.palette.grey[400],
      },
      '& input::-ms-input-placeholder': { /* Internet Explorer 10-11 */
        color: theme.palette.grey[400],
      }
    },
    '& $miniInput': {
      width: 70
    },
  },
  searchWrapper: {
    [theme.breakpoints.down('md')]: {
      flex: 1,
      textAlign: 'right'
    }
  },
  search: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  miniInput: {
    paddingLeft: 0,
    textIndent: '999999px'
  },
  gradientBg: {},
  solidBg: {},
  darker: {
    backgroundAttachment: 'fixed',
    boxShadow: theme.shadows[3],
    '&$gradientBg': {
      backgroundImage: theme.palette.type === 'dark' ? gradientBgDark(theme) : gradientBgLight(theme),
    },
    '&$solidBg': {
      backgroundColor: theme.palette.type === 'dark' ? darken(theme.palette.primary.main, 0.4) : theme.palette.primary.main
    },
    '& $menuButton': {
      color: theme.palette.common.white
    }
  },
  fixed: {
    position: 'fixed',
    left: 0,
    top: 0,
    [theme.breakpoints.up('lg')]: {
      top: theme.spacing(1) * -8,
    },
    '& nav': {
      padding: '16px 0'
    }
  },
  separatorV: {
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    height: 20,
    margin: '0 10px',
    opacity: 0.4
  },
  notifMenu: {
    '& li': {
      height: 'auto',
      '& h3': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }
  },
  badgeMenu: {
    '& span': {
      top: 0,
      right: -30
    }
  },
  textNotif: {
    '& span': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'block'
    }
  },
  notifIcon: {
    '& svg': {
      width: 28,
      height: 28,
    },
    '&$dark': {
      '& svg': {
        fill: theme.palette.text.primary,
      }
    },
    '&$light': {
      '& svg': {
        fill: theme.palette.common.white,
      }
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px 5px',
    height: 64,
    position: 'absolute',
    width: '100%',
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '& img': {
      marginRight: 10,
      width: 30
    },
  },
  mainMenu: {
    padding: `${theme.spacing(1)}px 10`,
    width: 'auto',
    float: 'right',
    display: 'block',
    transition: 'padding 0.3s ease',
    '& > div': {
      display: 'flex',
      justifyContent: 'center'
    },
  },
  headMenu: {
    fontSize: 12,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    minHeight: 'auto',
    margin: `0 ${theme.spacing(0.5)}px`
  },
  opened: {
    color: theme.palette.primary.main,
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
    '& svg': {
      fill: theme.palette.primary.main,
    }
  },
  rightIcon: {
    marginLeft: theme.spacing(0.5),
    opacity: 0.3
  },
  selected: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      fill: theme.palette.primary.light,
    },
    '& $rightIcon': {
      opacity: 0.7
    }
  },
  paperMenu: {
    overflow: 'auto',
    maxHeight: 500
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 2
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold',
    background: theme.palette.background.paper,
    borderRadius: theme.rounded.medium
  },
  dropDownMenu: {
    minWidth: 200,
    marginTop: theme.spacing(1.5),
    position: 'relative'
  },
  active: {},
  menuItem: {
    '& span': {
      fontSize: 14,
    },
    '&$active': {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      '& span': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      }
    }
  },
  megaMenu: {
    padding: theme.spacing(2),
    '& $title': {
      paddingLeft: theme.spacing(2)
    }
  },
  megaItem: {
    display: 'inline-block',
    width: 'auto',
    margin: theme.spacing(1),
    borderRadius: theme.rounded.big,
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
    '& span': {
      fontSize: 14,
    },
    '& div': {
      padding: 0
    },
    '&$active': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      '& span': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      }
    }
  },
  bigIcon: {
    display: 'block',
    marginTop: 40,
    '& svg': {
      width: 100,
      height: 100,
      fill: theme.palette.primary.main,
      margin: '0 auto',
      display: 'inherit'
    }
  },
  button: {},
  headerProperties: {
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    zIndex: 1
  },
  fadeOut: {},
  invert: {},
  headerAction: {
    margin: `0 ${theme.spacing(3)}px`,
    transition: 'opacity 0.5s ease',
    '& $button': {
      margin: `0 ${theme.spacing(1)}px / 2`,
      '& svg': {
        fill: fade(theme.palette.common.white, 0.87),
        width: 28,
        height: 28
      }
    },
    '&$fadeOut': {
      opacity: 0,
    },
    '&$invert': {
      '& $button': {
        '& svg': {
          fill: fade(theme.palette.text.primary, 0.5),
        }
      }
    }
  },
  show: {},
  headerTitle: {
    transition: 'all 0.3s ease',
    fontSize: theme.spacing(3),
    position: 'absolute',
    textTransform: 'capitalize',
    fontWeight: 700,
    top: 60,
    color: theme.palette.common.white,
    opacity: 0,
    '&$show': {
      top: theme.spacing(1),
      opacity: 0.87
    }
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  searchHeaderMenu: {
    flex: 1,
    flexDirection: 'row-reverse',
    display: 'flex',
    alignItems: 'center'
  },
  user: {
    justifyContent: 'center'
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    border: 'none',
    background: 'none',
    color: theme.palette.text.primary,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  insetcustom: {
    paddingLeft: '24px'
  },
  opened: {
    '& $primary, & $icon': {
      color: theme.palette.primary.main,
    },
  },
  drawerPaperClose: {
    width: theme.spacing(8),
    position: 'absolute',
    overflowX: 'hidden',
    background: theme.palette.background.paper,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& $user': {
      justifyContent: 'flex-start'
    },
    '& $bigAvatar': {
      width: 40,
      height: 40,
    },
    '& nav': {
      display: 'none'
    },
    '&:hover': {
      width: drawerWidth,
      boxShadow: theme.shadows[6],
      '& nav': {
        display: 'block'
      }
    },
    '& $brand': {
      display: 'none'
    },
    '& $profile': {
      flexDirection: 'row',
      top: theme.spacing(6),
      padding: theme.spacing(0.5),
      textAlign: 'left',
      '& button': {
        width: 'auto'
      }
    },
    '& $avatar': {
      marginRight: theme.spacing(3)
    },
    '& $menuContainer': {
      '&$menuContainer': {
        paddingTop: theme.spacing(10),
        paddingBottom: 0,
      }
    },
  },
  drawerInner: {
    height: '100%',
    position: 'fixed',
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.background.paper, 0.75) : fade(theme.palette.background.paper, 0.95),
    boxShadow: theme.shade.light,
  },
  drawerInnerMobile: {
    height: '100%',
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.background.paper, 0.75) : fade(theme.palette.background.paper, 0.95),
  },
  drawerHeader: {
    padding: '0',
    zIndex: 1,
    position: 'relative',
    ...theme.mixins.toolbar,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    boxShadow: theme.glow.light
  },
  brandBar: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:after': {
      transition: theme.transitions.create(['box-shadow'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  },
  darker: {
    background: 'none',
  },
  nested: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    margin: `${theme.spacing(0.5)}px 0`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(3)
    }
  },
  child: {
    '& a': {
      paddingLeft: theme.spacing(6),
    }
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    paddingLeft: theme.spacing(10),
    marginTop: theme.spacing(3),
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold'
  },
  dense: {
    marginLeft: -15,
    '& > $title:first-child': {
      margin: '0'
    },
    '& $head': {
      paddingLeft: theme.spacing(10)
    }
  },
  active: {
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.primary.main, 0.24) : theme.palette.primary.light,
    '& $primary': {
      color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
    },
    '& $icon svg': {
      fill: theme.palette.primary.dark,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.primary.main, 0.24) : theme.palette.primary.light,
    }
  },
  nolist: {
    listStyle: 'none',
  },
  primary: {
    whiteSpace: 'nowrap'
  },
  icon: {
    minWidth: theme.spacing(5),
    fill: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
  },
  iconed: {},
  head: {
    padding: `${theme.spacing(1)}px 0`,
    margin: `${theme.spacing(1)}px 0`,
    borderRadius: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    paddingLeft: theme.spacing(3),
    '&$iconed': {
      paddingLeft: theme.spacing(3),
    },
    '& svg[class^="MuiSvgIcon"]': {
      left: -10,
      position: 'relative'
    },
  },
  headCapital: {
    padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(9)}px`,
    left: theme.spacing(1) * -2,
    position: 'relative',
    textTransform: 'uppercase',
    borderRadius: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    margin: `${theme.spacing(1)}px`,
    '& span': {
      fontSize: 14
    }
  },
  copyright: {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      background: 'none',
      position: 'absolute',
    },
    left: theme.spacing(3),
    lineHeight: '24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 10px 5px',
    height: 64,
    position: 'relative',
    textDecoration: 'none',
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
    color: theme.palette.text.primary,
    '& img': {
      width: 30,
      marginRight: 10,
    },
  },
  brandBig: {
    paddingTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center',
    '& img': {
      width: 68
    },
    '& h3': {
      fontSize: 18,
      marginTop: theme.spacing(2),
      fontWeight: 500,
      color: theme.palette.text.primary,
    }
  },
  profile: {
    height: 120,
    width: '100%',
    display: 'flex',
    fontSize: 14,
    padding: 10,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: `${theme.spacing(2)}px 0`,
    zIndex: 0,
    '& h4': {
      fontSize: 18,
      marginBottom: 0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 110
    },
    '& button': {
      fontSize: 12,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: 110,
      display: 'block',
      overflow: 'hidden',
      textTransform: 'capitalize',
      padding: 0,
      minHeight: 20,
      marginTop: 4,
    }
  },
  statusMenu: {
    '& li': {
      width: 100
    }
  },
  dotStatus: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    display: 'inline-block',
    borderRadius: '50%',
    marginRight: theme.spacing(0.5)
  },
  online: {
    backgroundColor: lightGreen[500]
  },
  bussy: {
    backgroundColor: red[500]
  },
  idle: {
    backgroundColor: amber[500]
  },
  offline: {
    backgroundColor: grey[500]
  },
  rounded: {},
  landingNav: {},
  withProfile: {},
  menuContainer: {
    overflow: 'auto',
    height: 'calc(100% - 64px)',
    width: drawerWidth,
    position: 'relative',
    display: 'block',
    padding: `${theme.spacing(5)}px 0`,
    '&$withProfile': {
      paddingTop: theme.spacing(18)
    },
    '&$landingNav': {
      [theme.breakpoints.up('lg')]: {
        paddingTop: theme.spacing(5)
      },
      [theme.breakpoints.down('lg')]: {
        height: 'calc(100% - 164px)',
        paddingTop: theme.spacing(5)
      }
    },
    '&$rounded': {
      paddingRight: theme.spacing(1.5),
      '& a': {
        borderRadius: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
      },
      '& $opened': {
        '&:before': {
          background: theme.palette.primary.main
        }
      }
    },
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.4)',
      }
    }
  },
  divider: {
    marginTop: theme.spacing(1)
  },
  badge: {
    height: 'auto'
  },
  menuItem: {
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  menuitemColor: {
    color: '#fff',
    marginTop: '0px',
    '& span': {
      fontSize: '15px',
    }
  },
  logoBlock: {
    display: 'inline-block',
    float: 'left',
    padding: '20px',
    width: '20%'
  },
  headerCustom: {
    display: 'block',
    background: '#3F51B5'
  }
});

export default styles;
