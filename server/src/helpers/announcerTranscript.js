const dayjs = require('dayjs')
require('dayjs/locale/id')

function dateParser() {
  return dayjs().locale('id').format('[pada tanggal] D MMMM YYYY [pukul] HH [lewat] m [menit] [Waktu Indonesia Barat]')
}

function announcerTranscript(disaster, payload) {
  let text = ''

  switch(disaster) {
    case 'earthquake':
      payload.magnitude = String(payload.magnitude).replace('.', ',')
      text = `Mohon perhatian. Kami dari BMKG menginformasikan bahwa telah terjadi gempa bumi sebesar ${payload.magnitude} Skala Rihter ${payload.tsunami ? ' dan berpotensi tsunami' : ''} ${dateParser()}, dengan kedalaman ${payload.depth} kilometer, di ${payload.earthquake_point}. Dihimbau kepada warga agar waspada terhadap gempa susulan. Terima kasih.`
      break;
    case 'flood':
      text = `Mohon perhatian. Kami dari BPBD Provinsi DKI Jakarta menginformasikan bahwa ${payload.lock} memasuki ${payload.status} ${dateParser()} dengan ketinggian ${payload.water_level} sentimeter, ${payload.weather}. ${payload.status && payload.status.toLowerCase() === 'siaga 1' ? 'Dihimbau kepada warga agar segera melakukan evakuasi dan menyelamatkan barang berharga Anda' : 'Dihimbau kepada warga agar waspada terhadap banjir kiriman'}. Terima kasih.`
      break;
    }

  return text
}

module.exports = announcerTranscript