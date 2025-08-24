import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Surgeries({ role }) {
  const [surgeries, setSurgeries] = useState([]);
  const [patients, setPatients] = useState([]);
  const [surgeons, setSurgeons] = useState([]);
  const [ots, setOts] = useState([]);

  const [patient, setPatient] = useState("");
  const [surgeon, setSurgeon] = useState("");
  const [ot, setOt] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ✅ Fetch all surgeries
  const fetchSurgeries = async () => {
    const res = await api.get("/surgeries");
    setSurgeries(res.data);
  };

  // ✅ Fetch patients, surgeons, OTs for dropdowns
  const fetchDropdownData = async () => {
    const patientsRes = await api.get("/patients");
    const surgeonsRes = await api.get("/doctors");
    const otRes = await api.get("/operation-theatres");

    setPatients(patientsRes.data);
    setSurgeons(surgeonsRes.data);
    setOts(otRes.data);
  };

  const addSurgery = async () => {
    try {
      await api.post("/surgeries", {
        patient,
        surgeon,
        ot,
        date,
        startTime,
        endTime,
      });
      setPatient("");
      setSurgeon("");
      setOt("");
      setDate("");
      setStartTime("");
      setEndTime("");
      fetchSurgeries();
    } catch (err) {
      alert("Failed to schedule surgery");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSurgeries();
    fetchDropdownData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Surgeries</h2>

      {role === "admin" && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <select
            className="border p-2"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (ID: {p._id})
              </option>
            ))}
          </select>

          <select
            className="border p-2"
            value={surgeon}
            onChange={(e) => setSurgeon(e.target.value)}
          >
            <option value="">Select Surgeon</option>
            {surgeons.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} (ID: {d._id})
              </option>
            ))}
          </select>

          <select
            className="border p-2"
            value={ot}
            onChange={(e) => setOt(e.target.value)}
          >
            <option value="">Select OT</option>
            {ots.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name} (ID: {o._id})
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="border p-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="border p-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <button
            className="col-span-2 bg-green-600 text-white px-4 py-2 rounded"
            onClick={addSurgery}
          >
            Schedule Surgery
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {surgeries.map((s) => (
          <li key={s._id} className="border p-2 rounded">
            <p>
              <strong>Patient:</strong> {s.patient?.name || "N/A"} (ID:{" "}
              {s.patient?._id})
            </p>
            <p>
              <strong>Surgeon:</strong> {s.surgeon?.name || "N/A"} (ID:{" "}
              {s.surgeon?._id})
            </p>
            <p>
              <strong>OT:</strong> {s.ot?.name || "N/A"} (ID: {s.ot?._id})
            </p>
            <p>
              <strong>Date:</strong> {new Date(s.date).toLocaleDateString()}{" "}
            </p>
            <p>
              <strong>Time:</strong> {s.startTime} – {s.endTime}
            </p>
            <p>
              <strong>Status:</strong> {s.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
