"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

interface MapPickerProps {
  onLocationSelect: (latitude: number, longitude: number) => void
  initialLat?: number
  initialLng?: number
}

export function MapPicker({ onLocationSelect, initialLat = 20.5937, initialLng = 78.9629 }: MapPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const marker = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [coordinates, setCoordinates] = useState({ lat: initialLat, lng: initialLng })

  useEffect(() => {
    // Load Leaflet library
    if (!window.L) {
      const leafletCSS = document.createElement("link")
      leafletCSS.rel = "stylesheet"
      leafletCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(leafletCSS)

      const leafletJS = document.createElement("script")
      leafletJS.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      leafletJS.onload = initializeMap
      document.head.appendChild(leafletJS)
    } else {
      initializeMap()
    }
  }, [])

  const initializeMap = () => {
    if (map.current) return

    const L = (window as any).L
    map.current = L.map(mapContainer.current).setView([coordinates.lat, coordinates.lng], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map.current)

    // Create initial marker
    marker.current = L.marker([coordinates.lat, coordinates.lng], {
      draggable: true,
    }).addTo(map.current)

    // Handle marker drag
    marker.current.on("dragend", () => {
      const pos = marker.current.getLatLng()
      setCoordinates({ lat: pos.lat, lng: pos.lng })
    })

    // Handle map click
    map.current.on("click", (e: any) => {
      const { lat, lng } = e.latlng
      setCoordinates({ lat, lng })
      marker.current.setLatLng([lat, lng])
    })

    setLoading(false)
  }

  const handleConfirm = () => {
    onLocationSelect(coordinates.lat, coordinates.lng)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Click on the map to select a location, or drag the marker to your location.
      </div>
      <div ref={mapContainer} className="w-full h-96 rounded-lg border border-border bg-muted" />
      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">
          Latitude: <span className="font-semibold text-foreground">{coordinates.lat.toFixed(4)}</span>
          <br />
          Longitude: <span className="font-semibold text-foreground">{coordinates.lng.toFixed(4)}</span>
        </div>
        <Button onClick={handleConfirm} className="px-6">
          Confirm Location
        </Button>
      </div>
    </div>
  )
}
