"use client";

import { CircleF, GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

interface MapProps {
  radius: number;
  marker: google.maps.LatLngLiteral;
  setMarker: (latLng: google.maps.LatLngLiteral) => void;
}

export default function Map({ radius, marker, setMarker }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NODE_ENV === "development" ? "" : (process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string),
    libraries: ["geometry"],
  });

  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ ...marker });

  if (loadError)
    return (
      <div className="bg-muted rounded w-full h-full flex justify-center items-center text-xl font-semibold font-mono">
        Es ist ein Fehler aufgetreten: {loadError.message}
      </div>
    );
  if (!isLoaded)
    return (
      <div className="bg-muted rounded w-full h-full flex justify-center items-center text-xl font-semibold font-mono animate-pulse">
        Lade Karte...
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "0.25rem" }}
      zoom={15}
      onLoad={(map) => setMapRef(map)}
      onClick={(e) => {
        if (!mapRef) return;

        const newCenter = mapRef.getCenter();
        if (newCenter) setCenter({ lat: newCenter?.lat(), lng: newCenter?.lng() });
        setMarker({ lat: e.latLng?.lat() || marker.lat, lng: e.latLng?.lng() || marker.lng });
      }}
      options={{
        tilt: 0,
        center,
        mapTypeId: "roadmap",
        mapTypeControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        streetViewControl: false,
        styles: [
          { elementType: "labels", featureType: "poi", stylers: [{ visibility: "off" }] },
          { elementType: "labels", featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      }}
    >
      <MarkerF
        position={marker}
        draggable
        onDrag={(e) => setMarker({ lat: e.latLng?.lat() || marker.lat, lng: e.latLng?.lng() || marker.lng })}
      />
      <CircleF center={marker} radius={radius} options={{ fillOpacity: 0.1 }} />
    </GoogleMap>
  );
}
