const ConvertDate = (input: string): string => {
  if (!input) {
    return '배포되지 않은 릴리즈노트';
  } else {
    let datePart, timePart;
    if (input.includes('오후')) {
      [datePart, timePart] = input.split('. 오후 ');
    } else if (input.includes('오전')) {
      [datePart, timePart] = input.split('. 오전 ');
    } else {
      throw new Error('Invalid time format (neither AM nor PM found)');
    }

    const [year, month, day] = datePart.split('. ').map(part => parseInt(part));
    // eslint-disable-next-line prefer-const
    let [hour, minute] = timePart.split(':').map(part => parseInt(part));

    if (input.includes('오후') && hour !== 12) {
      hour += 12;
    } else if (input.includes('오전') && hour === 12) {
      hour = 0;
    }

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    const result = `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}`;

    return result;
  }
};

export default ConvertDate;
