import React from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const position = [51.505, -0.09]
  return (
    <div style={{height: "100%",width:"100%"}}>
      <Map style={{height:'80vh'}} center={position} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      </Map>
    </div>
  );
}


export default App;