/*import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import "./Map.css";

// ✅ Extract lat/lng from Google Maps link
const extractLatLng = (url) => {
  if (!url) return null;

  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  if (!match) return null;

  return {
    lat: parseFloat(match[1]),
    lng: parseFloat(match[2]),
  };
};

const Map = ({ order }) => {
  const [distanceKm, setDistanceKm] = useState(0);
  const [charge, setCharge] = useState(0);

  const ratePerKm = 12;

  useEffect(() => {
    if (!order) return;

    const storeLink = order?.items?.[0]?.linkdata;
    const customerLink = order?.address?.linkdata;

    const storeLoc = extractLatLng(storeLink);
    const customerLoc = extractLatLng(customerLink);

    if (!storeLoc || !customerLoc) {
      setDistanceKm(0);
      setCharge(0);
      return;
    }

    const meters = getDistance(
      { latitude: storeLoc.lat, longitude: storeLoc.lng },
      { latitude: customerLoc.lat, longitude: customerLoc.lng }
    );

    const km = meters / 1000;
    const totalCharge = km * ratePerKm;

    setDistanceKm(km.toFixed(2));
    setCharge(totalCharge.toFixed(0));
  }, [order]);

  return (
    <div className="map-box">
      <h2>🗺️ Distance Calculator</h2>

      <p>
        <b>Distance:</b> {distanceKm} KM
      </p>

      <p>
        <b>Rate:</b> ₹{ratePerKm} / KM
      </p>

      <p className="charge">
        💰 <b>Delivery Charge:</b> ₹{charge}
      </p>

      {order?.address?.linkdata && (
        <a
          href={order.address.linkdata}
          target="_blank"
          rel="noreferrer"
          className="map-btn"
        >
          📍 Open Customer Location
        </a>
      )}
    </div>
  );
};

export default Map; //map calculetion very important
*
import { useState } from "react";// map lat,log very impotant
import axios from "axios";
import "./Map.css";

const Map = () => {
  const [linkdata, setLinkdata] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractLatLng = async () => {
    try {
      setLoading(true);
      setLatLng(null);

      const res = await axios.post("http://localhost:3000/api/assignorder/extract", {
        linkdata,
      });

      if (res.data.success) {
        setLatLng({
          lat: res.data.lat,
          lng: res.data.lng,
        });
      } else {
        alert(res.data.message || "Failed to extract lat/lng");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>📍 Extract Lat/Lng from Google Map Link</h2>

      <textarea
        rows={4}
        value={linkdata}
        onChange={(e) => setLinkdata(e.target.value)}
        placeholder="Paste Google Maps link here..."
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={extractLatLng}
        disabled={loading || !linkdata}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Extracting..." : "Get Lat/Lng"}
      </button>

      {latLng && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Result</h3>
          <p>
            <b>Latitude:</b> {latLng.lat}
          </p>
          <p>
            <b>Longitude:</b> {latLng.lng}
          </p>

          
          <a
            href={`https://www.google.com/maps?q=${latLng.lat},${latLng.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            🌍 Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default Map;
*/
import { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";

const Map = () => {
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  const [distanceKm, setDistanceKm] = useState(0);
  const [charge, setCharge] = useState(0);

  const [loading, setLoading] = useState(false);
  const {url} =useContext(AdminContext);

  const RATE_PER_KM = 12;

  // ✅ Haversine formula
  const calculateDistanceKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth radius KM
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
    const res = await axios.post(`${url}/api/assignorder/extract`, {
      linkdata,
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Invalid map link");
    }

    return { lat: res.data.lat, lng: res.data.lng };
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);

      // ✅ Extract both links
      const loc1 = await extractLatLng(link1);
      const loc2 = await extractLatLng(link2);

      // ✅ Calculate distance
      const km = calculateDistanceKm(loc1.lat, loc1.lng, loc2.lat, loc2.lng);

      // ✅ Round to 2 decimals
      const finalKm = Number(km.toFixed(2));

      // ✅ Delivery charge
      const finalCharge = Math.ceil(finalKm * RATE_PER_KM);

      setDistanceKm(finalKm);
      setCharge(finalCharge);
    } catch (err) {
      alert(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h2>🗺️ Distance Calculator (2 Google Map Links)</h2>

      <p>📌 Paste 2 Google map links and get total distance</p>

      <textarea
        rows={3}
        value={link1}
        onChange={(e) => setLink1(e.target.value)}
        placeholder="📍 Location 1 Google map link..."
        style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
      />

      <textarea
        rows={3}
        value={link2}
        onChange={(e) => setLink2(e.target.value)}
        placeholder="📍 Location 2 Google map link..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      />

      <button
        onClick={handleCalculate}
        disabled={loading || !link1 || !link2}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Calculating..." : "Calculate Distance"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>✅ Result</h3>

        <p>
          <b>Distance:</b> {distanceKm} KM
        </p>

        <p>
          <b>Rate:</b> ₹{RATE_PER_KM} / KM
        </p>

        <p>
          <b>💰 Delivery Charge:</b> ₹{charge}
        </p>
      </div>
    </div>
  );
};

export default Map;
