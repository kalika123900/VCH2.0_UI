export function getDate() {
  let today = new Date();
  let dd = today.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const mm = monthNames[today.getMonth()]; // January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  today = mm + ', ' + dd + ' ' + yyyy;

  return today;
};

export function getTime() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();

  if (h < 10) {
    h = '0' + h;
  }

  if (m < 10) {
    m = '0' + m;
  }

  now = h + ':' + m;
  return now;
};

export const DateHelper = {
  addDays(aDate, numberOfDays) {
    aDate.setDate(aDate.getDate() + numberOfDays);
    return aDate;
  },
  format: function format(date) {
    return [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + date.getDate()).slice(-2)
    ].join('-');
  }
};

export const parseDateHelper = {
  addDays(aDate, numberOfDays) {
    aDate.setDate(aDate.getDate() + parseInt(numberOfDays));
    return aDate;
  },
  format: function format(date) {
    return [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + date.getDate()).slice(-2)
    ].join('-');
  }
};
