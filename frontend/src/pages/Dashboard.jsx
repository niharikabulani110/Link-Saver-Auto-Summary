import { useState, useEffect } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookmarks.");
    }
  };

  const handleAdd = async () => {
    if (!url.trim()) return;
    try {
      toast.loading("Saving...", { id: "save" });
      await axios.post("/bookmark", { url }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrl("");
      fetchBookmarks();
      toast.success("Bookmark saved!", { id: "save" });
    } catch {
      toast.error("Failed to save bookmark.", { id: "save" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/bookmark/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookmarks();
      toast.success("Bookmark deleted.");
    } catch {
      toast.error("Failed to delete bookmark.");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Bookmarks</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a URL"
            className="flex-1 p-2 border rounded bg-white dark:bg-gray-800"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>

        {bookmarks.length === 0 ? (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">No bookmarks yet. Start adding some!</p>
        ) : (
          <div className="grid gap-4">
            {bookmarks.map((b) => (
              <div key={b.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img src={b.favicon} alt="favicon" className="w-5 h-5" />
                    <strong className="truncate">{b.title}</strong>
                  </div>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm">
                  {b.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
