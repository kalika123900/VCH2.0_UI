const formatDate = (date) => {
  const dateObject = new Date(date);
  const month = dateObject.getMonth();
  let day = dateObject.getDate();
  const year = dateObject.getFullYear();

  const monthString = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (day < 10) {
    day = `0${day}`;
  }

  return (`${day}-${monthString[month]}-${year}`);
};

module.exports = formatDate;
