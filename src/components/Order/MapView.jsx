import React, { useState } from 'react'
import Map, { Marker, Popup, ScaleControl, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
  const [viewState, setViewState] = useState({
    longitude: 105.8542,
    latitude: 21.0285,
    zoom: 12
  })

  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title">Vị trí đơn hàng</strong>
      </div>
      <div className='card-body' style={{height: '500px'}}>
        <Map
          {...viewState}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={event => setViewState(event.viewState)}
        >
          <Marker longitude="105.8542" latitude="21.0285" color='red' />
          <Popup longitude={105.85} latitude={21.03} closeOnClick={false}>
            <p>Hà Nội</p>
          </Popup>
          <NavigationControl position="top-left" />
          <FullscreenControl position="top-left" />
          <GeolocateControl position="top-left" />
          <ScaleControl />
        </Map>
      </div>
    </div>
  )
}

export default MapView
