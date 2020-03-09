const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  autoComplete: {
    width: '100% !important',
    '& autoCompleteInner': {
      width: '100%'
    }
  },
  autoCompleteInner: {
    width: '100% !Important'
  },
  formControl: {
    minWidth: 120,
    width: '100%'
  },
  label: {
    padding: theme.spacing(1)
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  check_icon: {
    float: 'right',
    width: '26px'
  },
  button_icon: {
    width: '32px',
    marginRight: '18px'
  },
  link_button: {
    color: '#2b97ed',
    fontWeight: '500'
  },
  button: {
    marginBottom: '5px',
    float: 'left'
  },
  gridMargin: {
    marginBottom: '15px'
  },
  headingMargin: {
    width: '100 %',
    marginTop: ' 0',
  },
  sec_1_heading: {
    float: 'left',
    marginTop: '10px'
  },
  sec_1_textField: {
    width: '100%',
    margin: '0'
  },
  sec_2_root: {
    marginTop: '20px'
  },
  sec_3_grid1: {
    padding: '34px',
    background: 'whitesmoke'
  },
  sec_3_grid2: {
    padding: ' 34px',
    background: 'whitesmoke',
    marginTop: '10px',
  },
  sec_3_grid3: {
    padding: '34px',
    background: 'whitesmoke',
    marginTop: '10px',
  },
  sec_3_grid4: {
    padding: '34px',
    marginTop: '11px',
    background: 'whitesmoke',
  },
  sec_4_grid: {
    marginTop: '15px',
    marginBottom: '40px',
    padding: ' 15px',
    background: 'whitesmoke',
  },
  customGrid: {
    width: '100%',
    display: 'block',
    textAlign: 'left',
    marginTop: '10px'
  },
  choosenTerms: {
    width: 'auto',
    display: 'inline',
    padding: '10px 20px',
    textAlign: 'left',
    background: '#ccc',
    borderRadius: '24px',
    marginRight: '5px'
  },
  textCapitalize: {
    textTransform: 'capitalize'
  },
  /* Bulk Email */
  spacerEnhancer: {
    padding: '10px 0px'
  },
  leftGap: {
    lineHeight: '2.3rem',
    color: 'rgb(56, 174, 0)',
    textAlign: 'left',
    marginRight: '0.5rem'
  },
  paraAlign: {
    textAlign: 'left',
    display: 'block',
    lineHeight: '22px',
    marginTop: '10px',
  },
  paddingAlign: {
    padding: '1em 0px'
  },
  step3Root: {
    padding: 20,
    maxWidth: '100%',
    width: '100%'
  },
  activeBoarder: {
    border: '2px solid green',
    padding: '5px !important',
    cursor: 'pointer'
  },
});

export default styles;
