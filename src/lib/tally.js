import { config } from '../config.js'

// Opens the Tally popup; without a form ID or the embed script the link falls back to config.agendaUrl.
export function openAgenda(event) {
  if (!config.tallyFormId || !window.Tally) return
  event.preventDefault()
  window.Tally.openPopup(config.tallyFormId, {
    layout: 'modal',
    width: 350,
    alignLeft: true,
    emoji: { text: '🔎', animation: 'wave' },
    autoClose: 2000,
  })
}
