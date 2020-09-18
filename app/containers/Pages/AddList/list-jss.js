const styles = () => ({
  textField: {
    width: '100%'
  },
  formControl: {
    width: '100%',
    height: '100%'
  },
  textArea: {
    minHeight: '150px',
    maxHeight: '150px',
    width: '100%',
    padding: 5,
    margin: 8,
    marginTop: 25,
    overflowY: 'auto !important'
  },
  selectArea: {
    margin: 8,
    marginTop: 2,
    width: '100%'
  },
  menuItem: {
    whiteSpace: 'pre-line',
    '@media(min-width:1280px)': {
      width: 400
    },
    '@media(min-width:1920px)': {
      width: 612
    }
  },
  buttonArea: {
    margin: 8
  },
  button: {
    background: '#3f51b5',
    cursor: 'pointer',
    borderRadius: '6px',
    color: 'white',
    marginRight: 5,
    padding: '10px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  }
});

export default styles;