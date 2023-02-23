import browser from 'webextension-polyfill'

export function getHistory(beforeMinute: number, startTimeEpoch: number = new Date(1970).getTime()) {
  const before = new Date()
  before.setMinutes(before.getMinutes() - beforeMinute)
  return browser.history.search(
    {
      text: '',
      startTime: Math.max(before.getTime(), startTimeEpoch + 1),
      maxResults: 1000,
    })
}
