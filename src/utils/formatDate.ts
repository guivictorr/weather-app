import { format } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export default function formatDate(dateStr: string): string {
  const utcDate = zonedTimeToUtc(dateStr, 'Europe');

  const date = new Date(utcDate);
  const timeZone = 'Europe';
  const zonedDate = utcToZonedTime(date, timeZone);

  const dateFormat = 'EEE, d LLL';

  const formatedDate = format(zonedDate, dateFormat);

  return formatedDate;
}
