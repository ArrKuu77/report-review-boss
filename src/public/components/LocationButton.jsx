import { useState } from "react";
import { MapPin, LoaderCircle, ExternalLink } from "lucide-react";

export default function LocationButton() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({ latitude, longitude });
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Please allow location access in your browser."
            : err.code === 2
              ? "Your location is unavailable. Please try again."
              : "Location request timed out. Please try again.",
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const mapLink = location
    ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    : "";

  return (
    <div className="max-w-md space-y-4 rounded-xl border border-yellow-400 bg-zinc-900 p-5 text-white">
      <h2 className="text-xl font-bold text-yellow-400">My Current Location</h2>

      <button
        onClick={getLocation}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={20} />
            Getting Location...
          </>
        ) : (
          <>
            <MapPin size={20} />
            Get My Location
          </>
        )}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {location && (
        <div className="space-y-3">
          <div className="rounded-lg bg-zinc-800 p-3">
            <p className="text-sm text-gray-400">Latitude</p>
            <p className="break-all">{location.latitude}</p>

            <p className="mt-2 text-sm text-gray-400">Longitude</p>
            <p className="break-all">{location.longitude}</p>
          </div>

          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-yellow-400 px-4 py-3 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            <MapPin size={20} />
            View on Google Maps
            <ExternalLink size={16} />
          </a>
        </div>
      )}
    </div>
  );
}
