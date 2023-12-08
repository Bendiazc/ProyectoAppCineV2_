export const formatDateApi = (releaseDate) => {
  if (!releaseDate || !releaseDate.day || !releaseDate.month || !releaseDate.year) {
    return ''; // Manejar el caso en que releaseDate o sus componentes sean nulos o indefinidos
  } 
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Date(`${releaseDate.month}/${releaseDate.day}/${releaseDate.year}`).toLocaleDateString('en-US', options);
  return formattedDate.toUpperCase();
};