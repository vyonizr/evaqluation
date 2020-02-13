const axios = require('axios');

module.exports = (disasterType, payload) => {
  return axios.post(`https://api.wavecell.com/sms/v1/${process.env.SUB_ACCOUNT_ID_WAVECELL}/many`, {
  clientBatchId: 'abc-123',
  messages: [
      {
        destination: process.env.PHONE_NUMBER,
        clientMessageId: '1000',
      }
    ],
  template: {
    source: 'QLUSTER',
    text: smsContent(disasterType, payload),
    encoding: 'AUTO'
  }
  },{
    headers:{
      Authorization: `Bearer ${process.env.WAVECELL_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
}