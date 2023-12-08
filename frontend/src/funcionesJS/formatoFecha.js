export const formatDate = (inputDate) => {
  let dateObject;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else {
    return ''; // Manejar el caso en que inputDate no sea válido
  }

  if (isNaN(dateObject.getTime())) {
    return ''; // Manejar el caso en que la fecha no sea válida
  }

  const day = dateObject.getDate();
  const month = dateObject.toLocaleString('en-US', { month: 'short' });
  const year = dateObject.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate.toUpperCase();
};