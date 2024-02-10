/**
 * src/Contexts/dateTime.js
 *
 * getDateTime() returns {
 *   date: "<YYMMDD>",
 *   time: "<hhmmss>",
 *   now: <Date object>
 * }
 */
export const getDateTime = (now = new Date()) => {
  // Get the current time in UTC, regardless of current time zone
  // 2022-12-02T21:00:00.000Z
  const timeZone = Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone || "Atlantic/Reykjavik" // always UTC

  // Express this in the timeZone of the operating system,
  // but using British time format, so that the date can be
  // retrieved as DD/MM/YYYY
  const isoString = now.toLocaleString( "en-GB", { timeZone })
  // E.g.: "25/12/2022, 13:45:56"

  let [ date, time ] = isoString.split(", ") 
  // ["DD/MM/YYYY", "hh:mm:ss"]

  let [ day, month, year ] = date.split("/")//["DD","MM","YYYY"]
  year = year.slice(2) // "2024" —> "24"

  date = `${year}${month}${day}` // "YYMMDD"
  time = time.replace(/:/g, "") // "hhmmss"

  return { date, time, now }
}