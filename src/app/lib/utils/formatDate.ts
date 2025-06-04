export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions & {
    locale?: string
  } = {
    locale: 'en-US',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
) {
  const dateObj = new Date(date)

  if (dateObj.toString() === 'Invalid Date') {
    console.error('Invalid date', date, options)
    return 'Invalid Date'
  }

  return new Intl.DateTimeFormat(options.locale, options).format(dateObj)
}
