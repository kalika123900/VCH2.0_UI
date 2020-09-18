const styles = () => ({
  media: {
    width: '100%',
    padding: '0 10px',
    objectFit: 'cover',
  },
  button: {
    '& > *': {
      margin: '5px 5px',
    },
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
    padding: 10
  },
  card: {
    textAlign: 'center',
    padding: 10,
    marginTop: 10
  },
  cardTitle: {

  },
  cardDesc: {
    height: '3.6em',
  },
  content: {
    overflow: 'hidden',
  },
  cardButton: {
    textAlign: 'center',
    margin: 20
  }
});

export default styles;
