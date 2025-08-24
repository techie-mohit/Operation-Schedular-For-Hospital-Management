import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OperatingTheaters({ role }) {
  const [ots, setOts] = useState([]);
  const [form, setForm] = useState({ otId: "", capabilities: "", active: false });
  const [editingId, setEditingId] = useState(null);

  // Fetch all OTs
  const fetchOTs = async () => {
    try {
      const res = await api.get("/ots");
      setOts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch Operating Theaters");
    }
  };

  useEffect(() => { fetchOTs(); }, []);

  // Add or Update OT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/ots/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/ots", form);
      }
      setForm({ otId: "", capabilities: "", active: false });
      fetchOTs();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Delete OT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this OT?")) return;
    try {
      await api.delete(`/ots/${id}`);
      fetchOTs();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // Edit OT
  const handleEdit = (ot) => {
    setForm({ otId: ot.otId, capabilities: ot.capabilities, active: ot.active });
    setEditingId(ot._id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-6 text-teal-600 font-bold">Operating Theaters</h2>

      {role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="OT ID"
              value={form.otId}
              onChange={e => setForm({ ...form, otId: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Capabilities"
              value={form.capabilities}
              onChange={e => setForm({ ...form, capabilities: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={e => setForm({ ...form, active: e.target.checked })}
                className="w-5 h-5"
              />
              <label>Active</label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            {editingId ? "Update" : "Add"} OT
          </button>
        </form>
      )}

      {/* OT List */}
      <ul className="space-y-3">
        {ots.map(ot => (
          <li key={ot._id} className="border p-4 rounded flex justify-between items-center bg-white shadow hover:shadow-lg transition">
            <div>
              <p className="font-semibold text-teal-600">OT ID: {ot.otId}</p>
              <p className="text-gray-600 text-sm">
                Capabilities: {ot.capabilities} | Status: {ot.active ? "Active" : "Inactive"}
              </p>
            </div>
            {role === "admin" && (
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(ot)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ot._id)}
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
