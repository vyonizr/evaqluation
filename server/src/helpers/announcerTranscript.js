function announcerTranscript(disaster, payload) {
  let text = ''

  switch(disaster) {
    case 'earthquake':
      const { aftershocks, depth, earthquake_point, magnitude, tsunami } = payload
      text = `Mohon perhatian. Kami dari BMKG menginformasikan bahwa telah terjadi gempa bumi sebesar ${magnitude} Skala Rihter pada pukul 8 Waktu Indonesia Barat, dengan kedalaman ${depth} kilometer, di ${earthquake_point}. Dihimbau kepada warga agar waspada terhadap ${aftershocks ? 'gempa susulan' : ''}${tsunami ? ' dan bahaya tsunami' : ''}. Terima kasih.`
    case 'flood':
      const { lock, status, time, water_level, weather } = payload
      text = `Mohon perhatian. Kami dari BPBD Provinsi DKI Jakarta menginformasikan bahwa pintu air ${lock} memasuki ${status} pada ${time} WIB dengan ketinggian ${water_level} sentimeter, ${weather}. Dihimbau kepada warga Bantaran Kali agar waspada banjir kiriman. Terima kasih.`
  }
  return text
}

module.exports = announcerTranscript