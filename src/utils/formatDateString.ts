export const formatDateString = (inputDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  };

  const formattedDate = new Date(inputDate).toLocaleString('en-US', options);

  return formattedDate;
};
