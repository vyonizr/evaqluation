import React from 'react';
import './App.css';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import * as firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig);

function App() {
  const position = [-0.8, 120.9213]
  return (
    <div style={{height: "100%",width:"100%"}}>
      <LeafletMap style={{height:'80vh'}} center={position} zoom={4}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      </LeafletMap>
    </div>
  );
}


export default App;