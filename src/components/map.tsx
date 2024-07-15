import { LatLngLiteral } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet/dist/leaflet.css";
import { useMemo, useRef } from "react";
import { Circle, MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

interface MapProps {
  radius: number;
  marker: LatLngLiteral;
  setMarker: (latLng: LatLngLiteral) => void;
}

function CustomMarker({ marker, setMarker }: Omit<MapProps, "radius">) {
  const map = useMapEvents({
    click(e) {
      setMarker(e.latlng);
    },
  });

  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      drag() {
        const marker = markerRef.current;
        if (marker != null) setMarker(marker.getLatLng());
      },
    }),
    [setMarker]
  );

  return <Marker position={marker} draggable={true} eventHandlers={eventHandlers} ref={markerRef} />;
}

export default function Map({ radius, marker, setMarker }: MapProps) {
  return (
    <MapContainer center={marker} zoom={15} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker marker={marker} setMarker={setMarker} />
      <Circle radius={radius} center={marker} />
    </MapContainer>
  );
}
