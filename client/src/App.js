import React, { useState, useEffect } from 'react';
import L from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import 'firebase/auth'
import 'firebase/firestore'
import './App.css';
import firebaseDatabase from './config/firebaseDatabase'
import { evaqlueationLogoFull, iconEarthquake, iconFloodGate } from './assets'
import CanvasMarkersLayer from './Components/CanvasMarkersLayer'

let firstEarthquakeCheck = false
let firstFloodsCheck = false

function App() {
  const [earthquakes, setEarthquakes] = useState([])
  const [floods, setFloods] = useState([])
  const [naturalDisasters, setNaturalDisasters] = useState([])

  useEffect(() => {
    let earthquakesRef = firebaseDatabase.ref('earthquakes')
    let earthquakesListener = earthquakesRef.on('value', (snapshot) => {
      var earthquakesArray = []
      for (let earthquake in snapshot.val()) {
        earthquakesArray.push(snapshot.val()[earthquake])
      }

      if (firstEarthquakeCheck && earthquakesArray[earthquakesArray.length - 1]) {
        let snd = new Audio("data:audio/wav;base64," + earthquakesArray[earthquakesArray.length - 1].base64);
        snd.play();

        console.log(snd, '<== snd');
      }

      firstEarthquakeCheck = true
      setEarthquakes(earthquakesArray)
    })

    return () => earthquakesListener
  }, [])

  useEffect(() => {
    let floodsRef = firebaseDatabase.ref('floods')

    let floodsListener = floodsRef.on('value', (snapshot) => {
      var floodsArray = []
      for (let flood in snapshot.val()) {
        floodsArray.push(snapshot.val()[flood])
      }

      if (firstFloodsCheck && floodsArray[floodsArray.length - 1]) {
        let snd = new Audio("data:audio/wav;base64," + floodsArray[floodsArray.length - 1].base64);
        snd.play();
      }

      firstFloodsCheck = true
      setFloods(floodsArray)
    })

    return () => floodsListener
  }, [])

  useEffect(() => {
    const combinedDisasters = [...earthquakes, ...floods]
    setNaturalDisasters(combinedDisasters)
  }, [earthquakes, floods])

  const onMarkerClick = (e, marker) => {
  }

  // const getFiles = (file) => {
  //   console.log(file, '<== FILE');
  // }

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
                          <h2>{ disaster.magnitude ? `Gempa Bumi ${disaster.magnitude} SR` : `Peringatan Banjir ${disaster.lock}: ${disaster.status}`}</h2>
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