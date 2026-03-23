const formatDate = (date) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dateObj = new Date(date);
  const day = String(dateObj.getDate() + 1).padStart(2, '0');
  const week = daysOfWeek[dateObj.getDay()];
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();
  console.log(`${week}, ${month} ${day}, ${year}`);

  return `${week}, ${month} ${day}, ${year}`;
};

export { formatDate }