const ConvertDate = (input: string): string => {
  const [datePart, timePart] = input.split('. 오후 ');
  const [year, month, day] = datePart.split('. ').map(part => parseInt(part));
  let [hour, minute] = timePart.split(':').map(part => parseInt(part));

  const isPM = input.includes('오후');

  if (isPM && hour !== 12) {
    hour += 12;
  }

  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');

  const result = `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}`;

  return result;
};

export default ConvertDate;
