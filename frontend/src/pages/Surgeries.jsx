import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Surgeries({ role }) {
  const [surgeries, setSurgeries] = useState([]);
  const [patient, setPatient] = useState("");
  const [surgeon, setSurgeon] = useState("");
  const [ot, setOt] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const fetchSurgeries = async () => {
    const res = await api.get("/surgeries");
    setSurgeries(res.data);
  };

  const addSurgery = async () => {
    try {
      await api.post("/surgeries", { patient, surgeon, ot, date, startTime, endTime });
      setPatient(""); setSurgeon(""); setOt(""); setDate(""); setStartTime(""); setEndTime("");
      fetchSurgeries();
    } catch (err) {
      alert("Failed to schedule surgery");
      console.log(err);
    }
  };

  useEffect(() => { fetchSurgeries(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Surgeries</h2>

      {role === "admin" && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <input className="border p-2" placeholder="Patient ID" value={patient} onChange={(e) => setPatient(e.target.value)} />
          <input className="border p-2" placeholder="Surgeon ID" value={surgeon} onChange={(e) => setSurgeon(e.target.value)} />
          <input className="border p-2" placeholder="OT ID" value={ot} onChange={(e) => setOt(e.target.value)} />
          <input type="date" className="border p-2" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="time" className="border p-2" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <input type="time" className="border p-2" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          <button className="col-span-2 bg-green-600 text-white px-4 py-2 rounded" onClick={addSurgery}>
            Schedule Surgery
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {surgeries.map((s) => (
          <li key={s._id} className="border p-2 rounded">
            <p><strong>Patient:</strong> {s.patient?.name || s.patient}</p>
            <p><strong>Surgeon:</strong> {s.surgeon?.name || s.surgeon}</p>
            <p><strong>OT:</strong> {s.ot?.name || s.ot}</p>
            <p><strong>Date:</strong> {new Date(s.date).toLocaleDateString()} </p>
            <p><strong>Time:</strong> {s.startTime} – {s.endTime}</p>
            <p><strong>Status:</strong> {s.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
