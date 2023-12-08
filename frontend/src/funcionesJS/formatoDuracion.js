export const formatSecondsToHoursMinutes = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60); 
  const formattedTime = `${hours}h ${minutes}min`;
  return formattedTime;
}

