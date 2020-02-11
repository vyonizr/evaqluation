function tweetContent(disaster, payload) {
  let text = ''

  switch(disaster) {
    case 'earthquake':
      text = `Telah terjadi gempa bumi sebesar ${payload.magnitude} SR ${payload.tsunami ? ' dan berpotensi tsunami' : ''} pada tanggal 11 Februari 2020 pukul ${payload.time} WIB dengan kedalaman ${payload.depth} km di ${payload.earthquake_point}`
    case 'flood':
      text = `Pintu air ${payload.lock} memasuki ${payload.status} pada tanggal 11 Februari 2020 pukul ${payload.time} WIB dengan ketinggian ${payload.water_level} cm, ${payload.weather}. ${payload.status.toLowerCase() === 'siaga 1' ? 'Kami himbau agar segera melakukan evakuasi dan menyelamatkan barang berharga.' : 'Kami himbau agar waspada banjir kiriman'}`
  }
  return text
}

module.exports = tweetContent