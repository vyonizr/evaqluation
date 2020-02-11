class Flood{
  static async getAllLocksData(req, res){
    try {
      
      res.status(200).json({
        locks:[
          {
            name: 'Bendung Katulampa',
            lat: -6.6338587,
            lng: 106.836801,
            water_threshold: {
              siaga_tiga: 81,
              siaga_dua: 151,
              siaga_satu: 201
            }
          },
          {
            name: 'Pos Depok',
            lat: -6.376104,
            lng: 106.831938,
            water_threshold: {
              siaga_tiga: 201,
              siaga_dua: 271,
              siaga_satu: 351
            }
          },
          {
            name: 'PA Manggarai',
            lat: -6.207634,
            lng: 106.848463,
            water_threshold: {
              siaga_tiga: 751,
              siaga_dua: 851,
              siaga_satu: 951
            }
          },
          {
            name: 'PA Karet',
            lat: -6.198181,
            lng: 106.809944,
            water_threshold: {
              siaga_tiga: 451,
              siaga_dua: 551,
              siaga_satu: 601
            }
          },
          {
            name: 'Pos Krukut Hulu',
            lat: -6.343644, 
            lng: 106.798932,
            water_threshold: {
              siaga_tiga: 151,
              siaga_dua: 251,
              siaga_satu: 301
            }
          },
          {
            name: 'Pos Pesanggrahan',
            lat: -6.397134,
            lng: 106.772055,
            water_threshold: {
              siaga_tiga: 151,
              siaga_dua: 251,
              siaga_satu: 301
            }
          },
          {
            name: 'Pos Angke Hulu',
            lat: -6.212918,
            lng: 106.696351,
            water_threshold: {
              siaga_tiga: 151,
              siaga_dua: 251,
              siaga_satu: 301
            }
          },
          {
            name: 'Waduk Pluit',
            lat: -6.111333, 
            lng: 106.797641,
            water_threshold: {
              siaga_tiga: -51,
              siaga_dua: 1,
              siaga_satu: 46
            }
          },
          {
            name: 'Pasar Ikan',
            lat: -6.126865,
            lng: 106.809314 ,
            water_threshold: {
              siaga_tiga: 171,
              siaga_dua: 201,
              siaga_satu: 251
            }
          },
          {
            name: 'Pos Cipinang Hulu',
            lat: -6.339633,
            lng: 106.872729,
            water_threshold: {
              siaga_tiga: 151,
              siaga_dua: 201,
              siaga_satu: 251
            }
          },
          {
            name: 'Pos Sunter Hulu',
            lat: -6.314296,
            lng: 106.922797,
            water_threshold: {
              siaga_tiga: 151,
              siaga_dua: 201,
              siaga_satu: 251
            }
          },
          {
            name: 'PA Pulo Gadung',
            lat: -6.190438,
            lng: 106.904271,
            water_threshold: {
              siaga_tiga: 551,
              siaga_dua: 701,
              siaga_satu: 771
            }
          }
        ]
      })
    } catch (error) {
      console.log(errors)
    }
  }
}

module.exports = Flood