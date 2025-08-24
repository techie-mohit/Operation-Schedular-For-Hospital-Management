import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Doctors({ role }) {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: "", specialization: "", weeklyHours: "", preferences: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch doctors");
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  // Add or Update doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/doctors", form);
      }
      setForm({ name: "", specialization: "", weeklyHours: "", preferences: "" });
      fetchDoctors();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // Edit doctor
  const handleEdit = (doc) => {
    setForm({ name: doc.name, specialization: doc.specialization, weeklyHours: doc.weeklyHours, preferences: doc.preferences });
    setEditingId(doc._id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-6 text-teal-600 font-bold">Doctors</h2>

      {role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Specialization"
              value={form.specialization}
              onChange={e => setForm({ ...form, specialization: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              placeholder="Weekly Hours"
              value={form.weeklyHours}
              onChange={e => setForm({ ...form, weeklyHours: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Preferences"
              value={form.preferences}
              onChange={e => setForm({ ...form, preferences: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            {editingId ? "Update" : "Add"} Doctor
          </button>
        </form>
      )}

      {/* Doctors List */}
      <ul className="space-y-3">
        {doctors.map(doc => (
          <li key={doc._id} className="border p-4 rounded flex justify-between items-center bg-white shadow hover:shadow-lg transition">
            <div>
              <p className="font-semibold text-teal-600">{doc.name}</p>
              <p className="text-gray-600 text-sm">
                Specialization: {doc.specialization} | Weekly Hours: {doc.weeklyHours} | Preferences: {doc.preferences}
              </p>
            </div>
            {role === "admin" && (
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(doc)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
