function announcerTranscript(disaster, payload) {
  let text = ''

  console.log(payload.status.toLowerCase() );

  switch(disaster) {
    case 'earthquake':
      text = `Mohon perhatian. Kami dari BMKG menginformasikan bahwa telah terjadi gempa bumi sebesar ${payload.magnitude} Skala Rihter ${payload.tsunami ? ' dan berpotensi tsunami' : ''} pada tanggal 11 Februari 2020 pukul ${payload.time} Waktu Indonesia Barat, dengan kedalaman ${payload.depth} kilometer, di ${payload.earthquake_point}. Dihimbau kepada warga agar waspada terhadap gempa susulan. Terima kasih.`
      break
    case 'flood':
      text = `Mohon perhatian. Kami dari BPBD Provinsi DKI Jakarta menginformasikan bahwa ${payload.lock} memasuki ${payload.status} pada tanggal 11 Februari 2020 pukul ${payload.time} Waktu Indonesia Barat dengan ketinggian ${payload.water_level} sentimeter, ${payload.weather}. ${payload.status.toLowerCase() === 'siaga 1' ? 'Dihimbau kepada warga agar segera melakukan evakuasi dan menyelamatkan barang berharga Anda' : 'Dihimbau kepada warga agar waspada terhadap banjir kiriman'}. Terima kasih.`
      break
    }

    console.log(text);
  return text
}

module.exports = announcerTranscript