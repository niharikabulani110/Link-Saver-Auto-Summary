import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../utils/auth";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const { logout } = useAuth();

  const fetchBookmarks = async () => {
    const res = await axios.get("/bookmarks");
    setBookmarks(res.data);
  };

  const handleAdd = async () => {
    if (!url.trim()) return;
    await axios.post("/bookmark", null, {
      params: { url }
    });
    setUrl("");
    fetchBookmarks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/bookmark/${id}`);
    fetchBookmarks();
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        <button onClick={logout} className="text-red-600">Logout</button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL"
          className="flex-1 border p-2 rounded"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>

      <div className="grid gap-2">
        {bookmarks.map((b) => (
          <div key={b.id} className="border rounded p-3">
            <div className="flex justify-between">
              <div className="font-semibold">{b.title}</div>
              <button onClick={() => handleDelete(b.id)} className="text-red-500">
                Delete
              </button>
            </div>
            <div className="text-sm text-gray-600">{b.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
