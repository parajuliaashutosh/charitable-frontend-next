"use client"

import { Button } from "@/components/ui/button"
import type { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { useMemo, useRef, useState } from "react"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"

// Fix for default marker icon in React Leaflet
import L from "leaflet"

const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapPickerProps {
  onLocationSelect: (latitude: number, longitude: number) => void
  initialLat?: number
  initialLng?: number
}

// Component to handle map clicks and marker dragging
function LocationMarker({
  position,
  setPosition,
}: {
  position: LatLngExpression
  setPosition: (pos: LatLngExpression) => void
}) {
  const markerRef = useRef<L.Marker>(null)

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const pos = marker.getLatLng()
          setPosition([pos.lat, pos.lng])
        }
      },
    }),
    [setPosition]
  )

  return <Marker position={position} draggable={true} eventHandlers={eventHandlers} ref={markerRef} />
}

export function MapPicker({ onLocationSelect, initialLat = 20.5937, initialLng = 78.9629 }: MapPickerProps) {
  const [position, setPosition] = useState<LatLngExpression>([initialLat, initialLng])

  const handleConfirm = () => {
    const [lat, lng] = position as [number, number]
    onLocationSelect(lat, lng)
  }

  const [lat, lng] = position as [number, number]

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Click on the map to select a location, or drag the marker to your location.
      </div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-96 rounded-lg border border-border z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">
          Latitude: <span className="font-semibold text-foreground">{lat.toFixed(4)}</span>
          <br />
          Longitude: <span className="font-semibold text-foreground">{lng.toFixed(4)}</span>
        </div>
        <Button onClick={handleConfirm} className="px-6">
          Confirm Location
        </Button>
      </div>
    </div>
  )
}