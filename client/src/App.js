import React, { useState, useEffect } from 'react';
import L from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import 'firebase/auth'
import 'firebase/firestore'
import './App.css';
import firebaseDatabase from './config/firebaseDatabase'
import { evaqlueationLogoFull, iconEarthquake, iconFloodGate } from './assets'
import CanvasMarkersLayer from './Components/CanvasMarkersLayer'

function App(entry) {
  const [naturalDisasters, setNaturalDisasters] = useState([])

  useEffect(() => {
    let disastersRef = firebaseDatabase.ref()
    let listener = disastersRef.on('value', (snapshot) => {
      var disasterArray = []
      for (let disasterType in snapshot.val()) {
        for (let disaster in snapshot.val()[disasterType]) {
          let disasterObject = snapshot.val()[disasterType][disaster]
          disasterArray.push(disasterObject)
        }
      }
      setNaturalDisasters(disasterArray)
    })

    return () => listener
  }, [])


  const onMarkerClick = (e, marker) => {
  }

  const position = [-0.8, 120.9213]
  return (
    <div style={{height: "100%",width:"100%"}}>
      <LeafletMap style={{height:'70vh'}} center={position} zoom={4}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <CanvasMarkersLayer
            dataKey='properties'
            onMarkerClick={(e, marker) => onMarkerClick(e, marker)}
          >
            {naturalDisasters.length > 0 && (
              naturalDisasters.map((disaster, index) => {
                const latitude = Number(disaster.lat) || 0
                const longitude = Number(disaster.lng) || 0
                const markerIcon = disaster.magnitude ? iconEarthquake : iconFloodGate
                const defaultIcon = L.icon({
                  iconUrl: markerIcon,
                  iconSize: [32, 40],
                  shadowSize: [0, 0],
                  iconAnchor: [13, 34],
                  shadowAnchor: [18, 5],
                  popupAnchor: [0, -46]
                })

                return (
                    <Marker
                      key={index}
                      position={[latitude, longitude]}
                      icon={defaultIcon}
                    >
                      <Popup
                        disaster={disaster}
                      >
                        <div>
                          <h2>{ disaster.magnitude ? `Gempa Bumi ${disaster.magnitude} SR` : `Peringatan Banjir ${disaster.lock}`}</h2>
                        </div>
                      </Popup>
                    </Marker>
                )
              })
            )}
        </CanvasMarkersLayer>
      </LeafletMap>
      <div style={{ height: '150px', margin: '15px 0px' }}>
        <img src={evaqlueationLogoFull} style={{width: '100%', height: '100%', objectFit: 'contain'}} alt='evaqlueation logo'/>
      </div>
    </div>
  );
}


export default App;