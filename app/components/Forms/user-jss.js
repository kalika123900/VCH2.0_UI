import { fade } from '@material-ui/core/styles/colorManipulator';
import cyan from '@material-ui/core/colors/cyan';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import bg from 'dan-images/petal_grey_bg.svg';
import bgLight from 'dan-images/petal_bg.svg';
import { gradientBgLight } from 'containers/Templates/appStyles-jss';
const rootWraper = {
  display: 'flex',
  width: '100%',
  zIndex: 1,
  position: 'relative'
};

const wrapper = (theme, opacity) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: fade(theme.palette.background.paper, opacity),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.text.primary,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed'
});

const styles = theme => ({
  root: {
    ...rootWraper
  },
  placeholderUiOff: {
    display: 'none'
  },
  placeholderUiOn: {
    display: 'block'
  },
  autoComplete: {
    width: '100% !important',
    '& autoCompleteInner': {
      width: '100%'
    },
  },
  wrapContent: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
    backgroundColor: '#fad6d6',
    '@media(max-width:760px)': {
      flexDirection: 'column'
    }
  },
  autoCompleteInner: {
    width: '100% !Important'
  },
  rootFull: {
    ...rootWraper,
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      overflow: 'hidden'
    },
  },
  containerSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      overflow: 'hidden'
    },
  },
  paperWrap: {
    ...wrapper(theme, 1),
  },
  sideWrap: {
    ...wrapper(theme, 1),
    height: '100%',
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      width: 480,
    },
    '& $topBar': {
      marginBottom: theme.spacing(4)
    }
  },
  fullWrap: {
    ...wrapper(theme, 0.9),
    height: '100%',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& $topBar': {
      width: '100%'
    }
  },
  petal: {
    backgroundImage: theme.palette.type === 'dark' ? `url(${bgLight})` : `url(${bg})`,
  },
  icon: {},
  topBar: {
    display: 'flex',
    background: theme.palette.primary.main,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    '& a': {
      color: '#edeff9'
    },
    '& $icon': {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      marginBottom: theme.spacing(3),
      padding: theme.spacing(0),
      '& a': {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      },
    }
  },
  outer: {},
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 10px',
    position: 'relative',
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&$outer': {
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2)
    },
    '& img': {
      width: 70,
      marginRight: 10,
    },
  },
  formWrap: {
    [theme.breakpoints.up('sm')]: {
      padding: '0 100px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 150px'
    },
  },
  pageFormWrap: {
    width: '100%',
    // padding: theme.spacing(3),
    margin: `${theme.spacing(2)}px auto`,
    [theme.breakpoints.up('sm')]: {
      width: 480,
    },
  },
  pageFormSideWrap: {
    margin: '0 auto',
    [theme.breakpoints.only('sm')]: {
      width: 480,
    },
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  socmedLogin: {
    [theme.breakpoints.up('sm')]: {
      padding: '24px 100px 1px',
    },
    '& button': {
      padding: '4px 24px'
    }
  },
  socmedSideLogin: {
    padding: '24px 24px 1px',
    margin: '0 auto',
    '& button': {
      padding: '4px 16px',
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.only('sm')]: {
      width: 480,
    },
  },
  userFormWrap: {
    width: '94%',
    [theme.breakpoints.up('md')]: {
      width: 720
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    },
  },
  sideFormWrap: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  fullFormWrap: {
    height: '100%',
    width: '100%'
  },
  title: {
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontSize: 14
  },
  titleGradient: {
    background: gradientBgLight(theme),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(3),
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.55em'
    }
  },
  opening: {
    color: theme.palette.common.white,
    width: '100%',
    textAlign: 'center',
    '& h1': {
      display: 'block',
      [theme.breakpoints.down('md')]: {
        fontSize: 32,
        lineHeight: '48px'
      }
    },
    '& p': {
      color: theme.palette.common.white,
      fontSize: 18,
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      }
    }
  },
  label: {},
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: `${theme.spacing(2)}px 0`,
    fontSize: 12,
    '& $label': {
      fontSize: 12,
      '& span': {
        fontSize: 12
      }
    },
    '& button': {
      margin: `0 ${theme.spacing(1)}px`,
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
  },
  noMargin: {
    margin: 0
  },
  redBtn: {
    color: red[500],
    borderColor: red[500],
    '&:hover': {
      borderColor: red[700],
    },
  },
  blueBtn: {
    color: indigo[300],
    borderColor: indigo[300],
    '&:hover': {
      borderColor: indigo[500],
    },
  },
  cyanBtn: {
    color: cyan[500],
    borderColor: cyan[500],
    '&:hover': {
      borderColor: cyan[700],
    },
  },
  buttonLink: {
    background: 'none',
    padding: 0,
    textTransform: 'none',
    transition: 'color ease 0.3s',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.875rem',
    '&:hover': {
      background: 'none',
      color: theme.palette.secondary.main
    }
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  footer: {
    textAlign: 'center',
    padding: 5,
    background: theme.palette.grey[100],
    fontSize: 14,
    position: 'relative'
  },
  welcomeWrap: {
    position: 'relative'
  },
  tab: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`,
  },
  link: {
    fontSize: '0.875rem',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  socmedFull: {
    textAlign: 'center',
    width: '100%',
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    '& button': {
      width: '100%',
      display: 'block',
      margin: `0 auto ${theme.spacing(2)}px`
    },
    [theme.breakpoints.up('sm')]: {
      '& button': {
        width: 400,
      }
    }
  },
  lockWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  lockForm: {
    display: 'flex',
    alignItems: 'baseline',
  },
  unlockBtn: {
    top: -4
  },
  notifyForm: {
    alignItems: 'baseline',
    [theme.breakpoints.down('xs')]: {
      '& button': {
        marginTop: theme.spacing(3),
        width: '100%'
      },
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      '& button': {
        width: 'auto'
      }
    }
  },
  lockField: {
    marginRight: theme.spacing(1),
    '& label': {
      color: `${theme.palette.common.white} !important`,
    },
    '& label + div': {
      background: fade(theme.palette.primary.light, 0.3),
      border: 'none',
      '& svg': {
        fill: fade(theme.palette.common.white, 0.7)
      }
    }
  },
  avatar: {
    width: 150,
    height: 150,
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(3),
    },
    boxShadow: theme.glow.medium
  },
  userName: {
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
      textAlign: 'center'
    }
  },
  hint: {
    padding: theme.spacing(1)
  },
  brandCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  centerAdornment: {
    justifyContent: 'center',
    '& > div': {
      width: '100%'
    },
    '& aside': {
      top: -10,
      [theme.breakpoints.up('sm')]: {
        left: 10,
      },
      position: 'relative'
    }
  },
  centerV: {
    justifyContent: 'center'
  },
  optArea: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(0.5)}px`
  },
  customWrap: {
    padding: 0
  },
  customMargin: {
    marginTop: '10%'
  },
  lineCont: {
    width: '50%',
    height: '1px',
    backgroundColor: '#cac9c9',
    position: 'relative',
    margin: '20px 0px'
  },
  circleArea: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '35px',
    height: '35px',
    backgroundColor: '#3f51b5',
    border: 'solid 1px #fbfbfb',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '0.9rem',
    lineHeight: '32px',
    position: 'absolute',
    top: '-17px',
    left: 'calc(50% - 30px)',
  },
  customGrid: {
    display: 'block',
    textAlign: 'left',
    marginTop: '10px'
  },
  skillItems: {
    background: '#3787C2',
    borderRadius: ' 25px',
    padding: ' 5px',
    display: 'block',
    color: 'white',
    marginLeft: '10px',
    marginBottom: '10px',
    width: 'fit-content'
  },
  btnMargin: {
    marginBottom: '5px'
  },
  chatList: {
    padding: `${theme.spacing(6)}px ${theme.spacing(3)}px`,
    overflow: 'auto',
    minHeight: 'calc(100% - 100px)',
    marginTop: 95,
    background: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      marginTop: 120,
      background: theme.palette.type === 'dark' ? fade(theme.palette.grey[800], 0.75) : fade(theme.palette.background.paper, 0.95),
    },
    '& li': {
      marginBottom: theme.spacing(6),
      display: 'flex',
      position: 'relative',
      '& time': {
        position: 'absolute',
        top: -20,
        color: theme.palette.grey[500],
        fontSize: 11
      }
    },
  },
  content: {
    flexGrow: 1,
    transition: 'left 0.4s ease-out, opacity 0.4s ease-out',
    [theme.breakpoints.down('xs')]: {
      left: '100%',
      top: 0,
      opacity: 0,
      position: 'absolute',
      zIndex: 10000,
      width: '100%',
      height: '100%',
    }
  },
  detailPopup: {
    [theme.breakpoints.down('xs')]: {
      left: 0,
      opacity: 1,
    }
  },
  talk: {
    flex: 1,
    '& p': {
      marginBottom: 10,
      position: 'relative',
      '& span': {
        padding: 10,
        borderRadius: 10,
        display: 'inline-block'
      }
    }
  },
  avatar: {},
  from: {
    '& time': {
      left: 60,
    },
    '& $avatar': {
      marginRight: 20
    },
    '& $talk': {
      '& > p': {
        '& span': {
          backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
          boxShadow: theme.shadows[1]
        },
        '&:first-child': {
          '& span': {
            borderTopLeftRadius: 0,
          },
          '&:after': {
            content: '""',
            borderRight: theme.palette.type === 'dark' ? `10px solid ${theme.palette.secondary.dark}` : `10px solid ${theme.palette.secondary.light}`,
            borderBottom: '15px solid transparent',
            position: 'absolute',
            left: -9,
            top: 0
          },
        }
      }
    }
  },
  to: {
    flexDirection: 'row-reverse',
    '& time': {
      right: 60,
    },
    '& $avatar': {
      marginLeft: 20
    },
    '& $talk': {
      textAlign: 'right',
      '& > p': {
        '& span': {
          textAlign: 'left',
          backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
          boxShadow: theme.shadows[1]
        },
        '&:first-child': {
          '& span': {
            borderTopRightRadius: 0,
          },
          '&:after': {
            content: '""',
            borderLeft: theme.palette.type === 'dark' ? `10px solid ${theme.palette.primary.dark}` : `10px solid ${theme.palette.primary.light}`,
            borderBottom: '15px solid transparent',
            position: 'absolute',
            right: -9,
            top: 0
          },
        }
      }
    }
  },
  messageBox: {
    border: 'none',
    padding: 0,
    outline: 'none',
    width: '100%',
    '&:after, &:before': {
      display: 'none'
    }
  },
  writeMessage: {
    bottom: 90,
    display: 'flex',
    minHeight: 55,
    margin: '0 16px',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    borderRadius: 50,
    boxShadow: theme.shadows[2],
    position: 'relative',
    '& > div:first-child': {
      height: '100%',
      flex: 1,
    },
    '& input': {
      color: theme.palette.text.primary,
      background: 'transparent',
      width: '100%',
      height: '100%',
      margin: 0,
      padding: '2px 20px 2px 2px',
      boxSizing: 'border-box',
      border: 'none',
      boxShadow: 'none',
      outline: 'none'
    }
  },
  messageBlock: {
    position: 'relative',
    bottom: '0',
    width: '100%',
    minHeight: 150,
    border: '1px solid #ccc',
    padding: '10px',
    margin: 10
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 250,
    maxHeight: 250,
    border: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    color: theme.palette.text.primary
  },
  sendButton: {
    position: 'absolute',
    right: '0',
    bottom: '70px',
  },
  toolbarEditor: {
    margin: '5px 0 5px 0',
    background: theme.palette.background.default,
    border: '1px solid #BBBBBB',
    '& > div': {
      background: theme.palette.background.paper,
      '& img': {
        filter: theme.palette.type === 'dark' ? 'invert(100%)' : 'invert(0%)'
      },
      '& a': {
        color: theme.palette.text.primary,
        '& > div': {
          borderTopColor: theme.palette.text.primary,
        }
      }
    }
  },
  rdwInlineWrapper: {
    marginBottom: '0px',
  },
  emojiPopup: {
    zIndex: '999',
    position: 'absolute',
    top: '-50px',
    width: '278px',
    height: '50px',
    left: '30px',
  },
  '@media (max-width: 720px)': {
    emojiPopup: {
      width: 120
    }
  },
  checkboxButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  studentCardGrid: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing(3),
  }),
  warnMsg: {
    textAlign: 'center',
    color: 'green'
  },
  customFileUpload: {
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer',
    marginTop: 19,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
    color: '#3f51b5',
    backgroundColor: 'whitesmoke'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    '& svg': {
      fill: theme.palette.common.white
    }
  },
  button: {
    marginTop: 20,
    height: 50
  },
  customTopBar: {
    backgroundColor: '#3f51b5',
    width: '100%',
    marginBottom: 46,
    padding: 17
  }
});

export default styles;
