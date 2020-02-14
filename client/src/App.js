import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import Swal from 'sweetalert2'
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
  const [latestDisaster, setLatestDisaster] = useState({})
  const [position, setPosition] = useState({
    center: [-0.8, 120.9213],
    zoomLevel: 4
  })

  const map = useRef()

  useEffect(() => {
    let earthquakesRef = firebaseDatabase.ref('earthquakes')
    let earthquakesListener = earthquakesRef.on('value', (snapshot) => {
      var earthquakesArray = []
      for (let earthquake in snapshot.val()) {
        earthquakesArray.push(snapshot.val()[earthquake])
      }

      const latestEarthquake = earthquakesArray[earthquakesArray.length - 1]
      setLatestDisaster(latestEarthquake)

      if (firstEarthquakeCheck && latestEarthquake) {
        Swal.fire(
          'Peringatan',
          `Gempa bumi telah terjadi di ${latestEarthquake.lat}° ${latestEarthquake.lat < 0 ? 'LS' : 'LU'} ${latestEarthquake.lng}° ${latestEarthquake.lng < 0 ? 'BB' : 'BT'}`,
          'warning'
        )
        let announcement = new Audio("data:audio/wav;base64," + latestEarthquake.base64);
        announcement.play();
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

      const latestFlood = floodsArray[floodsArray.length - 1]

      if (firstFloodsCheck && latestFlood) {
        Swal.fire(
          'Peringatan',
          `${latestFlood.lock} telah memasuki ${latestFlood.status}`,
          'warning'
        )
        let announcement = new Audio("data:audio/wav;base64," + latestFlood.base64);
        announcement.play();
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

  useEffect(() => {
    return () => firstEarthquakeCheck
    && firstFloodsCheck
    && setPosition({
      center: [latestDisaster.lat, latestDisaster.lng],
      zoomLevel: 13
    })
  }, [latestDisaster])

  const onMarkerClick = (e, marker) => {
  }

  return (
    <div className='nunito' style={{width:'85%', marginTop: '.8rem', marginLeft: 'auto', marginRight:'auto'}}>
      <LeafletMap ref={map} style={{height:'60vh'}} center={position.center} zoom={position.zoomLevel}>
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
                const markerIcon = disaster.hasOwnProperty('magnitude') ? iconEarthquake : iconFloodGate
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
                          <h2>{ disaster.hasOwnProperty('magnitude') ? `Gempa Bumi ${disaster.magnitude} SR` : `Peringatan Banjir ${disaster.lock}: ${disaster.status}`}</h2>
                        </div>
                      </Popup>
                    </Marker>
                )
              })
            )}
        </CanvasMarkersLayer>
      </LeafletMap>
      <div style={{ height: '6rem', margin: '.5rem 0' }}>
        <img src={evaqlueationLogoFull} style={{width: '100%', height: '100%', objectFit: 'contain'}} alt='evaqlueation logo'/>
      </div>
      <div style={{textAlign: 'justify', textAlignLast: 'left'}}>
        <p>Evaqlueation is a simulator of an automatic early warning system that broadcasts real-time natural disaster information to help the government speeds up mitigation. It would trigger loudspeakers, display the disaster icon on the map, and post on social media (<a href='https://twitter.com/evaqlueation/' target="_blank" rel="noopener noreferrer">@evaqlueation</a>) when the sensor e.g. water level or seismometer reaches a value at a certain threshold.</p>
      </div>
      <footer style={{textAlign: 'center'}}>
        &#169; {new Date().getFullYear()} Evaqlueation Team | <a href='https://github.com/vyonizr/evaqlueation' target="_blank" rel="noopener noreferrer">Github</a>
      </footer>
    </div>
  );
}


export default App;