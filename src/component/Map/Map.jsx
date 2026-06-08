/*
import { useState } from "react";
import axios from "axios";
import "./Map.css";

const Map = () => {
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  const [distanceKm, setDistanceKm] = useState(0);
  const [charge, setCharge] = useState(0);

  const [loading, setLoading] = useState(false);

  const RATE_PER_KM = 12;

  // Haversine Formula
  const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Get Lat/Lng from Backend
  const extractLatLng = async (linkdata) => {
    const res = await axios.post(
      "http://localhost:3000/api/assignorder/extract",
      {
        linkdata,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return {
      lat: res.data.lat,
      lng: res.data.lng,
    };
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);

      const location1 = await extractLatLng(link1);
      const location2 = await extractLatLng(link2);

      const km = calculateDistanceKm(
        location1.lat,
        location1.lng,
        location2.lat,
        location2.lng
      );

      const finalKm = Number(km.toFixed(2));

      const finalCharge = Math.ceil(finalKm * RATE_PER_KM);

      setDistanceKm(finalKm);
      setCharge(finalCharge);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="map-container">
      <h2 className="map-title">
        🗺️ Distance Calculator
      </h2>

      <p className="map-subtitle">
        Calculate distance between Store and Customer
      </p>

      <textarea
        className="map-textarea"
        rows="4"
        placeholder="Paste Store Google Map Link"
        value={link1}
        onChange={(e) => setLink1(e.target.value)}
      />

      <textarea
        className="map-textarea"
        rows="4"
        placeholder="Paste Customer Google Map Link"
        value={link2}
        onChange={(e) => setLink2(e.target.value)}
      />

      <button
        className="calculate-btn"
        onClick={handleCalculate}
        disabled={loading || !link1 || !link2}
      >
        {loading ? "Calculating..." : "Calculate Distance"}
      </button>

      {distanceKm > 0 && (
        <div className="result-box">
          <h3 className="result-title">
            ✅ Result
          </h3>

          <p className="result-item">
            Distance:
            <span> {distanceKm} KM</span>
          </p>

          <p className="result-item">
            Rate:
            <span> ₹{RATE_PER_KM}/KM</span>
          </p>

          <p className="result-item">
            Delivery Charge:
            <span> ₹{charge}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
*/
import { useState, useEffect } from "react";
import axios from "axios";
import "./Map.css";

const Map = () => {
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  const [distanceKm, setDistanceKm] = useState(0);
  const [charge, setCharge] = useState(0);

  const RATE_PER_KM = 12;

  const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const extractLatLng = async (linkdata) => {
    const res = await axios.post(
      "http://localhost:3000/api/assignorder/extract",
      { linkdata }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return {
      lat: Number(res.data.lat),
      lng: Number(res.data.lng),
    };
  };

  useEffect(() => {
    const autoCalculate = async () => {
      try {
        if (!link1 || !link2) return;

        const location1 = await extractLatLng(link1);
        const location2 = await extractLatLng(link2);

        console.log("Store:", location1);
        console.log("Customer:", location2);

        const km = calculateDistanceKm(
          location1.lat,
          location1.lng,
          location2.lat,
          location2.lng
        );

        const finalKm = Number(km.toFixed(2));

        setDistanceKm(finalKm);
        setCharge(Math.ceil(finalKm * RATE_PER_KM));
      } catch (error) {
        console.log(error);
      }
    };

    autoCalculate();
  }, [link1, link2]);

  return (
    <div className="map-container">
      <h2>🗺️ Distance Calculator</h2>

      <textarea
        rows="4"
        placeholder="Store Google Map Link"
        value={link1}
        onChange={(e) => setLink1(e.target.value)}
      />

      <textarea
        rows="4"
        placeholder="Customer Google Map Link"
        value={link2}
        onChange={(e) => setLink2(e.target.value)}
      />

      <div className="result-box">
        <h3>Result</h3>

        <p>
          Distance: <b>{distanceKm} KM</b>
        </p>

        <p>
          Rate: <b>₹{RATE_PER_KM}/KM</b>
        </p>

        <p>
          Delivery Charge: <b>₹{charge}</b>
        </p>
      </div>
    </div>
  );
};

export default Map;