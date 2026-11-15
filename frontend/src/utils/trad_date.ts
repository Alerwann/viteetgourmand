/** @format */

export default function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [datePart] = dateStr.split(' ');
  const [year, month, day] = datePart.split('-');

  if (!year || !month || !day) return dateStr;
  return `${day} / ${month} / ${year}`;
}
