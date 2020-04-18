import { fade } from '@material-ui/core/styles/colorManipulator';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
const styles = theme => ({
  root: {
    display: 'block'
  },
  profileList: {
    padding: 0,
    '& li': {
      paddingLeft: 0
    }
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    backgroundColor: deepPurple[500],
  },
  pinkAvatar: {
    backgroundColor: pink[500],
  },
  greenAvatar: {
    backgroundColor: green[500],
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`,
    background: 'none',
  },
  albumRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      width: '100%'
    }
  },
  gridList: {
    width: 500,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  img: {
    maxWidth: 'none'
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing(3),
  }),
  progressRoot: {
    marginBottom: theme.spacing(3),
  },
  styledPaper: {
    backgroundColor: theme.palette.secondary.main,
    padding: 20,
    '& $title, & $subtitle': {
      color: theme.palette.common.white
    }
  },
  progress: {
    marginTop: 20,
    background: theme.palette.secondary.dark,
    '& div': {
      background: theme.palette.primary.light,
    }
  },
  chip: {
    marginTop: 20,
    background: theme.palette.common.white,
    color: theme.palette.secondary.main,
    '& div': {
      background: green[500],
      color: theme.palette.common.white
    }
  },
  colList: {
    '& li': {
      padding: '10px 0'
    },
    '& $avatar': {
      margin: 0
    }
  },
  title: {},
  subtitle: {},
  rootAlbum: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  image: {
    position: 'relative',
    height: 'auto',
    boxShadow: theme.shadows[6],
    borderRadius: theme.rounded.medium,
    overflow: 'hidden',
    marginBottom: 30,
    width: '100% !important', // Overrides inline-style
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.6,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  focusVisible: {},
  gridListAlbum: {
    height: 'auto',
    background: theme.palette.common.black
  },
  subheader: {
    width: '100%',
  },
  subscribeForm: {
    marginTop: theme.spacing(1) * -6,
    display: 'flex',
    '& > div': {
      flex: 1
    },
    '& button': {
      marginTop: theme.spacing(4.5),
      marginLeft: theme.spacing(1)
    }
  },
  whiteInputRoot: {
    '& label, input': {
      color: `${theme.palette.common.white} !important`,
    },
    '& > div': {
      borderColor: fade(theme.palette.common.white, 0.6),
    }
  },
  listText: {
    whiteSpace: 'normal'
  },
  posRelative: {
    position: 'relative'
  },
  removePos: {
    position: 'absolute',
    bottom: '-11px',
    left: '41%'
  },
  papperBlock: {
    margin: '15%',
    marginTop: "15px",
  },
  customAvatar: {
    display: 'inline-block',
    marginRight: 10,
    width: 103,
    height: 'auto'
  },
  customHeading: {
    display: "inline-block",
    position: "absolute"
  },
  companyTitle: {
    textAlign: "center"
  },
  makeFlex: {
    display: "flex"
  },
  jobTitle: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px"
  },
  subHeading: {
    marginTop: "20px",
  },
  content: {
    // paddingLeft: "10px",
    // paddingRight: "10px"
  },
  customMargin: {
    marginRight: "10px"
  }
});

export default styles;
