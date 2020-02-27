const formatDate = (date) => {

  let dateObject = new Date(date);
  let month = dateObject.getMonth();
  let day = dateObject.getDate();
  let year = dateObject.getFullYear();

  const monthString = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (day < 10) {
    day = `0${day}`
  }

  return (`${day}-${monthString[month]}-${year}`)
}

module.exports = formatDate
