import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Patients({ role }) {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", dob: "", mrn: "", remarks: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewPatient, setViewPatient] = useState(null);

  // Fetch all patients or search
  const fetchPatients = async (search = "") => {
    try {
      const url = search ? `/patients?name=${encodeURIComponent(search)}` : "/patients";
      const res = await api.get(url);
      setPatients(res.data);
      setViewPatient(null);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch patients");
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  // Add or update patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/patients/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/patients", form);
      }
      setForm({ name: "", dob: "", mrn: "", remarks: "" });
      fetchPatients(searchTerm);
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Delete patient
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients(searchTerm);
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // Edit patient
  const handleEdit = (p) => {
    setForm({ name: p.name, dob: p.dob, mrn: p.mrn, remarks: p.remarks });
    setEditingId(p._id);
  };



  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Patients</h2>

      {/* Admin Form */}
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="date"
              placeholder="DOB"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="MRN"
              value={form.mrn}
              onChange={(e) => setForm({ ...form, mrn: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Remarks"
              value={form.remarks}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            {editingId ? "Update Patient" : "Add Patient"}
          </button>
        </form>
      )}

  

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold text-teal-600 text-lg">{p.name}</p>
              <p className="text-gray-600 text-sm">MRN: {p.mrn}</p>
            </div>
            <div className="mt-4 flex justify-between">
              {role === "admin" ? (
                <>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => setViewPatient(p)}
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Patient Details */}
      {viewPatient && role !== "admin" && (
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold text-teal-600 mb-2">{viewPatient.name}</h3>
          <p className="text-gray-700 mb-1"><strong>DOB:</strong> {viewPatient.dob}</p>
          <p className="text-gray-700 mb-1"><strong>MRN:</strong> {viewPatient.mrn}</p>
          <p className="text-gray-700"><strong>Remarks:</strong> {viewPatient.remarks}</p>
        </div>
      )}
    </div>
  );
}
