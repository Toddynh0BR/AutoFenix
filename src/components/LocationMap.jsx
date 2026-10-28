import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});


function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => { if (position) map.flyTo([position.latitude, position.longitude], Math.max(map.getZoom(), 13), { duration: 0.45 }); }, [position, map]);
  return null;
}

function ClickHandler({ onSelect }) {
  useMapEvents({ click(event) { onSelect({ latitude: event.latlng.lat, longitude: event.latlng.lng }); } });
  return null;
}

export default function LocationMap({ position, onSelect }) {
  const center = position ? [position.latitude, position.longitude] : [-8.283, -35.976];
  return <div className="map-shell" aria-label="Mapa interativo para selecionar sua localização">
    <MapContainer center={center} zoom={position ? 13 : 7} scrollWheelZoom={false} className="location-map">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && <Marker position={[position.latitude, position.longitude]} icon={markerIcon} />}
      <MapUpdater position={position} />
      <ClickHandler onSelect={onSelect} />
    </MapContainer>
    <div className="map-hint">
      <span className="map-dot" />{position ? 'Ponto selecionado — clique no mapa para ajustar' : 'Selecione um endereço ou clique no mapa para marcar um ponto'}</div>
  </div>;
}
